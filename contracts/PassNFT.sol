// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract PassNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint8 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    string internal tokenMetadataFilename;
    address payable public withdrawWallet;
    mapping(address => uint8) public walletMints;

    constructor(string memory _tokenUri, string memory _fileName) payable ERC721('Minter Pass NFT', 'MP') {
        mintPrice = 0.01 ether;
        totalSupply = 0;
        maxSupply = 10000;
        maxPerWallet = 1;
        baseTokenUri = _tokenUri;
        tokenMetadataFilename = _fileName;
    }

    function setWithdrawWallet(address payable _address) external onlyOwner {
        withdrawWallet = _address;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function setTokenMetadataFilename(string calldata _tokenMetadataFilename) external onlyOwner {
        tokenMetadataFilename = _tokenMetadataFilename;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked(baseTokenUri, tokenMetadataFilename));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'Withdraw failed');
    }

    function mint(uint256 mintAmount) public payable {
        require(isPublicMintEnabled, 'Mint is not enabled');
        require(msg.value == mintAmount * mintPrice , 'Wrong mint value');
        require(totalSupply + mintAmount <= maxSupply, 'Sold out');
        require(walletMints[msg.sender] + mintAmount <= maxPerWallet, 'Exceed max per wallet');
        for(uint8 i = 0; i < mintAmount; i++) {
            uint256 newTokenId = totalSupply + 1;
            _safeMint(msg.sender, newTokenId);
            walletMints[msg.sender] = walletMints[msg.sender] + 1;
            totalSupply++;
        }
    }
}
