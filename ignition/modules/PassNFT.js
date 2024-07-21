const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PassNFTModule", (m) => {

  const passNFTContract = m.contract("PassNFT", [process.env.BASE_TOKEN_URI]);

  return { passNFTContract };
});
