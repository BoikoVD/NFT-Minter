"use client";
import { useWeb3Context } from "@/context/Web3Context";
import { useModal } from "@/context/ModalManager";
import MetamaskIcon from "@/assets/icons/metamask_icon.svg";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";

export default function ConnectWalletButton({
  className
}: {
  className?: string;
}) {
  const { account, connectWallet, isMetaMaskInstalled } = useWeb3Context();
  const { openModal } = useModal();

  const openInstallMetamaskModal = () => {
    openModal({
      content: (
        <>
          <MetamaskIcon style={{ width: "120px", height: "120px" }} />
          <Text>Please, install MetaMask wallet!</Text>
        </>
      ),
      modalName: "installMetamaskModal",
      type: "default",
      actionText: "OK"
    });
  };

  return account ? (
    <Button size="small" className={className}>
      {`${account.substring(0, 4)}...${account.slice(-5)}`}
    </Button>
  ) : (
    <Button
      onClick={isMetaMaskInstalled ? connectWallet : openInstallMetamaskModal}
      size="small"
      className={className}
    >
      Connect Wallet
    </Button>
  );
}
