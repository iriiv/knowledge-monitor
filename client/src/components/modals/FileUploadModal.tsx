import { ModalComponentProps } from "./ThemeModal";
import {
  Modal,
  Form,
  Stack,
  TextInput,
  TextArea,
  FileUploader as FUploader,
} from "@carbon/react";
import { useState } from "react";
import styled from "styled-components";
import { KMFile } from "../../types/KMFile";
import { useParams } from "react-router";

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
`;

export const FileUploadModal = ({
  closeModal,
  onSubmit,
  isOpen,
  title,
}: ModalComponentProps) => {
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const { id } = useParams();
  const [file, setFile] = useState<File | undefined>();

  const handleFileUpload = (e: any) => {
    setFile(e.target.files[0] as File);
  };

  const handleRemoveFile = (e: any) => {
    setFile(undefined);
  };

  const onFormSubmit = () => {
    if (!file || !id) return;
    const KMFile: KMFile = {
      description: fileDescription,
      name: fileName,
      file: file,
      themeId: id,
    };

    onSubmit(KMFile);
    clearForm();
    closeModal();
  };

  const clearForm = () => {
    setFileDescription("");
    setFileName("");
  };

  return (
    <Modal
      modalHeading={title}
      primaryButtonText="Сохранить"
      secondaryButtonText="Отменить"
      open={isOpen}
      onRequestClose={closeModal}
      onRequestSubmit={onFormSubmit}
    >
      <Form onSubmit={onFormSubmit}>
        <Stack gap={7}>
          <TextInput
            value={fileName}
            onChange={(e: any) => setFileName(e.target.value)}
            id="name"
            invalidText="Название обязательно"
            labelText="Введите название файла"
            placeholder="Название"
          />
          <TextArea
            value={fileDescription}
            onChange={(e: any) => setFileDescription(e.target.value)}
            style={{ width: "100%" }}
            cols={50}
            id="description"
            labelText="Введите описание файла"
            placeholder="Описание"
            rows={4}
          />
          <Wrapper>
            <div className="cds--file__container">
              <FUploader
                onChange={handleFileUpload}
                onDelete={handleRemoveFile}
                buttonKind="secondary"
                labelTitle="Загрузить"
                labelDescription=".* не более 500МБ"
                buttonLabel="Выбрать файл"
                filenameStatus="edit"
                iconDescription="Очистить"
              />
            </div>
          </Wrapper>
        </Stack>
      </Form>
    </Modal>
  );
};
