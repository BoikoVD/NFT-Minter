import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MinterNFTModule = buildModule("MinterNFTModule", (m) => {
  const baseTokenUri = m.getParameter(
    "baseTokenUri",
    process.env.BASE_TOKEN_URI
  );

  const passNftAddress = m.getParameter("passNFTContractAddress");

  const minterNFTContract = m.contract("MinterNFT", [
    baseTokenUri,
    ".json?alt=media",
    passNftAddress,
  ]);

  return { minterNFTContract };
});

export default MinterNFTModule;
