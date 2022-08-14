require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3");
require("./utils/Hardhat-erc1820.js");
require("@nomiclabs/hardhat-etherscan");
const fs = require("fs");
const secret = fs.readFileSync(".secret", "utf8").trim()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [secret],
    },
    rinkeby: {
      url :"https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 4,
      accounts: [secret],
    },
  
  },
  etherscan: {
    apiKey: {
      bscTestnet: "{YOUR_API_KEY}", 
      rinkeby: "{RINKEBY_API_KEY}",
    },
  },
};
