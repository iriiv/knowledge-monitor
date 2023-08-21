import { useState } from "react";

type ModalPropsType = {
  title: string;
  onSubmit: (a: any) => void;
};

export const useModal = (props: ModalPropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return { openModal, closeModal, isOpen, ...props };
};
