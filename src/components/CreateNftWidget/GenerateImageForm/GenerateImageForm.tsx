import { FormEvent } from "react";
import axios from "axios";
import Text from "@/components/UI/Text";
import Button from "@/components/UI/Button";
import TextField from "@/components/UI/TextField";
import { useWeb3Context } from "@/context/Web3Context";
import { useModal } from "@/context/ModalManager";
import { useSwitchNetworkModal } from "@/hooks/modals/useSwitchNetworkModal";
import { useInstallMetamaskModal } from "@/hooks/modals/useInstallMetamaskModal";
import { useErrorModal } from "@/hooks/modals/useErrorModal";

interface IGenerateImageForm {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      text: string;
    }>
  >;
  calssName?: string;
}

interface FormElements extends HTMLFormControlsCollection {
  prompt: HTMLTextAreaElement;
  negativePrompt: HTMLTextAreaElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function GenerateImageForm({
  setImageUrl,
  setIsLoading,
  calssName
}: IGenerateImageForm) {
  const {
    account,
    isOwnerOfPassNFT,
    isCorrectNetwork,
    isMetaMaskInstalled,
    connectWallet
  } = useWeb3Context();
  const { openModal } = useModal();
  const { openInstallMetamaskModal } = useInstallMetamaskModal();
  const { openModal: openSwitchNetworkmodal } = useSwitchNetworkModal();
  const { openErrorModal } = useErrorModal();

  const submitHandler = async (e: FormEvent<FormElement>) => {
    e.preventDefault();

    if (!isCorrectNetwork) {
      openSwitchNetworkmodal();
      return;
    }
    if (!isOwnerOfPassNFT) {
      openModal({
        content: <Text>You must mint the Pass NFT at first!</Text>,
        modalName: "owningWarnModal",
        type: "default"
      });
      return;
    }

    setIsLoading({
      state: true,
      text: "Generating..."
    });

    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const resp = await axios.post("api/generateImage", {
      prompt: e.currentTarget.prompt.value,
      negativePrompt: e.currentTarget.negativePrompt.value
    });

    console.log("[LimeWire]: Create Image response: ", resp);

    if (resp.data.success) {
      if (resp?.data?.apiResponse?.data[0]?.asset_url) {
        setImageUrl(resp.data.apiResponse.data[0].asset_url);
      } else {
        openErrorModal("Something went wrong...");
      }
    } else {
      openErrorModal(resp.data.message);
    }

    setIsLoading({
      state: false,
      text: "Loading..."
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className={`flex w-full flex-col items-center ${calssName}`}
    >
      <TextField
        name="prompt"
        id="prompt_field"
        labelText="Prompt"
        isRequired={true}
      />
      <TextField
        name="negativePrompt"
        id="negative_prompt_field"
        labelText="Negative prompt"
      />
      {account ? (
        <Button type="submit" size="small" className="mt-6">
          Generate
        </Button>
      ) : (
        <Button
          onClick={
            isMetaMaskInstalled ? connectWallet : openInstallMetamaskModal
          }
          type="button"
          size="small"
          className="mt-6"
        >
          Connect Wallet
        </Button>
      )}
    </form>
  );
}
