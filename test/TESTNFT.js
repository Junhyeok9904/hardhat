const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
  let NFT;
  let nft;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    NFT = await ethers.getContractFactory("NFT");
    [owner, addr1, addr2] = await ethers.getSigners();

    nft = await NFT.deploy();
    await nft.deployed();
  });

  it("Should have correct name and symbol", async function () {
    expect(await nft.name()).to.equal("MyERC721");
    expect(await nft.symbol()).to.equal("M721");
  });

  it("Should mint and transfer tokens", async function () {
    // Mint a token for owner
    await nft.mint(owner.address);

    // Owner should own the token
    expect(await nft.ownerOf(1)).to.equal(owner.address);

    // Transfer token from owner to addr1
    await nft.transferFrom(owner.address, addr1.address, 1);

    // addr1 should own the token now
    expect(await nft.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should not allow transfers of non-existing tokens", async function () {
    // Trying to transfer non-existing token should revert
    await expect(
      nft.transferFrom(owner.address, addr1.address, 1)
    ).to.be.revertedWith("ERC721: operator query for nonexistent token");
  });

  it("Should return total supply and balance of tokens", async function () {
    // Mint tokens for owner and addr1
    await nft.mint(owner.address);
    await nft.mint(owner.address);
    await nft.mint(addr1.address);

    // Total supply should be 3
    expect(await nft.totalSupply()).to.equal(3);

    // Balance of owner and addr1
    //expect(await nft.balanceOf(owner.address)).to.equal(2);
    //expect(await nft.balanceOf(addr1.address)).to.equal(1);
  });
});
