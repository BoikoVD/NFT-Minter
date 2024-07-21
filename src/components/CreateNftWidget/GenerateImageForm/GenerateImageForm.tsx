import { FormEvent } from "react";
import axios from "axios";

interface IGenerateImageForm {
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>,
}

interface FormElements extends HTMLFormControlsCollection {
    prompt: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
   readonly elements: FormElements
}

export default function GenerateImageForm({ setImageUrl }: IGenerateImageForm) {

    const submitHandler = async (e: FormEvent<FormElement>) => {
        e.preventDefault();
        const resp = await axios.post('api/generateImage', {
            prompt: e.currentTarget.prompt.value
        });

        console.log('[LimeWire]: Create Image response: ', resp);

        if (resp?.data?.apiResponse?.data[0]?.asset_url) {
            setImageUrl(resp.data.apiResponse.data[0].asset_url);
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type='text' name="prompt"/>
                <button type='submit'>
                    Create
                </button>
            </form>
        </div>
    );
};