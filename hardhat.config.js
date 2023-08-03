require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("hardhat-deploy")

const key = '';

module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000000,
    },
  },
  mocha: {
    timeout: 90000,
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      blockGasLimit: 18800000,
    },
    sepolia_testnet: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x` + process.env.PRIVATE_KEY],
      saveDeployments: true,
      deploy: ["scripts/"],
    },
  },
  namedAccounts: {
    deployer: 0
  },
}