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
}

interface FormElements extends HTMLFormControlsCollection {
    prompt: HTMLTextAreaElement,
    negativePrompt: HTMLTextAreaElement
}

interface FormElement extends HTMLFormElement {
   readonly elements: FormElements
}

export default function GenerateImageForm({ setImageUrl, setIsLoading }: IGenerateImageForm) {

    const submitHandler = async (e: FormEvent<FormElement>) => {
        e.preventDefault();
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