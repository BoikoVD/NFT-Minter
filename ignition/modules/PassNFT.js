const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PassNFTModule", (m) => {

  const passNFTContract = m.contract("PassNFT");

  return { passNFTContract };
});
