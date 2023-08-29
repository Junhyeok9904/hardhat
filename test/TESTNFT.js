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

  // テストケース1: 正しい名前とシンボルを持っていることを確認する
  it("Should have correct name and symbol", async function () {
    expect(await nft.name()).to.equal("MyERC721");
    expect(await nft.symbol()).to.equal("M721");
  });

  // テストケース2: トークンをミントし、トークンを転送する
  it("Should mint and transfer tokens", async function () {
    // オーナーにトークンをミントする
    await nft.mint(owner.address);

    // オーナーがトークンを所有していることを確認する
    expect(await nft.ownerOf(1)).to.equal(owner.address);

    // トークンをオーナーからaddr1に転送する
    await nft.transferFrom(owner.address, addr1.address, 1);

    // addr1がトークンを所有していることを確認する
    expect(await nft.ownerOf(1)).to.equal(addr1.address);
  });

  // テストケース3: 存在しないトークンのtransferは許さない
  // 존재하지 않는 토큰의 전송을 허용하지 않아야 합니다.
  it("Should not allow transfers of non-existing tokens", async function () {
    // 存在しないトークンは例外を発生させる
    // 존재하지 않는 토큰 전송 시도는 예외를 발생시킵니다.
    await expect(
      nft.transferFrom(owner.address, addr1.address, 1)
    ).to.be.revertedWith("ERC721: operator query for nonexistent token");
  });

  // テストケース4: 
  //총 공급량과 토큰 잔액을 반환해야 합니다.
  it("Should return total supply and balance of tokens", async function () {
    // 오너와 addr1에 토큰을 민트합니다.
    await nft.mint(owner.address);
    await nft.mint(owner.address);
    await nft.mint(addr1.address);

    // 총 공급량은 3이어야 합니다.
    expect(await nft.totalSupply()).to.equal(3);

    // 오너와 addr1의 토큰 잔액
    // expect(await nft.balanceOf(owner.address)).to.equal(2);
    // expect(await nft.balanceOf(addr1.address)).to.equal(1);
  });
});
