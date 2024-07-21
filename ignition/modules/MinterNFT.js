const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MinterNFTModule", (m) => {

  const minterNFTContract = m.contract("MinterNFT", [process.env.BASE_TOKEN_URI]);

  return { minterNFTContract };
});
