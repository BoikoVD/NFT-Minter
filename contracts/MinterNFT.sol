// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MinterNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;

    constructor(string _tokenUri) payable ERC721('Minter AI NFT', 'MAI') {
        mintPrice = 0 ether;
        totalSupply = 0;
        baseTokenUri = _tokenUri;
    }

    function setIsPublicMintEnabled(bool newPublicMintStatus) external onlyOwner {
        isPublicMintEnabled = newPublicMintStatus;
    }

    function setBaseTokenUri(string calldata newBaseTokenUri) external onlyOwner {
        baseTokenUri = newBaseTokenUri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist!");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId), ".json?alt=media"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'Withdraw failed!');
    }

    function mint() public payable {
        require(isPublicMintEnabled, 'Minting not enabled!');
        uint256 newTokenId = totalSupply + 1;
        _safeMint(msg.sender, newTokenId);
        totalSupply++;
    }
}
