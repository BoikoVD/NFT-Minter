"use client"
import { useWeb3Context } from "@/context/Web3Context";
import { useErrorModal } from "@/hooks/modals/useErrorModal";
import { useEffect } from "react";

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
    const { error, clearError } = useWeb3Context();
    const { openErrorModal } = useErrorModal();

    useEffect(() => {
        if (error) {
            openErrorModal(error.message);
            clearError();
        }
    }, [error]);

    return children;
};