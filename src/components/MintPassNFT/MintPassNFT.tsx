"use client"
import { useWeb3Context } from "@/context/Web3Context";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";
import Button from "../UI/Button";
import Text from "../UI/Text";

export default function MintPassNFT() {
    const { account, passNFTContract, isOwnerOfPassNFT, isCorrectNetwork, checkOwningOfPassNFT } = useWeb3Context();
    const { openModal } = useSwitchNetworkModal();

    const handleMint = async () => {
        if (!isCorrectNetwork) {
            openModal()
            return;
        }

        if (account && passNFTContract) {
            try {
                const mintPrice = Number(await passNFTContract.methods.mintPrice().call());
                const res = await passNFTContract.methods.mint(1).send({
                    from: account,
                    value: String(mintPrice)
                });
                console.log('Mint Pass NFT response: ', res);
                checkOwningOfPassNFT(account, passNFTContract);
            } catch (e) {
                console.log('Mint Pass NFT ERROR: ', e)
            }
        }
    }

    return (
        isOwnerOfPassNFT
            ? <Text>
                You have minted the Pass NFT!
            </Text>
            : account
                ? <Button onClick={handleMint}>
                    Mint
                </Button>
                : <Text>
                    You must connect a wallet to mint!
                </Text>
    );
};