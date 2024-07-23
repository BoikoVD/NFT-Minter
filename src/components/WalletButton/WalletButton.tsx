"use client"
import { useWeb3Context } from "@/context/Web3Context";
import Button from "../UI/Button";
import AlertIcon from '../../assets/icons/alert_icon.svg';
import EthIcon from '../../assets/icons/ethereum_logo.svg';
import Text from "../UI/Text";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";

export default function WalletButton() {
    const { account, isCorrectNetwork, connectWallet } = useWeb3Context();
    const { openModal } = useSwitchNetworkModal();

    const switchNetworkHandler = () => {
        openModal();
    }

    return account
        ? <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex items-center">
                <div className="p-[1px] rounded-full bg-border-gradient ">
                    <button 
                        onClick={!isCorrectNetwork ? switchNetworkHandler : undefined}
                        className="w-[40px] h-[40px] bg-purple rounded-full flex items-center justify-center md:w-[50px] md:h-[50px]"
                    >
                        {!isCorrectNetwork
                            ? <AlertIcon className='h-[60%]'/>
                            : <EthIcon className='h-[60%]'/>}
                    </button>
                </div>
                <Text className="ml-4 md:hidden">
                    {!isCorrectNetwork
                        ? 'Wrong network!'
                        : 'Sepolia'}
                </Text>
            </div>
            <Button size='small'>
                {`${account.substring(0,4)}...${account.slice(-5)}`}
            </Button>
        </div>
        : <Button onClick={connectWallet} size='small'>
            Connect Wallet
        </Button>;
};