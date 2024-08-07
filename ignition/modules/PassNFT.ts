import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PassNFTModule = buildModule("PassNFTModule", (m) => {
  const baseTokenUri = m.getParameter(
    "baseTokenUri",
    process.env.BASE_TOKEN_URI
  );

  const passNFTContract = m.contract("PassNFT", [baseTokenUri]);

  return { passNFTContract };
});

export default PassNFTModule;
