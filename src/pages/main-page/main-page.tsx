import  {  useCallback,useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import { ChatSidebar, OpenChat } from "~/components/index";
import { useGetChatsQuery, useGetChatByIdQuery } from "~/redux/chats/chats-api";

import styles from "./styles.module.scss";

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: boolean }>({});
  const [selectedChatId, setSelectedChatId] = useState<string |  undefined>( undefined );

  const { data: chats, refetch: refetchChats } = useGetChatsQuery(searchTerm);
  const { data: currentChat, refetch: refetchCurrentChat } = useGetChatByIdQuery(selectedChatId!, {
    skip: !selectedChatId, 
  });

  const handleChatSelect = useCallback((chatId: string) => {
    setSelectedChatId(chatId);

    setUnreadMessages(prev => ({
      ...prev,
      [chatId]: false,
    }));
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleRefetchChats = useCallback(() => {
    refetchChats();
  }, [refetchChats]);

  const handleCurrentChatRefetch = useCallback(() => {
    if (selectedChatId) {
      refetchCurrentChat();  
    }
  }, [refetchCurrentChat, selectedChatId]);

  const handleSendQuote = useCallback(() => {
    socket.emit("send_quote_to_random_chat");
  }, []);
 
  useEffect(() => {
    socket.on("receive_message", ({ chatId }) => {
      if (selectedChatId !== chatId) {
        setUnreadMessages(prev => ({
          ...prev,
          [chatId]: true,
        }));
      }

      const chat = chats?.find(chat => chat._id === chatId);
      toast.success( `you have new message in chat ${chat?.firstName} ${chat?.lastName}`)
      refetchChats()
    });

    return () => {
        socket.off("receive_message");
    };
}, [chats, refetchChats, selectedChatId]);

  return (
    <div className={styles["main-page"]}>
      <ChatSidebar 
       chats={chats || []}
       onRefetchChats={handleRefetchChats}
       onSelectChat={handleChatSelect}
       onSearchChat={handleSearch}
       onSendRandomQuote={handleSendQuote}
       unreadMessages={unreadMessages}
      />
      {selectedChatId ? (
          <OpenChat 
            chat={currentChat}
            onRefetchChats={handleRefetchChats}
            onRefetchCurrentChat={handleCurrentChatRefetch}
          />
        ) : (
          <div className={styles["select-chat-message"]}>
            <p className={styles["select-chat-text"]}> Select a chat to start messaging</p>
          </div>
      )}
    </div>
  )
}

export { MainPage };