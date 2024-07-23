import Text from "@/components/UI/Text";
import { useModal } from "@/context/ModalManager";
import MetamaskIcon from "../../assets/icons/metamask_icon.svg";

export const useInstallMetamaskModal = () => {
    const {openModal: open, closeModal: close} = useModal();

    const openInstallMetamaskModal = () => {
        open({
            content: <>
                <MetamaskIcon style={{ width: '120px', height: '120px' }}/>
                <Text>Please, install MetaMask wallet!</Text>
            </>,
            modalName: 'installMetamaskModal',
            type: 'default',
            actionText: 'OK'
        });
    }

    return { openInstallMetamaskModal }
}