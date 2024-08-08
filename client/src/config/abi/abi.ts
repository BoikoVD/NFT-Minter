import devPassNFT from "./dev/PassNFT.json";
import devMinterNFT from "./dev/MinterNFT.json";
import prodPassNFT from "./prod/PassNFT.json";
import prodMinterNFT from "./prod/MinterNFT.json";

const abi = {
  passNftAbi: process.env.MODE === "prod" ? prodPassNFT.abi : devPassNFT.abi,
  minterNftAbi:
    process.env.MODE === "prod" ? prodMinterNFT.abi : devMinterNFT.abi
};

export default abi;
