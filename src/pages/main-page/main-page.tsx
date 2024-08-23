import  {  useCallback, useState } from "react";

import { ChatSidebar, OpenChat } from "../../components/index";
import { useGetChatsQuery, useGetChatByIdQuery } from "../../redux/chats/chats-api";

import styles from "./styles.module.scss";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: chats } = useGetChatsQuery(searchTerm);

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

  const handleMessageSend = useCallback(() => {
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
      />
      {selectedChatId ? (
          <OpenChat chat={currentChat} onSubmit={handleMessageSend} />
        ) : (
          <p>Select a chat to start messaging</p>
      )}
    </div>
  )
}

export { MainPage };