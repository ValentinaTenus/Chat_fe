import { useCallback } from "react";

import { DefaultAvatar } from "../../common/components";
import { getFormattedDate } from "../../common/helpers/index";
import { FormatDateType } from "../../common/enums";
import { type Chat } from "../../common/types/index";

import styles from "./styles.module.scss";

type ChatLinkProperties = {
  chat: Chat;
  onSelectChat: (chatId: string) => void;
};

const ChatLink: React.FC<ChatLinkProperties> = ({ chat, onSelectChat }) => {
  const lastMessage = chat?.messages[chat.messages.length - 1];
  let date;

  if ( lastMessage?.timestamp)  {
    date = getFormattedDate(lastMessage.timestamp, FormatDateType.MMMM_DO_YYYY);
  }

  const handleSelectChat = useCallback(() => {
    onSelectChat(chat._id);
  }, [onSelectChat, chat._id]);

  return(
    <div className={styles["container"]} onClick={handleSelectChat}>
      <div className={styles["avatar"]}>
        <DefaultAvatar />
      </div>
      <div className={styles["text-container"]}>
        <div className={styles["message-container"]}>
          <span className={styles["name"]}>
              {`${chat.firstName} ${chat.lastName}`}
          </span>
          <p className={styles["message"]}>
            {lastMessage ? lastMessage.text.slice(0, 30) : "No messages"}
          </p>
        </div>
        <div className={styles["date"]}>
          <span className={styles["date"]}>
            {date}
          </span>
        </div>
      </div>
    </div>
  )
}

export { ChatLink };