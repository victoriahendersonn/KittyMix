type Trait = {
display_type: string | null;
trait_type: string;
value: string | number;
max_value: string | number | null;
};

type Extension = {
animation_url: string | null;
attributes: Trait[];
background_color: string | null;
description: string | null;
external_url: string | null;
image: string | null;
image_data: string | null;
media: string | null;
name: string | null;
protected_attributes: any | null;
token_subtype: string | null;
youtube_url: string | null;
};

type MintRunInfo = {
collection_creator: string;
token_creator: string;
time_of_minting: number;
mint_run: string | null;
serial_number: string | null;
};

type NFTDossier = {
    nft_dossier: {
        display_private_metadata_error: string | null;
        inventory_approvals: any[];
        mint_run_info: MintRunInfo;
        owner: string;
        owner_is_public: boolean;
        private_metadata: {
            token_uri: string | null;
            extension: Extension;
        };
        private_metadata_is_public: boolean;
        private_metadata_is_public_expiration: number | null;
        public_metadata: {
            extension: Extension;
        };
        public_ownership_expiration: number | null;
        royalty_info: string | null;
        token_approvals: any[];
        transferable: boolean;
        unwrapped: boolean;
    }
};
