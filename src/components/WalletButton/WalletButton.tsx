"use client"
import { useWeb3Context } from "@/context/Web3Context";
import Text from "../UI/Text";
import Button from "../UI/Button";

export default function WalletButton() {
    const { account, isCorrectNetwork, connectWallet } = useWeb3Context();

    return account
        ? <div className="flex items-center">
            {!isCorrectNetwork ? <Text className="mr-6">Wrong network!</Text> : null}
            <Button size='small' hoverText='Disconnect' className='w-[240px]'>
                {`${account.substring(0,4)}...${account.slice(-5)}`}
            </Button>
        </div>
        : <Button onClick={connectWallet} size='small'>
            Connect Wallet
        </Button>;
};