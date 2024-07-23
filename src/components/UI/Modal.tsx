import { useOutsideClick } from "@/hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

interface IModal {
    isVisible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<{
        state: boolean;
        text: string;
    }>>
    children: React.ReactNode,
    modalName?: string
}

export default function Modal(props: IModal) {
    const {
        isVisible,
        setIsVisible,
        children,
        modalName = "modal",
    } = props;

    const [mounted, setMounted] = useState(false);

    const ref = useOutsideClick(() => {
        setIsVisible({state: false, text: ''})
    });

    useEffect(() => 
        setMounted(true)
    , []);

    return mounted ? ReactDOM.createPortal(
        <AnimatePresence mode='wait'>
            {isVisible && (
                <motion.div
                    key={modalName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)]"
                >
                    <div className="p-[1px] bg-border-gradient rounded-xl" ref={ref}>
                        <div className="bg-purple text-white px-10 pb-10 pt-14 rounded-xl relative flex flex-col items-center justify-center">
                            <button className="absolute top-[10px] right-[10px] w-[24px] h-[24px]" onClick={() => setIsVisible({state: false, text: ''})}>
                                <span className="w-full h-[2px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[45deg] bg-white"/>
                                <span className="w-full h-[2px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[-45deg] bg-white"/>
                            </button>
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    , document.body) : null;
}