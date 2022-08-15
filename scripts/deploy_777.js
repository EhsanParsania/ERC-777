// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ensureERC1820 } = require("../utils/Hardhat-erc1820");

async function main() {
  await ensureERC1820(hre.network.provider)

  console.log("\nWeb3 client accounts:", await hre.web3.eth.getAccounts())


  const Simple777Token = await hre.ethers.getContractFactory("Simple777Token");
  const token = await Simple777Token.deploy();

  await token.deployed();

  console.log("token deployed to:", token.address);

  const Simple777Recipient = await hre.ethers.getContractFactory("Simple777Recipient");
  const recipient = await Simple777Recipient.deploy(token.address);

  await recipient.deployed();

  console.log("recipient deployed to:", recipient.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
