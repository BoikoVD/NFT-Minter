// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import './PassNFT.sol';

contract TestPassNFT is PassNFT {
    constructor(string memory _tokenUri, string memory _fileName) PassNFT(_tokenUri, _fileName) {}
    
    function getBaseTokenUri() external view returns (string memory) {
        return baseTokenUri;
    }
    function getTokenMetadataFilename() external view returns (string memory) {
        return tokenMetadataFilename;
    }
}