import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";

import { Button, DefaultAvatar, Modal } from "~/common/components/index";
import { getFormattedDate } from "~/common/helpers/index";
import { ButtonVariant, FormatDateType, ModalVariant } from "~/common/enums/index";
import { CreateNewChat, type Chat } from "~/common/types/index";
import { useDeleteChatMutation, useUpdateChatMutation } from "~/redux/chats/chats-api";

import { ChatModal } from "../index";
import styles from "./styles.module.scss";

type ChatLinkProperties = {
  chat: Chat;
  hasUnreadMessages: boolean;
  onSelectChat: (chatId: string) => void;
  onRefetchChats: () => void;
};

const ChatLink: React.FC<ChatLinkProperties> = ({ 
  chat, hasUnreadMessages, onSelectChat, onRefetchChats }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [updateChat] = useUpdateChatMutation();
  const [deleteChat] = useDeleteChatMutation();
  const lastMessage = chat?.messages[chat.messages.length - 1];
  let date;

  if ( lastMessage?.timestamp)  {
    date = getFormattedDate(lastMessage.timestamp, FormatDateType.MMMM_DO_YYYY);
  }

  const handleSelectChat = useCallback(() => {
    onSelectChat(chat._id);
  }, [onSelectChat, chat._id]);

  const handleUpdateChat  = useCallback(async (data: CreateNewChat) => {
    await updateChat({ id: chat._id, data});
    onRefetchChats();
  }, [chat, onRefetchChats, updateChat]);

  const handleUpdateModalOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsUpdateModalOpen(true);
  }, []);

  const handleUpdateModalClose = useCallback(() => {
    setIsUpdateModalOpen(false);
  }, []);

  const handleDeleteModalOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteModalClose = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleDeleteConfirm = useCallback(async() => {
    await deleteChat(chat._id);
    onRefetchChats();
  }, [chat, deleteChat, onRefetchChats])

  return(
    <>
      <div className={styles["container"]} onClick={handleSelectChat}>
        <div className={styles["avatar"]}>
          <DefaultAvatar />
        </div>
        <div className={styles["text-container"]}>
          <div className={styles["message-container"]}>
            <span className={styles["name"]}>
              {`${chat.firstName} ${chat.lastName}`}
              {" "}
              {hasUnreadMessages && (
                <FontAwesomeIcon icon={faCircle} color="green" width="10px"/>
              )}
            </span>
            <p className={styles["message"]}>
              {lastMessage ? lastMessage.text.slice(0, 30) : "No messages"}
            </p>
          </div>
          <div className={styles["right__section"]}>
            <div className={styles["dropdown"]}>
              <Button
                className={styles["dots__button"]}
                variant={ButtonVariant.DEFAULT}
              >
                <FontAwesomeIcon icon={faEllipsis}/>
              </Button>
              <div className={styles["menu"]}>
                  <Button 
                    className={styles["menu-item"]} 
                    onClick={handleUpdateModalOpen}
                    variant={ButtonVariant.DEFAULT}
                  >
                    Update
                  </Button>
                  <Button 
                    className={styles["menu-item"]} 
                    onClick={handleDeleteModalOpen}
                    variant={ButtonVariant.DEFAULT}
                  >
                    Delete
                  </Button>
                </div>
            </div>
            <div className={styles["date"]}>
              <span className={styles["date"]}>
                {date}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isUpdateModalOpen && (
        <ChatModal
          defaultData={{firstName: chat.firstName, lastName: chat.lastName}}
          isOpen={isUpdateModalOpen}
          isUpdateChat
          onRequestClose={handleUpdateModalClose}
          onSubmit={handleUpdateChat}
        />
      )}
      {isDeleteModalOpen && (
        <Modal 
          isOpen={isDeleteModalOpen}
          variant={ModalVariant.CONFIRM}
          onClose={handleDeleteModalClose}
          title="Confirm Deletion"
        > 
          <div className={styles["delete-modal-content"]}>
            <p>Are you sure you want to delete this chat? This action cannot be undone.</p>
              <div className={styles["delete-modal-buttons"]}> 
                <Button
                  className={styles["button"]}
                  onClick={handleDeleteConfirm} 
                  variant={ButtonVariant.DANGER}
                >
                  Delete
                </Button>
                <Button 
                  className={styles["button"]}
                  onClick={handleDeleteModalClose} 
                  variant={ButtonVariant.OUTLINED}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
      )}
    </>
  )
}

export { ChatLink };