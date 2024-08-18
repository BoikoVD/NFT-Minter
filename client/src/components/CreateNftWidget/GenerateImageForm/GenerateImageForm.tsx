import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Text from "@/components/UI/Text";
import Button from "@/components/UI/Button";
import TextField from "@/components/UI/TextField";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import { useWeb3Context } from "@/context/Web3Context";
import { useModal } from "@/context/ModalManager";

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

type Inputs = {
  prompt: string;
  negativePrompt: string;
};

export default function GenerateImageForm({
  setImageUrl,
  setIsLoading,
  calssName
}: IGenerateImageForm) {
  const {
    account,
    isOwnerOfPassNFT,
    isCorrectNetwork,
    switchToCorrectNetwork
  } = useWeb3Context();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = async data => {
    if (!data.prompt.trim()) {
      setError(
        "prompt",
        { message: "Please, enter your prompt" },
        { shouldFocus: true }
      );
      return;
    }
    if (!isCorrectNetwork) {
      openModal({
        content: <Text>Please, switch network to Sepolia Testnet</Text>,
        modalName: "switchNetworkModal",
        type: "default",
        actionText: "Switch",
        actionHandler: () => switchToCorrectNetwork(closeModal)
      });
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
      prompt: data.prompt.trim(),
      negativePrompt: data.negativePrompt.trim()
    });

    console.log("[LimeWire]: Create Image response: ", resp);

    if (resp.data.success) {
      if (resp?.data?.apiResponse?.data[0]?.asset_url) {
        setImageUrl(resp.data.apiResponse.data[0].asset_url);
      } else {
        openModal({
          content: <Text>Something went wrong...</Text>,
          modalName: "errorModal",
          type: "error"
        });
      }
    } else {
      openModal({
        content: <Text>{resp.data?.message ?? "Something went wrong..."}</Text>,
        modalName: "errorModal",
        type: "error"
      });
    }

    setIsLoading({
      state: false,
      text: "Loading..."
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={`flex w-full flex-col items-center ${calssName}`}
    >
      <TextField
        id="prompt_field"
        labelText="Prompt"
        {...register("prompt", {
          required: "Please, enter your prompt",
          maxLength: {
            value: 1000,
            message: "You have exceeded the 1000 character limit"
          }
        })}
        error={errors.prompt?.message}
      />
      <TextField
        id="negative_prompt_field"
        labelText="Negative prompt"
        {...register("negativePrompt", {
          maxLength: {
            value: 1000,
            message: "You have exceeded the 1000 character limit"
          }
        })}
      />
      {account ? (
        <Button type="submit" size="small" className="mt-6">
          Generate
        </Button>
      ) : (
        <ConnectWalletButton className="mt-6" />
      )}
    </form>
  );
}
