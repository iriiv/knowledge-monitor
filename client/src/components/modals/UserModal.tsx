import { Modal } from "@carbon/react";
import { Form, Stack, TextInput } from "@carbon/react";

export type ModalComponentProps = {
  closeModal: () => void;
  onSubmit: (a: any) => void;
  title: string;
  isOpen: boolean;

  data?: any;
};

import { useEffect, useState } from "react";

export const UserModal = ({
  closeModal,
  onSubmit,
  isOpen,
  title,
  data,
}: ModalComponentProps) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    initForm();
  }, [data]);

  const onFormSubmit = () => {
    const formValues: any = {
      userId: data.userId,
      name,
      // telegram,
      phone,
      email,
      // department,
    };

    onSubmit(formValues);
    initForm();
    closeModal();
  };

  const onFormClose = () => {
    initForm();
    closeModal();
  };

  const initForm = async () => {
    setName(data?.name || "");
    setPhone(data?.phone || "");
    setEmail(data?.email || "");
    setTelegram(data?.telegram || "");
    setDepartment(data?.department || "");
  };

  return (
    <Modal
      modalHeading={title}
      primaryButtonText="Сохранить"
      secondaryButtonText="Отменить"
      open={isOpen}
      onRequestClose={onFormClose}
      onRequestSubmit={onFormSubmit}
    >
      <Form onSubmit={onFormSubmit}>
        <Stack gap={7}>
          <TextInput
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            id="name"
            invalidText="Название обязательно"
            labelText="Введите имя"
            placeholder="Имя"
          />
          <TextInput
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            id="email"
            labelText="Введите почту"
            placeholder="Email"
          />
          <TextInput
            value={phone}
            onChange={(e: any) => setPhone(e.target.value)}
            id="phone"
            invalid={!phone.match(/\+[0-9]+/i)}
            invalidText="Неверный номер телефона"
            labelText="Введите номер телефона"
            helperText="Телефон формата +71234567890"
            placeholder="Номер телефона"
          />
          {/* <TextInput
            value={telegram}
            onChange={(e: any) => setTelegram(e.target.value)}
            id="link"
            labelText="Дополнител"
            placeholder="Email"
          /> */}
          {/* <Select
            value={icon}
            onChange={(e: any) => setIcon(e.target.value)}
            id="icon"
            labelText="Выберите иконку"
          >
            {icons.map((icon) => (
              <SelectItem text={icon} value={icon} />
            ))}
          </Select> */}
        </Stack>
      </Form>
    </Modal>
  );
};
