# KittyMix ㅤ/ᐠ - ˕ -マ

Hello! Welcome to KittyMix, a 2D cat collecting game where you have to remix your cat with other players to unlock more kitties!
```
           __..--''``\--....___   _..,_
       _.-'    .-/";  `        ``<._  ``-+'~=.
   _.-' _..--.'_    \                    `(^) )
  ((..-'    (< _     ;_..__               ; `'  
             `-._,_)'      ``--...____..-'
```

# Getting started

To make it easy for you, we've compiled a list of steps for you to follow to start KittyMix!

- [ ] Follow this guide to set up your Secret Network - [Setting Up Your Environment](https://docs.scrt.network/secret-network-documentation/development/readme-1/setting-up-your-environment)
- [ ] Follow this guide to setup Keplr with the Secret Testnet - [Using the Testnet](https://docs.scrt.network/secret-network-documentation/overview-ecosystem-and-technology/secret-network-overview/testnet)
      Please keep your MNEMONIC handy (and safe)!
- [ ] Install [Docker](https://docs.docker.com/desktop/) and ensure that you have it open during the following steps!

## Backend 

- [ ] Create a `.env` file inside `KittyMix/backend/pulsar-scripts`
- [ ] Add `MNEMONIC="MNEMONIC"`

Run the following commands:
```
git clone https://github.com/victoriahendersonn/KittyMix.git
cd KittyMix/backend/pulsar-scripts
npm install
npm run build
cd ..
make compile-optimized-reproducible
cd pulsar-scripts
npm run upload # this will return your code id, code hash
npm run instantiate <CODE_ID> <CODE_HASH> # this will return your contract address
```

Please keep track of your CODE_ID, CODE_HASH, and CONTRACT_ADDRESS.

## Frontend

- [ ] Create a `.env` file inside `KittyMix/frontend`
- [ ] Add these to the `.env` files:
      ```
      VITE_MNEMONIC="MNEMONIC"
      VITE_CHAIN_ID="pulsar-3"
      VITE_SECRET_URL="https://api.pulsar3.scrttestnet.com"
      VITE_DENOM="uscrt"
      VITE_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
      VITE_CODE_HASH="CODE_HASH"
      ```
       
Run the following commands:
```
cd KittyMix/frontend
npm install
npm run build
npm run dev
```

# How to collect kitties with your friends!
To play with your friends, get them to follow the following steps:
- [ ] Create a `.env` file inside `KittyMix/frontend`
- [ ] Add these to the `.env` files:
```
VITE_MNEMONIC="THEIR_MNEMONIC"
VITE_CHAIN_ID="pulsar-3"
VITE_SECRET_URL="https://api.pulsar3.scrttestnet.com"
VITE_DENOM="uscrt"
VITE_CONTRACT_ADDRESS="YOUR_CONTRACT_ADDRESS"
VITE_CODE_HASH="YOUR_CODE_HASH"
```

```
git clone https://github.com/victoriahendersonn/KittyMix.git
cd KittyMix/frontend
npm run install
npm run build
npm run dev
```

# User Summary
When users join the application, they gain a randomly generated pixel-art cat. This is their first digital pet. The shape of the face, body, tail, and ears are all randomised as are the colour and the texture of the cat’s coat. Different shapes, colours, and textures have different rarities, so you may be lucky when you first join the game, or you may not. 

To gain more cats, you have to offer to breed your cat with other cats. Without revealing too much about how the new cats are generated, the traits of the cat you choose to breed your cat with play into the shapes, colours, and textures of the new cat. To increase the genetic diversity of the cats in the game available to breed with, more people need to join. By increasing the genetic diversity, you can end up with rarer and rarer cats in your collection.

# Investor Pitch
Digital collectibles often lose engagement over time because they lack community-driven interaction and true uniqueness. Users crave rare, valuable items but struggle to find meaningful ways to grow or enhance their collection.

KittyMix combines the thrill of randomness, scarcity, and community-driven gameplay. Each new user receives a randomly generated, one-of-a-kind pixel-art cat with varying shapes, colours, and textures. The rarity of these traits creates immediate value. Users can then breed their cat with others, leading to the discovery of even rarer traits and increasing the value of their collection.

We're tapping into the booming digital collectible and NFT markets, where rarity and community are key. By incentivizing users to invite more players (increasing genetic diversity and trait combinations), we create viral growth. The built-in breeding mechanics offer long-term engagement, while the potential for tokenizing cats as NFTs opens up new revenue streams.

In short, we solve the problem of stale, static collectibles by creating a living, evolving, and engaging digital ecosystem that encourages both community participation and value growth.

# Development Deep-dive
Each cat is a non-fungible token that uses the SNIP-721 reference architecture for the contract. Each token has the attributes ears, tail, body, face, colour, and coat texture. The body parts are stored as numbers which match with numbers in the images of those parts in the front end. The colour and texture are stored as strings which relate to the colours stored in the vue app.

When the app is opened, it attempts to load your cats from your wallet into the scene on the web frontend. If there are no tokens in the wallet then a mint query is sent to the contract to mint your first token, which will then appear in the scene.

By opening the hamburger menu at the top, you will be shown a list of your tokens and a list of all tokens owned by all others on the network. To breed a cat, you can select one of your own cats and someone else’s cat. To breed the cats, a query is first sent to the contract to offer breeding to the owner of the other cat. The owner of that cat will be shown a notification panel so they can accept the request. When they accept the request, the web frontend will send another query to the contract to accept the request. They will then gain a cat.


