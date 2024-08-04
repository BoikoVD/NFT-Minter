import Text from "@/components/UI/Text";
import { useModal } from "@/context/ModalManager";
import { useWeb3Context } from "@/context/Web3Context";

export const useSwitchNetworkModal = () => {
  const { switchToCorrectNetwork } = useWeb3Context();
  const { openModal: open, closeModal: close } = useModal();

  const openModal = () => {
    open({
      content: <Text>Please, switch network to Sepolia Testnet</Text>,
      modalName: "switchNetworkModal",
      type: "default",
      actionText: "Switch",
      actionHandler: () => switchToCorrectNetwork(close)
    });
  };

  return { openModal };
};
