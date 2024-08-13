// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract PassNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor(string memory _tokenUri) payable ERC721('Minter Pass NFT', 'MP') {
        mintPrice = 0.01 ether;
        totalSupply = 0;
        maxSupply = 10000;
        maxPerWallet = 1;
        baseTokenUri = _tokenUri;
        isPublicMintEnabled = false;
    }

    function setIsPublicMintEnabled(bool newPublicMintStatus) external onlyOwner {
        isPublicMintEnabled = newPublicMintStatus;
    }

    function setBaseTokenUri(string calldata newBaseTokenUri) external onlyOwner {
        baseTokenUri = newBaseTokenUri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist!");
        return string(abi.encodePacked(baseTokenUri, "PassNFT.json?alt=media"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'Withdraw failed!');
    }

    function mint(uint256 mintAmount) public payable {
        require(isPublicMintEnabled, 'Minting not enabled!');
        require(msg.value == mintAmount * mintPrice , 'Wrong mint value!');
        require(totalSupply + mintAmount <= maxSupply, 'Sold out!');
        require(walletMints[msg.sender] + mintAmount <= maxPerWallet, 'Exceed max per wallet!');
        for(uint256 i = 0; i < mintAmount; i++) {
            uint256 newTokenId = totalSupply + 1;
            _safeMint(msg.sender, newTokenId);
            totalSupply++;
        }
    }
}
