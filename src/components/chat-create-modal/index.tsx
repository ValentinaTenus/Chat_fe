import React, { useCallback,useEffect } from "react";

import { Button, Input, Modal } from "../../common/components/index";
import { ButtonType, ButtonVariant, ModalVariant } from "../../common/enums/index";
import { useAppForm } from "../../common/hooks/index";
import { type CreateNewChat } from "../../common/types/index";
import { useCreateNewChatMutation } from "../../redux/chats/chats-api";

import { createNewChatValidation } from "./validation";
import styles from "./styles.module.scss";

type ChatCreateModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const ChatCreateModal: React.FC<ChatCreateModalProps> = ({ isOpen, onRequestClose }) => {
  const [createNewChat] = useCreateNewChatMutation();

	const {
    control,
		errors,
		handleSubmit,
    reset
	} = useAppForm<CreateNewChat>({
		defaultValues: {
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
			createNewChat(data);
      onRequestClose(); 
		})();
	}, [createNewChat, handleSubmit, onRequestClose]);

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
            Create Chat
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

export { ChatCreateModal };
