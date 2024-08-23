import { EMPTY_LENGTH } from "../../common/constants/index.ts";
import { type Chat } from "../../common/types/chat.type.ts";

import { ChatLink, ChatSidebarHead } from "../index.ts";
import styles from "./styles.module.scss";

type ChatSidebarProperties = {
	chats: Chat[];
  onSelectChat: (chatId: string) => void;
  onSearchChat: (searchTerm: string) => void;
};

const ChatSidebar: React.FC<ChatSidebarProperties> = ({ chats, onSearchChat, onSelectChat }) => {
  const isChats = chats.length > EMPTY_LENGTH;

  return (
    <>
      <div className={styles["chat-sidebar"]}>
        <ChatSidebarHead onSearchChat={onSearchChat} />
        {isChats && chats && chats.map((chat) => {
          return (
            <li className={styles["chat-item"]} key={chat._id}>
              <ChatLink 
                chat={chat}
                onSelectChat={onSelectChat}
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
      </div>
    </>
  )
}

export { ChatSidebar };