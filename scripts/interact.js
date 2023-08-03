const API_KEY = process.env.INFURA_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const NFT_CONTRCT_ADDRESS = process.env.NFT_CONTRCT_ADDRESS;
const {
  ethers
} = require("hardhat");
const contract = require("../artifacts/contracts/NFT.sol/NFT.json");

console.log(JSON.stringify(contract.abi));

const provider = new ethers.providers.InfuraProvider(network = "sepolia", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const greetingMessagesContract = new ethers.Contract(NFT_CONTRCT_ADDRESS, contract.abi, signer);

async function main() {
  const message = await greetingMessagesContract.message();
  console.log("The message is: ", message);

  console.log("Updating the message...");
  const tx = await greetingMessagesContract.update("Hola y bienvenido");
  await tx.wait();

  const newMessage = await greetingMessagesContract.message();
  console.log("The new message is: ", newMessage);
}
main();