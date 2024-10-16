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
- [ ] Install [Docker](https://docs.docker.com/desktop/)

## Backend 

- [ ] Create a `.env` file inside `KittyMix/backend/pulsar-scripts`
- [ ] Add `MNEMONIC="MNEMONIC"`

Run the following commands:
```
git clone https://github.com/victoriahendersonn/KittyMix.git
cd KittyMix/backend/pulsar-scripts
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
npm run build
npm run dev
```
