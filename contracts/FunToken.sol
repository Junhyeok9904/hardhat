// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FunToken is ERC20 {

    // Define the supply of FunToken: 1,000,000 
    uint256 constant initialSupply = 10 * (10**18);

    constructor() ERC20("FunToken", "FUN") {
        _mint(msg.sender, initialSupply);
    }

}
