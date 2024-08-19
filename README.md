# NFT Minter

This project is a digital platform that combines the power of artificial intelligence with blockchain technology to enable users to create unique digital art in the form of NFTs (Non-Fungible Tokens). The project empowers users to generate images using AI algorithms and securely mint them as NFTs on the blockchain. To access these features, users must first obtain a special Pass NFT, which grants them unlimited access to image generation and NFT minting tools.

### Tech stack

Solidity, Hardhat, JavaScript, Typescript, React.js, Next.js, Web3.js, Tailwind, Firebase, Mocha, Chai.

## Getting Started

Follow this section to get the project running on your development machine.

### Prerequisites

Before getting started, make sure you have these tools installed:

- [Git](https://git-scm.com/)
- [Node.js v18](https://nodejs.org/en/)

### 1. Installation

Provided you have all prerequisites ready, you can install the application with the following command:

```sh
npm i && cd client && npm i && cd ../
```

### 2. Environment variables

Setup environment variables:

```sh
cp .env.example .env && cd client && cp .env.example .env && cd ../
```

You don't need to setup the next 4 variables, these variables will setup automatically by executing the deploy script:

```
NEXT_PUBLIC_DEV_PASS_NFT_CONTRACT_ADDRESS
NEXT_PUBLIC_DEV_MINTER_NFT_CONTRACT_ADDRESS
NEXT_PUBLIC_PROD_PASS_NFT_CONTRACT_ADDRESS
NEXT_PUBLIC_PROD_MINTER_NFT_CONTRACT_ADDRESS
```

### 3. Start the Application

To start a local blockchain with the running application, you need to run several commands.

Run local blockchain:

```sh
npm run node
```

Compile the smart contracts:

```sh
npm run compile
```

Deploy compiled smart contracts to local blockchain:

```sh
npm run deploy-dev
```

Run the application:

```sh
npm run client-dev
```

To interact with the blockchain via the application in your browser you need to install [MetaMask](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) wallet and set up local network and test accounts, you can follow the instruction in the [article](https://medium.com/@kaishinaw/connecting-metamask-with-a-local-hardhat-network-7d8cea604dc6) to perform this.

## Links

- [Firebase Console](https://console.firebase.google.com/)
- [LimeWire API](https://developer.limewire.com/)
