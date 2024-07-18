"use client"
import { useWeb3Context } from "@/context/Web3Context";
import Button from "../UI/Button";
import Text from "../UI/Text";

export default function MintPassNFT() {
    const { account, contract } = useWeb3Context();

    const handleMint = async () => {
        if (account && contract) {
            try {
                const mintPrice = Number(await contract.methods.mintPrice().call());
                const res = await contract.methods.mint(1).send({
                    from: account,
                    value: String(mintPrice)
                });
                console.log('Mint Pass NFT response: ', res)
            } catch (e) {
                console.log('Mint Pass NFT ERROR: ', e)
            }
        }
    }

    return account
        ? <Button onClick={handleMint}>
            Mint
        </Button>
        : <Text>
            You must connect a wallet to mint!
        </Text>;
};