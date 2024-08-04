import { useOutsideClick } from "@/hooks/useOutsideClick";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button";
import Text from "../UI/Text";

interface IModal {
  isOpen: boolean;
  closeHandler: () => void;
  type: "default" | "error";
  children: React.ReactNode;
  modalKey: string;
  actionText: string;
  actionHandler: () => void;
}

export default function Modal(props: IModal) {
  const {
    isOpen,
    closeHandler,
    children,
    modalKey,
    actionText,
    actionHandler,
    type
  } = props;

  const [mounted, setMounted] = useState(false);

  const ref = useOutsideClick(() => {
    closeHandler();
  });

  useEffect(() => setMounted(true), []);

  return mounted && isOpen
    ? ReactDOM.createPortal(
        <motion.div
          key={modalKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.4)]"
        >
          <div className="rounded-xl bg-border-gradient p-[1px]" ref={ref}>
            <div className="relative flex flex-col items-center justify-center rounded-xl bg-purple px-10 pb-10 pt-14 text-white">
              <button
                className="absolute right-[10px] top-[10px] h-[24px] w-[24px]"
                onClick={closeHandler}
              >
                <span className="absolute left-[50%] top-[50%] h-[2px] w-full translate-x-[-50%] translate-y-[-50%] rotate-[45deg] bg-white" />
                <span className="absolute left-[50%] top-[50%] h-[2px] w-full translate-x-[-50%] translate-y-[-50%] rotate-[-45deg] bg-white" />
              </button>
              {type === "error" && (
                <Text className="mb-2" size="large" color="red">
                  ERROR
                </Text>
              )}
              {children}
              <Button size="small" className="mt-6" onClick={actionHandler}>
                {actionText}
              </Button>
            </div>
          </div>
        </motion.div>,
        document.body
      )
    : null;
}
