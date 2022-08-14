// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const ERC1820_ADDRESS = '0x1820a4b7618bde71dce8cdc73aab6c95905fad24';
  console.log("\nDeployed ERC1820:" , await hre.network.provider.send('eth_getCode', [ERC1820_ADDRESS, 'latest']))

  console.log("\nWeb3 client accounts:", await hre.web3.eth.getAccounts())

  console.log("\nEthers client accounts:", (await hre.ethers.getSigners()).map(signer => signer.address))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// RUN BY:
// $ npx cross-env GAS_REPORT=true NODE_NO_WARNINGS=1 npx hardhat run ./scripts/check_plugins.js
