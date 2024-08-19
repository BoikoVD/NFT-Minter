// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import './MinterNFT.sol';

contract TestMinterNFT is MinterNFT {
    constructor(string memory _tokenUri, string memory _extension, address _passNftAddress) MinterNFT(_tokenUri, _extension, _passNftAddress) {}
    
    function getBaseTokenUri() external view returns (string memory) {
        return baseTokenUri;
    }
    function getTokenExtensionName() external view returns (string memory) {
        return tokenExtensionName;
    }
}