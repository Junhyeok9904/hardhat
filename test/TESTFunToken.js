const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FunToken", function () {
  let FunToken;
  let funToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    FunToken = await ethers.getContractFactory("FunToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    funToken = await FunToken.deploy();
    await funToken.deployed();
  });
  it("Should have correct name, symbol, and initial supply", async function () { 
    expect(await funToken.name()).to.equal("FunToken");
    expect(await funToken.symbol()).to.equal("FUN");
    expect(await funToken.totalSupply()).to.equal(10 * (10**18));
  });

  it("Should transfer tokens between accounts", async function () {
    const initialOwnerBalance = await funToken.balanceOf(owner.address);

    // Transfer tokens from owner to addr1
    const transferAmount = ethers.utils.parseUnits("1000", "ether");
    await funToken.transfer(addr1.address, transferAmount);

    // Check balances after transfer
    expect(await funToken.balanceOf(owner.address)).to.equal(initialOwnerBalance.sub(transferAmount));
    expect(await funToken.balanceOf(addr1.address)).to.equal(transferAmount);
  });

  it("Should not allow transfers of more tokens than the account has", async function () {
    const initialOwnerBalance = await funToken.balanceOf(owner.address);

    // Try to transfer more tokens than the owner has
    const transferAmount = initialOwnerBalance.add(ethers.utils.parseUnits("1", "ether"));
    await expect(funToken.transfer(addr1.address, transferAmount)).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    // Check balances after failed transfer
    expect(await funToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    expect(await funToken.balanceOf(addr1.address)).to.equal(0);
  });
});
