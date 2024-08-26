import  {  useCallback, useState } from "react";

import { ChatSidebar, OpenChat } from "~/components/index";
import { useGetChatsQuery, useGetChatByIdQuery } from "~/redux/chats/chats-api";

import styles from "./styles.module.scss";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: chats, refetch: refetchChats } = useGetChatsQuery(searchTerm);

  const [selectedChatId, setSelectedChatId] = useState<string |  undefined>( undefined );

  const { data: currentChat, refetch: refetchCurrentChat } = useGetChatByIdQuery(selectedChatId!, {
    skip: !selectedChatId, 
  });

  const handleChatSelect = useCallback((chatId: string) => {
    setSelectedChatId(chatId);    
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

  return (
    <div className={styles["main-page"]}>
      <ChatSidebar 
       chats={chats || []}
       onSelectChat={handleChatSelect}
       onSearchChat={handleSearch}
       onRefetchChats={handleRefetchChats}
      />
      {selectedChatId ? (
          <OpenChat chat={currentChat} onRefetchCurrentChat={handleCurrentChatRefetch} />
        ) : (
          <div className={styles["select-chat-message"]}>
            <p className={styles["select-chat-text"]}> Select a chat to start messaging</p>
          </div>
      )}
    </div>
  )
}

export { MainPage };