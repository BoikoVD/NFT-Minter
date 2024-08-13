import hre from "hardhat";
import fs from "fs";
import PassNFTModule from "../ignition/modules/PassNFT";
import MinterNFTModule from "../ignition/modules/MinterNFT";
import updateClientEnvValue from "../utils/updateClientEnvValue";

async function deploy() {
  const { passNFTContract } = await hre.ignition.deploy(PassNFTModule);
  const passNFTContractAddress = await passNFTContract.getAddress();
  console.log("Pass NFT contract deployed to:", passNFTContractAddress);

  const { minterNFTContract } = await hre.ignition.deploy(MinterNFTModule);
  const minterNFTContractAddress = await minterNFTContract.getAddress();
  console.log("Minter NFT contract deployed to:", minterNFTContractAddress);

  if (process.env.MODE) {
    console.log("\n");

    fs.copyFile(
      "./artifacts/contracts/PassNFT.sol/PassNFT.json",
      `./client/src/config/abi/${process.env.MODE}/PassNFT.json`,
      (err) => {
        if (err) {
          console.log("Copy PassNFT.json file to client config ERROR: ", err);
        } else {
          console.log("Copy PassNFT.json file to client config SUCCESS");
        }
      }
    );
    fs.copyFile(
      "./artifacts/contracts/MinterNFT.sol/MinterNFT.json",
      `./client/src/config/abi/${process.env.MODE}/MinterNFT.json`,
      (err) => {
        if (err) {
          console.log("Copy MinterNFT.json file to client config ERROR: ", err);
        } else {
          console.log("Copy MinterNFT.json file to client config SUCCESS");
        }
      }
    );

    if (process.env.MODE === "dev") {
      updateClientEnvValue(
        "NEXT_PUBLIC_DEV_PASS_NFT_CONTRACT_ADDRESS",
        passNFTContractAddress
      );
      updateClientEnvValue(
        "NEXT_PUBLIC_DEV_MINTER_NFT_CONTRACT_ADDRESS",
        minterNFTContractAddress
      );

      passNFTContract
        .setIsPublicMintEnabled(true)
        .then(async (res) => {
          const waitRes = await res?.wait();
          if (waitRes?.status) {
            const isPublicMintEnabled =
              await passNFTContract.isPublicMintEnabled();
            console.log(
              "Public mint for Pass NFT contract status: ",
              isPublicMintEnabled
            );
          } else {
            console.log(
              "Public mint NOT enabled for Pass NFT contract: ",
              waitRes
            );
          }
        })
        .catch((e) => {
          console.log(
            "Public mint was NOT enabled for Pass NFT contract. ERROR: ",
            e
          );
        });
      minterNFTContract
        .setIsPublicMintEnabled(true)
        .then(async (res) => {
          const waitRes = await res?.wait();
          if (waitRes?.status) {
            const isPublicMintEnabled =
              await passNFTContract.isPublicMintEnabled();
            console.log(
              "Public mint for Minter NFT contract status: ",
              isPublicMintEnabled
            );
          } else {
            console.log(
              "Public mint NOT enabled for Minter NFT contract: ",
              waitRes
            );
          }
        })
        .catch((e) => {
          console.log(
            "Public mint was NOT enabled for Minter NFT contract. ERROR: ",
            e
          );
        });
    } else {
      updateClientEnvValue(
        "NEXT_PUBLIC_PROD_PASS_NFT_CONTRACT_ADDRESS",
        passNFTContractAddress
      );
      updateClientEnvValue(
        "NEXT_PUBLIC_PROD_MINTER_NFT_CONTRACT_ADDRESS",
        minterNFTContractAddress
      );
    }
  } else {
    console.log("The MODE env variable was not setup correctly");
  }
}

deploy().catch(console.error);
