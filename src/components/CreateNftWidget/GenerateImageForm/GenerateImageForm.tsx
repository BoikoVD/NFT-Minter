import { FormEvent } from "react";
import axios from "axios";
import Button from "@/components/UI/Button";
import TextField from "@/components/UI/TextField";

interface IGenerateImageForm {
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>,
    setIsLoading: React.Dispatch<React.SetStateAction<{
        state: boolean;
        text: string;
    }>>,
    isOwnerOfPassNFT: boolean,
    setIsModalVisible: React.Dispatch<React.SetStateAction<{
        state: boolean;
        text: string;
    }>>,
    isCorrectNetwork: boolean,
    openSwitchNetworkModal: () => void,
}

interface FormElements extends HTMLFormControlsCollection {
    prompt: HTMLTextAreaElement,
    negativePrompt: HTMLTextAreaElement
}

interface FormElement extends HTMLFormElement {
   readonly elements: FormElements
}

export default function GenerateImageForm(props: IGenerateImageForm) {
    const {
        setImageUrl, 
        setIsLoading, 
        isOwnerOfPassNFT, 
        setIsModalVisible,
        isCorrectNetwork,
        openSwitchNetworkModal
    } = props;

    const submitHandler = async (e: FormEvent<FormElement>) => {
        e.preventDefault();

        if (!isCorrectNetwork) {
            openSwitchNetworkModal();
            return;
        }
        if (!isOwnerOfPassNFT) {
            setIsModalVisible({
                state: true,
                text: 'You must mint the Pass NFT at first!'
            });
            return;
        }

        setIsLoading({
            state: true,
            text: 'Generating...'
        });
        const resp = await axios.post('api/generateImage', {
            prompt: e.currentTarget.prompt.value,
            negativePrompt: e.currentTarget.negativePrompt.value
        });

        console.log('[LimeWire]: Create Image response: ', resp);

        if (resp?.data?.apiResponse?.data[0]?.asset_url) {
            setImageUrl(resp.data.apiResponse.data[0].asset_url);
        }
        setIsLoading({
            state: false,
            text: 'Loading...'
        });
    }

    return (
        <form 
            onSubmit={submitHandler}
            className="flex flex-col items-center w-full"
        >
            <TextField 
                name="prompt" 
                id='prompt_field' 
                labelText='Prompt text'
            />
            <TextField 
                name="negativePrompt" 
                id='negative_prompt_field' 
                labelText='Negative prompt text'
            />
            <Button
                type='submit'
                size='small'
                className="mt-6"
            >
                Generate
            </Button>
        </form>
    );
};