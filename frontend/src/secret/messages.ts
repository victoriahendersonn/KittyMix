import Rand from "rand-seed";
import { newPermit, Wallet } from "secretjs";

const mnemonic = `${__MNEMONIC__}`;
const contract_address = `${__CONTRACT_ADDRESS__}`
const code_hash = `${__CODE_HASH__}`

const wallet = new Wallet(mnemonic);

export const mint = async (secretjs): Promise<void> => {
    // this is sending a message to create a creature (mint the NFT)
    let create_msg = {
        create_creature: {
            name: "My first critter",
            secret_name: "My first critter's secret name",
        }
    };

    const tx = await secretjs.tx.compute.executeContract(
        {
            sender: wallet.address,
            contract_address,
            code_hash, 
            msg: create_msg,
            sent_funds: [],
        },
        {
            gasLimit: 400_000,
        }
    );

}

export const getCat = async (secretjs, token_id) => {
    let permit = await newPermit(wallet, secretjs.address, "pulsar-3", "test permit", [contract_address], ["owner"], false);

    let nft_dossier_query = {
        with_permit: {
            permit,
            query: {
                nft_dossier: {
                    token_id
                }
            }
        }
    }
    let nft_dossier: NFTDossier = await secretjs.query.compute.queryContract({
        contract_address,
        code_hash,
        query: nft_dossier_query,
    });
    const attributes: Trait[] = nft_dossier.nft_dossier.public_metadata.extension.attributes
    let cat: Cat = {
        ears: "",
        face: "",
        tail: "",
        body: "",
        type: "",
        colour: "",
        id: token_id
    }
    
    for (const attribute of attributes) {
        if (attribute.trait_type == "ears") {
            cat.ears = attribute.value
        } else if (attribute.trait_type == "face") {
            cat.face = attribute.value
        } else if (attribute.trait_type == "body") {
            cat.body = attribute.value
        } else if (attribute.trait_type == "tail") {
            cat.tail = attribute.value
        } else if (attribute.trait_type == "coat") {
            cat.type = attribute.value
        } else if (attribute.trait_type == "colour") {
            cat.colour = attribute.value
        }
    }

    return cat
}

export const listMyCats = async (secretjs): Promise<Cat[]> => {
    const token_list: TokenList = await getMyTokens(secretjs);
    
    let myCats: Cat[] = []

    for (const token_id of token_list.token_list.tokens) {
        myCats.push(await getCat(secretjs, token_id))
    }
    return myCats
}

export const getMyNumTokens = async (secretjs): Promise<number> => {
    let permit = await newPermit(wallet, secretjs.address, "pulsar-3", "test permit", [contract_address], ["owner"], false);
    
    let tokens_query = {
        with_permit: {
            permit,
            query: {
                tokens: {
                    owner: secretjs.address,
                }
            }
        }
    };

    let token_list: TokenList = await secretjs.query.compute.queryContract({
        contract_address,
        code_hash,
        query: tokens_query,
    });

    return token_list.token_list.tokens.length;
}

export const getNumTokens = async (secretjs): Promise<number> => {
    let permit = await newPermit(wallet, secretjs.address, "pulsar-3", "test permit", [contract_address], ["owner"], false);
    
    let num_tokens_query = {
        with_permit: {
            permit, 
            query: {
                num_tokens: {}
            }
        }
    }

    const num_tokens = await secretjs.query.compute.queryContract(
        {
            contract_address,
            code_hash,
            query: num_tokens_query
        }
    );
    
    return num_tokens.num_tokens.count;
}

export const listAllCats = async (secretjs): Promise<Cat[]> => {

    const count = await getNumTokens(secretjs);
    const my_tokens = await getMyTokens(secretjs);

    let allCats: Cat[] = []

    for (let i = 0; i < count; i++) {
        if (!my_tokens.token_list.tokens.includes(i.toString())) {

            let nft_dossier_query = {
                nft_dossier: {
                    token_id: i.toString(),
                }
            }

            let nft_dossier: NFTDossier = await secretjs.query.compute.queryContract({
                contract_address,
                code_hash,
                query: nft_dossier_query,
            });

            const attributes: Trait[] = nft_dossier.nft_dossier.public_metadata.extension.attributes

            let cat: Cat = {
                ears: "",
                face: "",
                tail: "",
                body: "",
                type: "",
                colour: "",
                id: i.toString()
            }
            
            for (const attribute of attributes) {
                if (attribute.trait_type == "ears") {
                    cat.ears = attribute.value
                } else if (attribute.trait_type == "face") {
                    cat.face = attribute.value
                } else if (attribute.trait_type == "body") {
                    cat.body = attribute.value
                } else if (attribute.trait_type == "tail") {
                    cat.tail = attribute.value
                } else if (attribute.trait_type == "coat") {
                    cat.type = attribute.value
                } else if (attribute.trait_type == "colour") {
                    cat.colour = attribute.value
                }
            }
            
            allCats.push(cat)
        } 
    }
    return allCats;
}

export const getMyTokens = async (secretjs): Promise<TokenList> => {
    let permit = await newPermit(wallet, secretjs.address, "pulsar-3", "test permit", [contract_address], ["owner"], false);

    let tokens_query = {
        with_permit: {
            permit,
            query: {
                tokens: {
                    owner: secretjs.address,
                }
            }
        }
    };

    let token_list: TokenList = await secretjs.query.compute.queryContract({
        contract_address,
        code_hash,
        query: tokens_query,
    });

    return token_list;
}

export const remixMeOffers = async (secretjs) => {
    let myTokens = await getMyTokens(secretjs);
    let myOffers = [];

    await Promise.all(myTokens.token_list.tokens.map(async id => {
        let query_offers = {
            query_offers: {
                token_id: id.toString()
            }
        }

        let offer = await secretjs.query.compute.queryContract({
            contract_address,
            code_hash,
            query: query_offers 
        });

        offer.offer.other_token.forEach(tokenId => {
            myOffers.push({
                my_token: offer.offer.my_token,
                other_token: tokenId,
                prefix: Math.random().toString()
            });
        });
    }));

    return myOffers;
}


export const remixRequest = async (secretjs, my_token_id, other_token_id): Promise<void> => {
    let offer_remix = {
        offer_remix: {
            my_token_id: my_token_id.toString(),
            other_token_id: other_token_id.toString(),
        }
    }

    const tx = await secretjs.tx.compute.executeContract(
        {
            sender: wallet.address,
            contract_address,
            code_hash, 
            msg: offer_remix,
            sent_funds: [],
        },
        {
            gasLimit: 400_000,
        }
    )
    console.log(tx)

}

export const remixAccept = async (secretjs, my_token_id, other_token_id): Promise<void> => {
    let complete_remix = {
        complete_remix: {
            my_token_id: my_token_id.toString(),
            other_token_id: other_token_id.toString(),
        }
    };

    const tx = await secretjs.tx.compute.executeContract(
        {
            sender: wallet.address,
            contract_address,
            code_hash, 
            msg: complete_remix,
            sent_funds: [],
        },
        {
            gasLimit: 400_000,
        }
    );
    console.log(tx)
}