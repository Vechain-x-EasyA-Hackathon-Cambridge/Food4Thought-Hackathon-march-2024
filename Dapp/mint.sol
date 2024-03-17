// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenApple is ERC721, ERC721Burnable, Ownable {
    constructor(address initialOwner)
        ERC721("Green Apple", "0001")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.redstarfoodservice.co.uk%2Fproducts%2Fid-1157.html&psig=AOvVaw3Xmi69k_xdqZh6lHRhaGZJ&ust=1710761396719000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjw3v2Y-4QDFQAAAAAdAAAAABAE";
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}