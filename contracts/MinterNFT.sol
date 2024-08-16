// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MinterNFT is ERC721, Ownable {
    address public passNftAddress;
    uint256 public mintPrice;
    uint256 public totalSupply;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    string internal tokenExtensionName;
    address payable public withdrawWallet;

    constructor(string memory _tokenUri, string memory _extension, address _passNftAddress) payable ERC721('Minter AI NFT', 'MAI') {
        mintPrice = 0 ether;
        totalSupply = 0;
        baseTokenUri = _tokenUri;
        tokenExtensionName = _extension;
        passNftAddress = _passNftAddress;
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

    function setTokenExtensionName(string calldata _tokenExtensionName) external onlyOwner {
        tokenExtensionName = _tokenExtensionName;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId), tokenExtensionName));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'Withdraw failed');
    }

    function mint() public payable {
        require(isPublicMintEnabled, 'Minting not enabled');
        uint256 passNftAmount = IERC721(passNftAddress).balanceOf(msg.sender);
        require(passNftAmount > 0, 'Pass NFT is not minted');
        uint256 newTokenId = totalSupply + 1;
        _safeMint(msg.sender, newTokenId);
        totalSupply++;
    }
}
