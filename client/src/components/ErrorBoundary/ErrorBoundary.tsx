"use client";
import Text from "@/components/UI/Text";
import { useModal } from "@/context/ModalManager";
import { useWeb3Context } from "@/context/Web3Context";
import { useEffect } from "react";

export default function ErrorBoundary({
  children
}: {
  children: React.ReactNode;
}) {
  const { error, clearError } = useWeb3Context();
  const { openModal } = useModal();

  useEffect(() => {
    if (error) {
      openModal({
        content: <Text>{error.message ?? "Something went wrong..."}</Text>,
        modalName: "errorModal",
        type: "error"
      });
      clearError();
    }
  }, [error]);

  return children;
}
