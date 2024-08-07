"use client";
import { useWeb3Context } from "@/context/Web3Context";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";
import { useInstallMetamaskModal } from "@/hooks/modals/useInstallMetamaskModal";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";
import EthIcon from "@/assets/icons/ethereum_logo.svg";
import AlertIcon from "@/assets/icons/alert_icon.svg";

export default function WalletButton() {
  const { account, isCorrectNetwork, connectWallet, isMetaMaskInstalled } =
    useWeb3Context();
  const { openInstallMetamaskModal } = useInstallMetamaskModal();
  const { openModal } = useSwitchNetworkModal();

  const switchNetworkHandler = () => {
    openModal();
  };

  return account ? (
    <div className="flex flex-col items-center gap-6 md:flex-row">
      <div className="flex items-center">
        <div className="rounded-full bg-border-gradient p-[1px]">
          <button
            onClick={!isCorrectNetwork ? switchNetworkHandler : undefined}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-purple md:h-[50px] md:w-[50px]"
          >
            {!isCorrectNetwork ? (
              <AlertIcon className="h-[60%]" />
            ) : (
              <EthIcon className="h-[60%]" />
            )}
          </button>
        </div>
        <Text className="ml-4 md:hidden">
          {!isCorrectNetwork ? "Wrong network!" : "Sepolia"}
        </Text>
      </div>
      <Button size="small">
        {`${account.substring(0, 4)}...${account.slice(-5)}`}
      </Button>
    </div>
  ) : (
    <Button
      onClick={isMetaMaskInstalled ? connectWallet : openInstallMetamaskModal}
      size="small"
    >
      Connect Wallet
    </Button>
  );
}
