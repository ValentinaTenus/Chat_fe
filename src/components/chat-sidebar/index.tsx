import { EMPTY_LENGTH } from "~/common/constants/index.ts";
import { type Chat } from "~/common/types/chat/chat.type.ts";

import { ChatLink, ChatSidebarHead } from "../index.ts";
import styles from "./styles.module.scss";

type ChatSidebarProperties = {
	chats: Chat[];
  onRefetchChats: () => void;
  onSelectChat: (chatId: string) => void;
  onSearchChat: (searchTerm: string) => void;
  onSendRandomQuote: () => void;
  unreadMessages: { [key: string]: boolean };
};

const ChatSidebar: React.FC<ChatSidebarProperties> = ({ 
  chats,onRefetchChats, onSearchChat, onSelectChat, onSendRandomQuote, unreadMessages }) => {
  const isChats = chats.length > EMPTY_LENGTH;

  return (
    <>
      <div className={styles["chat-sidebar"]}>
        <ChatSidebarHead 
          onRefetchChats={onRefetchChats}
          onSearchChat={onSearchChat} 
          onSendRandomQuote={onSendRandomQuote}
        />
        <ul className={styles["chat-list"]}>
          {isChats && chats && chats.map((chat) => {
            return (
              <li className={styles["chat-item"]} key={chat._id}>
                <ChatLink 
                  chat={chat}
                  onSelectChat={onSelectChat}
                  onRefetchChats={onRefetchChats}
                  hasUnreadMessages={unreadMessages[chat._id] ? true : false}
                />
              </li>
            );
          })}
          {!isChats && (
            <li className={styles["chat-item"]}>
              <p className={styles["empty-list-message"]}>
                There are no chats yet.
              </p>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export { ChatSidebar };