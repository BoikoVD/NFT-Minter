"use client"
import { useWeb3Context } from "@/context/Web3Context";
import Text from "../UI/Text";
import Button from "../UI/Button";

export default function WalletButton() {
    const { account, connectWallet } = useWeb3Context();

    return account
        ? <Text>{account}</Text>
        : <Button onClick={connectWallet}>
            Connect Wallet
        </Button>;
};