const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ensureERC1820 } = require("../utils/Hardhat-erc1820");

describe(" Wallet", function () {
  async function deploy() {
    await ensureERC1820(hre.network.provider)

    const MyToken = await hre.ethers.getContractFactory("Simple777Token");
    const token = await MyToken.deploy();

    await token.deployed();

    console.log("token contract deployed to:", token.address);

    const Wallet = await hre.ethers.getContractFactory("Simple777Recipient");
    const wallet = await Wallet.deploy(token.address);

    await wallet.deployed();

    console.log("wallet contract deployed to:", wallet.address);

    const [owner] = await ethers.getSigners();
    return { token, wallet, owner };
  }

  describe("Check constructor arguments", function () {
    it("Should has the right name", async function () {
      const { token, wallet, owner } = await loadFixture(deploy);
      expect(await token.name()).to.equal("EP777");
    })

  })

  describe("DoneStuff ", function () {
    it("Should get notified by ERC777 transfer", async function () {
      const { token, wallet, owner } = await loadFixture(deploy);

      const amount = 10
      const data = JSON.stringify({
        staking_positions: [
          { duration: "1y" }
        ]
      });

      const receipt = await token.send(wallet.address, amount, [])
      await expect(receipt).to.emit(wallet, 'DoneStuff')
    });
  });

});
