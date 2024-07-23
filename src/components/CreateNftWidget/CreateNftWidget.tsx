"use client"
import { useState } from "react";
import Image from "next/image";
import { useWeb3Context } from "@/context/Web3Context";
import GenerateImageForm from "./GenerateImageForm/GenerateImageForm";
import MintNftButton from "./MintNftButton/MintNftButton";
import Loading from "../Loading/Loading";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Text from "../UI/Text";

export default function CreateNftWidget() {
    const { isOwnerOfPassNFT, isCorrectNetwork, setIsSwitchNetworkModalOpen } = useWeb3Context();
    const [isLoading, setIsLoading] = useState<{
        state: boolean,
        text: string
    }>({
        state: false,
        text: 'Loading...'
    });
    const [isModalVisible, setIsModalVisible] = useState<{
        state: boolean,
        text: string
    }>({
        state: false,
        text: ''
    });
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (<>
        <div className="bg-border-gradient p-[1px] rounded-xl w-full md:w-[500px]">
            <div className="p-5 bg-purple rounded-xl flex flex-col items-center w-full sm:p-10">
                {isLoading.state
                    ? <div className="w-[300px] h-[300px] flex items-center justify-center text-white">
                        <Loading text={isLoading.text}/> 
                    </div>
                    :   imageUrl 
                        ? <>
                            <div className="w-[300px] h-[300px] rounded-[20px] overflow-hidden">
                                <Image src={imageUrl} alt="generated nft" height={300} width={300}/>
                            </div>
                            <MintNftButton imageUrl={imageUrl} setIsLoading={setIsLoading}/>
                        </>
                        : <GenerateImageForm 
                            setImageUrl={setImageUrl} 
                            setIsLoading={setIsLoading} 
                            isOwnerOfPassNFT={isOwnerOfPassNFT} 
                            setIsModalVisible={setIsModalVisible}
                            isCorrectNetwork={isCorrectNetwork}
                            setIsSwitchNetworkModalOpen={setIsSwitchNetworkModalOpen}
                        />
                }
            </div>
        </div>
        <Modal
            isVisible={isModalVisible.state}
            setIsVisible={setIsModalVisible}
            modalName="modal"
        >
            <Text>
                {isModalVisible.text}
            </Text>
            <Button onClick={() => setIsModalVisible({state: false, text: ''})} size='small' className="mt-6">
                Ok
            </Button>
        </Modal>
    </>);
};