"use client"
import { useWeb3Context } from "@/context/Web3Context";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";
import { useInstallMetamaskModal } from "@/hooks/modals/useInstallMetamaskModal";
import Button from "../UI/Button";
import Text from "../UI/Text";

export default function MintPassNFT() {
    const { isMetaMaskInstalled, account, passNFTContract, isOwnerOfPassNFT, isCorrectNetwork, checkOwningOfPassNFT, connectWallet } = useWeb3Context();
    const { openInstallMetamaskModal } = useInstallMetamaskModal();
    const { openModal } = useSwitchNetworkModal();

    const handleMint = async () => {
        if (!isCorrectNetwork) {
            openModal();
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
                : <Button onClick={isMetaMaskInstalled ? connectWallet : openInstallMetamaskModal}>
                    Connect Wallet
                </Button>
    );
};