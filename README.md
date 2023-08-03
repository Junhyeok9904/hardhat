# introduce

 
<div>
  testing hardhat to make erc20 and erc721 satisfacted token
  <br>
  using sepolia network
  <br>
  using infura node for api key
</div>
 
# please make a .env file

```
PRIVATE_KEY = <Metamask private key>
INFURA_API_KEY = <Infura api key>
NFT_CONTRCT_ADDRESS = <Depolyed NFT contract Address>
FUN_TOKEN_ADDRESS = <Deployed ERC20 verified Token contract Address>
```


# please install npm package
```bash
# INFURA アカウント生成
# 各種APIkey(Web3 API) を確認 手元にメモ
# 必要なライブラリをだ https://docs.palm.io/howto/deploy-using-hardhat/erc-721

npm init
npm install @openzeppelin/contracts
npm install -D hardhat-deploy
npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
npm install --save dotenv
```
