// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 private tokenIdCounter = 1;

    constructor() ERC721("MyERC721", "M721") {}

    function mint(address to) public {
        _mint(to, tokenIdCounter);
        tokenIdCounter++;
    }
    // 수정된 함수: 존재하지 않는 토큰 전송 시도 시 revert
    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        super.transferFrom(from, to, tokenId);
    }
}