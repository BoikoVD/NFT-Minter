"use client";
import { useWeb3Context } from "@/context/Web3Context";
import { useInstallMetamaskModal } from "@/hooks/modals/useInstallMetamaskModal";
import Button from "@/components/UI/Button";

export default function ConnectWalletButton({
  className
}: {
  className?: string;
}) {
  const { account, connectWallet, isMetaMaskInstalled } = useWeb3Context();
  const { openInstallMetamaskModal } = useInstallMetamaskModal();

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
