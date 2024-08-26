import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { Button, DefaultAvatar } from "~/common/components/index";
import { getFormattedDate } from "~/common/helpers/index";
import { ButtonVariant, FormatDateType, MessageSenderRole } from "~/common/enums/index";
import { NewMessage, type Chat, type Message, type RandomQuote } from "~/common/types/index";
import { useCreateNewChatMessageMutation, useUpdateChatMessageMutation } from "~/redux/chats/chats-api";

import { ChatForm } from "../chat-form";
import styles from "./styles.module.scss";

type OpenChatProperties = {
  chat: Chat | undefined;
  onRefetchCurrentChat: () => void;
}
const OpenChat: React.FC<OpenChatProperties> = ({ chat, onRefetchCurrentChat }) => {
  const [createNewChatMessage] = useCreateNewChatMessageMutation();
  const [updateChatMessage] = useUpdateChatMessageMutation();

  const [editMessageId, setEditMessageId] = useState<string | null>(null);
  const [editMessageText, setEditMessageText] = useState<string>("");

  const handleMessageSubmit = useCallback(async (payload: NewMessage) => {
    if (chat && payload.text) {
      const newMessage = {
        text: payload.text,
        chatId: chat._id,
        senderRole: MessageSenderRole.USER,
      };

      await createNewChatMessage(newMessage).unwrap();
      onRefetchCurrentChat();
      await handleSuccess();
    } 
  }, [chat, createNewChatMessage, onRefetchCurrentChat]);

  const fetchQuote = async (): Promise<RandomQuote | undefined> => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_QUOTES_API}/?language_code=en`, {
        headers: {
          "x-rapidapi-host": "quotes15.p.rapidapi.com",
          "x-rapidapi-key": "2c214c09d8msh0c13cfb9f600e0dp186ebejsna1634052701b"
        }
      }); 
      return response.data; 
    } catch (error) {
      console.error("Error fetching quote:", error);
    }}

    const handleSuccess = async () => {

      if (chat) {
        const quote = await fetchQuote();

        if (quote) {
          const newMessage = {
            text: quote.content,
            chatId: chat._id,
            senderRole: MessageSenderRole.SYSTEM,
          };
          await createNewChatMessage(newMessage).unwrap();
          onRefetchCurrentChat();
          toast.success(quote.content);
        }
      }
    }
  
    const handleEditMessage = useCallback((message: Message) => {
      setEditMessageId(message._id);
      setEditMessageText(message.text);
    }, []);
  
    const handleMessageUpdate = useCallback(async () => {
      if (chat && editMessageId && editMessageText.trim()) {
        const updatedMessage = {
          text: editMessageText,
          chatId: chat._id,
          senderRole: MessageSenderRole.USER,
          _id: editMessageId,
        };
        await updateChatMessage({id: editMessageId, payload: updatedMessage})
        setEditMessageId(null);
        setEditMessageText("");
        onRefetchCurrentChat();
        
      }
    }, [chat, editMessageId, editMessageText, onRefetchCurrentChat]);

    const handleInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleMessageUpdate();
      }
    }, [handleMessageUpdate]);
  
    const handleInputBlur = useCallback(() => {
      handleMessageUpdate();
    }, [handleMessageUpdate]);

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
                      <div className={styles["message-content-container"]}>
                        <div className={styles["message-content"]}> 
                           {editMessageId === message._id ? (
                            <input
                              type="text"
                              value={editMessageText}
                              onChange={(e) => setEditMessageText(e.target.value)}
                              onKeyDown={handleInputKeyDown}
                              onBlur={handleInputBlur}
                              className={styles["edit-message-input"]}
                              autoFocus
                            />
                          ) : (
                            <div className={styles["message-text"]}>
                              {message.text}
                            </div>
                          )}
                          <div className={styles["message-timestamp"]}>
                            {getFormattedDate(message.timestamp, FormatDateType.MM_DD_YYYY_HH_MM_A)}
                          </div>
                        </div>
                          { message.senderRole === MessageSenderRole.USER && (
                            <Button
                              variant={ButtonVariant.DEFAULT}
                              onClick={() =>
                                editMessageId === message._id
                                  ? handleMessageUpdate()
                                  : handleEditMessage(message)
                              }
                            >
                              < FontAwesomeIcon 
                                className={styles["message-content__icon"]} 
                                icon={faPen}
                              />
                            </Button>
                          )}
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