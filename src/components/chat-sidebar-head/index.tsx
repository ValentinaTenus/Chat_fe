import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";

import { Button } from "../../common/components";

import { ChatCreateModal } from "../chat-create-modal";
import { ChatSearch } from "../chat-search";
import styles from "./styles.module.scss";
import { ButtonVariant } from "../../common/enums";

type ChatSidebarHeadProperties = {
  onSearchChat: (searchTerm: string) => void;
};

const ChatSidebarHead: React.FC<ChatSidebarHeadProperties> = ({
  onSearchChat
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCreateNewChat = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

	return (
    <div className={styles["chat-sidebar-head"]}>
      <div className={styles["buttons"]}>
        <FontAwesomeIcon icon={faUser} className={styles["user__icon"]}/>
        <Button className={styles["login__button"]} variant={ButtonVariant.OUTLINED}>Log In</Button>
      </div>
      <ChatSearch onSearchChat={onSearchChat} />
      <Button 
        className={styles["add-chat__button"]}
        onClick={handleCreateNewChat}
        variant={ButtonVariant.OUTLINED}
      >
        Create New Chat
      </Button>
      <ChatCreateModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
	);
};

export { ChatSidebarHead };