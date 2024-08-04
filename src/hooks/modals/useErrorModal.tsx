import Text from "@/components/UI/Text";
import { useModal } from "@/context/ModalManager";

export const useErrorModal = () => {
  const { openModal: open, closeModal: close } = useModal();

  const openErrorModal = (message?: string) => {
    open({
      content: (
        <>
          <Text>{message ?? "Something went wrong..."}</Text>
        </>
      ),
      modalName: "errorModal",
      type: "error"
    });
  };

  return { openErrorModal };
};
