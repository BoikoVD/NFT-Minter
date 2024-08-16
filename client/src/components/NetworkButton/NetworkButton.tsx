"use client";
import { useWeb3Context } from "@/context/Web3Context";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";
import { IoIosWarning } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import Text from "@/components/UI/Text";

export default function NetworkButton({ className }: { className?: string }) {
  const { account, isCorrectNetwork } = useWeb3Context();
  const { openModal } = useSwitchNetworkModal();

  const switchNetworkHandler = () => {
    openModal();
  };

  if (!account) {
    return null;
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="rounded-full bg-border-gradient p-[1px]">
        <button
          onClick={!isCorrectNetwork ? switchNetworkHandler : undefined}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-purple md:h-[50px] md:w-[50px]"
        >
          {!isCorrectNetwork ? (
            <IoIosWarning size={30} className="fill-red" />
          ) : (
            <FaEthereum size={30} className="fill-pink" />
          )}
        </button>
      </div>
      <Text className="ml-4 md:hidden">
        {!isCorrectNetwork ? "Wrong network!" : "Sepolia"}
      </Text>
    </div>
  );
}
