import { useOutsideClick } from "@/hooks/useOutsideClick";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Button from "../UI/Button";

interface IModal {
    isOpen: boolean,
    closeHandler: () => void
    children: React.ReactNode,
    modalKey: string,
    actionText: string,
    actionHandler: () => void
}

export default function Modal(props: IModal) {
    const {
        isOpen,
        closeHandler,
        children,
        modalKey,
        actionText,
        actionHandler
    } = props;

    const [mounted, setMounted] = useState(false);

    const ref = useOutsideClick(() => {
        closeHandler();
    });

    useEffect(() => 
        setMounted(true)
    , []);

    return mounted && isOpen ? ReactDOM.createPortal(
        <motion.div
            key={modalKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)]"
        >
            <div className="p-[1px] bg-border-gradient rounded-xl" ref={ref}>
                <div className="bg-purple text-white px-10 pb-10 pt-14 rounded-xl relative flex flex-col items-center justify-center">
                    <button className="absolute top-[10px] right-[10px] w-[24px] h-[24px]" onClick={closeHandler}>
                        <span className="w-full h-[2px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[45deg] bg-white"/>
                        <span className="w-full h-[2px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[-45deg] bg-white"/>
                    </button>
                    {children}
                    <Button size='small' className="mt-6" onClick={actionHandler}>
                        {actionText}
                    </Button>
                </div>
            </div>
        </motion.div>
    , document.body) : null;
}