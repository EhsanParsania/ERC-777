require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3");
require("./utils/Hardhat-erc1820.js");
require("@nomiclabs/hardhat-etherscan");
const fs = require("fs");
const secret = fs.readFileSync(".secret", "utf8").trim()

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_URL,
      chainId: 97,
      accounts: [secret],
    },
    rinkeby: {
      url : process.env.RINKEBY_URL,
      chainId: 4,
      accounts: [secret],
    },
  
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSC_TESTNET_API_KEY,
      rinkeby: process.env.RINKEBY_API_KEY,
    },
  },
};
