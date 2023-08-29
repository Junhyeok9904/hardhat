const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FunToken", function () {
  let FunToken;
  let funToken;
  let owner;
  let addr1;
  let addr2;
  // テスト前にコントラクトをhardhatのローカルテストネットにデプロイ
  beforeEach(async () => {
    FunToken = await ethers.getContractFactory("FunToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    funToken = await FunToken.deploy();
    await funToken.deployed();
  });

  // テストケース1: 正しい名前、シンボル、初期供給量を持っていることを確認する
  it("Should have correct name, symbol, and initial supply", async function () { 
    expect(await funToken.name()).to.equal("FunToken");
    expect(await funToken.symbol()).to.equal("FUN");
    let initialSupply = await funToken.totalSupply();
    initialSupply = parseInt(initialSupply.toHexString());
    expect(await initialSupply).to.equal(10 * (10**18));
  });

  // テストケース2: オーナーが初期供給量のトークンを持っていることを確認する
  it("Owner should have the initial supply of tokens", async function () {
    const initialSupply = await funToken.totalSupply();
    const ownerBalance = await funToken.balanceOf(owner.address);

    expect(ownerBalance.toHexString()).to.equal(initialSupply.toHexString());
  });

  // テストケース3: トークンをアカウント間で転送できることを確認する
  it("Should transfer tokens between accounts", async function () {
    const initialOwnerBalance = await funToken.balanceOf(owner.address);

    // Transfer tokens from owner to addr1
    const transferAmount = ethers.utils.parseUnits("1000", "ether");
    await funToken.transfer(addr1.address, transferAmount);

    // Check balances after transfer
    expect(await funToken.balanceOf(owner.address)).to.equal(initialOwnerBalance.sub(transferAmount));
    expect(await funToken.balanceOf(addr1.address)).to.equal(transferAmount);
  });

  // テストケース4: アカウントが所有するトークン量よりも多くのトークンを転送しようとすると失敗することを確認する
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

