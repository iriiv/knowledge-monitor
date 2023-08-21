import { Modal } from "@carbon/react";
import { ModalComponentProps } from "./ThemeModal";

export const DeleteModal = ({
  closeModal,
  onSubmit,
  isOpen,
  title,
}: ModalComponentProps) => {
  const onFormSubmit = () => {
    onSubmit({});
    closeModal();
  };

  return (
    <Modal
      modalHeading={title}
      primaryButtonText="Удалить"
      secondaryButtonText="Отменить"
      open={isOpen}
      onRequestClose={closeModal}
      onRequestSubmit={onFormSubmit}
      danger
    >
      <p>Вы уверены, что хотите удалить эту тему?</p>
    </Modal>
  );
};
