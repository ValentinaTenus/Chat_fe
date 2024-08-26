import React, { useCallback,useEffect } from "react";

import { Button, Input, Modal } from "../../common/components/index";
import { ButtonType, ButtonVariant, ModalVariant } from "../../common/enums/index";
import { useAppForm } from "../../common/hooks/index";
import { type CreateNewChat } from "../../common/types/index";

import { createNewChatValidation } from "./validation";
import styles from "./styles.module.scss";

type ChatCreateModalProps = {
  defaultData?: CreateNewChat;
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: CreateNewChat) => void;
};

const CreateChatModal: React.FC<ChatCreateModalProps> = ({ 
  defaultData, isOpen, onRequestClose, onSubmit }) => {

	const {
    control,
		errors,
		handleSubmit,
    reset
	} = useAppForm<CreateNewChat>({
		defaultValues: defaultData ?? {
      	firstName: "",
      	lastName: "",
      },
		validationSchema: createNewChatValidation,
	});

  useEffect(() => {
    if (!isOpen) {
      reset(); 
    }
  }, [isOpen, reset]);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit((data: CreateNewChat) => {
      onSubmit(data);
      onRequestClose();
		})();
	}, [handleSubmit, onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onRequestClose}
      variant={ModalVariant.FORM}
      title="Create New Chat"   
    >
      <form className={styles["create-chat-form"]}>
          <Input
            control={control}
            errors={errors}
            label="First Name"
            name="firstName"
            type="text"
          />
          <Input
            control={control}
            errors={errors}
            label="Last Name"
            name="lastName"
            type="text"
          />
        <div className={styles["create-chat-buttons"]}>
          <Button
            className={styles["create-chat-button"]}
            onClick={handleFormSubmit} 
            type={ButtonType.BUTTON} 
            variant={ButtonVariant.PRIMARY}
          >
            Send
          </Button>
          <Button 
            className={styles["create-chat-button"]}
            type={ButtonType.BUTTON} 
            onClick={onRequestClose} 
            variant={ButtonVariant.OUTLINED}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export { CreateChatModal };
