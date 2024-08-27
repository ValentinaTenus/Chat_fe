import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "~/common/components/index";
import { AppRoute, ButtonVariant } from "~/common/enums/index";
import { type CreateNewChat } from "~/common/types/index";
import { logout } from "~/redux/auth/auth-slice";
import { useCreateNewChatMutation } from "~/redux/chats/chats-api";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { type RootState } from "~/redux/store";

import { ChatSearch } from "../chat-search";
import { ChatModal } from "../index";
import styles from "./styles.module.scss";

type ChatSidebarHeadProperties = {
  onRefetchChats: () => void;
  onSearchChat: (searchTerm: string) => void;
  onSendRandomQuote: () => void;
};

const ChatSidebarHead: React.FC<ChatSidebarHeadProperties> = ({
  onRefetchChats, onSearchChat, onSendRandomQuote
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [createNewChat] = useCreateNewChatMutation();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleCreateNewChat  = useCallback(async(data: CreateNewChat) => {
    await createNewChat(data);
    handleModalClose();
    onRefetchChats();
  }, [createNewChat, handleModalClose, onRefetchChats]);

  const handleLogOut  = useCallback(() => {
    void dispatch(logout());
  }, [dispatch]);

	return (
    <div className={styles["chat-sidebar-head"]}>
      <div className={styles["buttons"]}>
        <FontAwesomeIcon icon={faUser} className={styles["user__icon"]}/>
        {user && (
          <Button 
          className={styles["login__button"]} 
          onClick={handleLogOut}
          variant={ButtonVariant.OUTLINED}
        >
          Log Out
        </Button>
        )}
        { !user && (
          <Link to={AppRoute.SIGN_IN}>
            <Button 
              className={styles["login__button"]} 
              variant={ButtonVariant.OUTLINED}
            >
              Log In
            </Button>
         </Link>
        )}
      </div>
      <ChatSearch onSearchChat={onSearchChat} />
      <div className={styles["buttons-container"]}>
        <Button 
          onClick={handleModalOpen}
          variant={ButtonVariant.OUTLINED}
        >
          Create New Chat
        </Button>
        <Button 
          onClick={onSendRandomQuote}
          variant={ButtonVariant.OUTLINED}
        >
          Send Random Quote
        </Button>
      </div>
      <ChatModal 
        isOpen={isModalOpen} 
        onSubmit={handleCreateNewChat} 
        onRequestClose={handleModalClose} 
      />
    </div>
	);
};

export { ChatSidebarHead };