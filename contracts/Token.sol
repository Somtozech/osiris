// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Token is ERC721URIStorage {
    uint256 private nextTokenId;

    constructor() ERC721("Token", "SOR") {}

    function mint(string memory tokenURI) public returns (uint256) {
        uint256 currentTokenId = nextTokenId;

        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);

        nextTokenId++;

        return currentTokenId;
    }
}
