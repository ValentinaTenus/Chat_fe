import axios from "axios";
import { useCallback } from "react";

import { DefaultAvatar } from "../../common/components";
import { getFormattedDate } from "../../common/helpers";
import { FormatDateType, MessageSenderRole } from "../../common/enums";
import { NewMessage, type Chat, type Message, type RandomQuote } from "../../common/types";
import { useCreateNewChatMessageMutation } from "../../redux/chats/chats-api";

import { ChatForm } from "../chat-form";
import styles from "./styles.module.scss";

type OpenChatProperties = {
  chat: Chat | undefined;
  onSubmit: () => void;
}
const OpenChat: React.FC<OpenChatProperties> = ({ chat, onSubmit }) => {
  const [createNewChatMessage] = useCreateNewChatMessageMutation();

  const handleMessageSubmit = useCallback(async (payload: NewMessage) => {
    if (chat && payload.text) {
      const newMessage = {
        text: payload.text,
        chatId: chat._id,
        senderRole: MessageSenderRole.USER,
      };

      await createNewChatMessage(newMessage).unwrap();
      onSubmit();
      await handleSuccess();
    }
  }, [chat, createNewChatMessage, onSubmit]);

  const fetchQuote = async (): Promise<RandomQuote[] | undefined> => {
    try {
      const response = await axios.get(`${import.meta.env.QUOTES_API}`); 
      return response.data; 
    } catch (error) {
      console.error("Error fetching quote:", error);
    }}

    const handleSuccess = async () => {

      if (chat) {
        const quote = await fetchQuote();

        if (quote) {
          const newMessage = {
            text: quote[0]?.content,
            chatId: chat._id,
            senderRole: MessageSenderRole.SYSTEM,
          };
          await createNewChatMessage(newMessage).unwrap();
          onSubmit();
        }
      }
    }

  return (
    <>
      {chat && (
        <div className={styles["open-chat"]}>
          <div className={styles["nav-container"]}>
            <div className={styles["user-container"]}>
              <div className={styles["user-avatar"]}>
                <DefaultAvatar />
              </div>
              <span  className={styles["user-name"]}>{chat.firstName}{"  "}{chat.lastName}</span>
            </div>
          </div>
          <div className={styles["chat"]}>
          <ul className={styles["chat-container"]}>
              {chat.messages.length > 0 ? (
                chat.messages.map((message: Message) => (
                  <li
                    key={message._id}
                    className={`${styles["chat-message"]} ${
                      message.senderRole === MessageSenderRole.USER
                        ? styles["user-message"]
                        : styles["system-message"]
                    }`}
                  >
                    <div className={styles["message"]}>
                      <div className={styles["message-user-avatar"]}>
                        {message.senderRole === MessageSenderRole.USER ? (
                          <DefaultAvatar />
                        ) : null
                        }
                      </div>
                      <div className={styles["message-content"]}> 
                        <div className={styles["message-text"]}>{message.text}</div>
                        <div className={styles["message-timestamp"]}>
                          {getFormattedDate(message.timestamp, FormatDateType.MM_DD_YYYY_HH_MM_A)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>No messages in this chat.</li>
              )}
            </ul>
            <div className={styles["message__form"]}>
              <ChatForm onSubmit={handleMessageSubmit}/>
            </div>
          </div>
        </div>
        )
      }
    </>
  )
}

export { OpenChat };