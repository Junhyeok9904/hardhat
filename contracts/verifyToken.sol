pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
//transfer coin to issuer 
contract Equtro is ERC20 {

    // Define the supply of FunToken: 1,000,000 
    uint256 constant initialSupply = 10000000 * (10**18);
    constructor() ERC20("EQutro", "EQT") {
        _mint(msg.sender, initialSupply);
    }

    // check blance
    // balanceOf(address)
}

//verify user, issuer, brand, aqcuier, merchant
contract verifyNFT is ERC721 {
    uint256 tokenId;
    bytes data;
    constructor() ERC721("verifyNFT") {
        _safeMint(msg.sender, tokenId, data);
    }
    // user verify
    function userVerify(address user, address issuer, address mechant, uint256 nonce) public {
        //contract has users list
        if(msg.sender == user_list) {
            //_mint erc721_token and transfer to issuer
            //erc721_token has information of user, issuer, mechant address and nonce
        }
        else {
            revert;
        }
    }
    //issuer verify
    function issuerVerify(uint256 issuerNonce) public {
        //check user's erc721_token was transfered to issuer's wallet
        //contract has issuers address list 
        if(msg.sender == issuer_list) {
            //_mint erc721_token and transfer to Brand's wallet
            //erc721_token use information of user's data in erc721_token from issuer's wallet
        }
        else {
            revert;
        }
    }
    //brand verify 
    function brandVerify() public {
        //check issuer's erc721_token was transfered to brand's wallet
        if(msg.sender == brand) {
            //_mint erc721_token and transfer to Acquier's wallet
            //erc721_token use same information of Issuer's erc721_token
        }
        else {
            revert;
        }
    } 
}

//
contract MyToken is ERC721, ERC721URIStorage, Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC721("MyToken", "MTK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyRole(MINTER_ROLE)
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

constructor SBT {
    constructor() SBT1(userAdress, IssuerAdress) {
        _mint()
    }
    function _mint(address user,address issuer) private {

    }
}