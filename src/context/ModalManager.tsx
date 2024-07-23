"use client"
import Modal from '@/components/Modal/Modal';
import { AnimatePresence } from 'framer-motion';
import React, { useState, ReactNode, useContext } from 'react';

interface IModalData {
    content: ReactNode,
    modalName: string,
    type: 'default' | 'error',
    actionText?: string,
    actionHandler?: () => void, 
}

interface IModalContext {
    openModal: (data: IModalData) => void,
    closeModal: () => void,
}

const ModalManagerContext = React.createContext<IModalContext | null>(null);

export const ModalManager = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<IModalData[]>([]);

  const openModal = (data: IModalData) => {
    setModals([...modals, data]);
  };

  const closeModal = () => {
    setModals(modals.slice(0, -1));
  };

  return (
    <ModalManagerContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence mode='wait'>
        {modals.map((modalData, index) => (
            <Modal 
                key={modalData.modalName + index} 
                modalKey={modalData.modalName}
                isOpen={true} 
                closeHandler={closeModal}
                actionText={modalData.actionText ?? 'Close' }
                actionHandler={modalData.actionHandler ?? closeModal}
            >
            {modalData.content}
            </Modal>
        ))}
      </AnimatePresence>
    </ModalManagerContext.Provider>
  );
};

export const useModal = (): IModalContext => {
    const context = useContext(ModalManagerContext);
    if (!context) {
      throw new Error('Context is not defined');
    }
    return context;
};