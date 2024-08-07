import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Button from "@/components/UI/Button";
import Text from "@/components/UI/Text";

interface IModal {
  isOpen: boolean;
  closeHandler: () => void;
  type: "default" | "error";
  children: React.ReactNode;
  modalKey: string;
  actionText: string;
  actionHandler: () => void;
}

const styles = {
  modal:
    "fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.4)]",
  contentWrapper:
    "relative flex flex-col items-center justify-center rounded-xl bg-purple px-10 pb-10 pt-14 text-white max-w-[90%] md:max-w-[50%]",
  beforeElOfContentWrapper:
    "before:w-[calc(100%+4px)] before:h-[calc(100%+4px)] before:absolute before:top-[-2px] before:left-[-2px] before:z-[-1] before:rounded-xl before:bg-border-gradient",
  closeButton: "absolute right-[10px] top-[10px] h-[24px] w-[24px]",
  closeButtonSpanElement:
    "absolute left-[50%] top-[50%] h-[2px] w-full translate-x-[-50%] translate-y-[-50%] bg-white"
};

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
          className={styles.modal}
        >
          <div
            className={`${styles.contentWrapper} ${styles.beforeElOfContentWrapper}`}
            ref={ref}
          >
            <button className={styles.closeButton} onClick={closeHandler}>
              <span
                className={`${styles.closeButtonSpanElement} rotate-[45deg]`}
              />
              <span
                className={`${styles.closeButtonSpanElement} rotate-[-45deg]`}
              />
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
        </motion.div>,
        document.body
      )
    : null;
}
