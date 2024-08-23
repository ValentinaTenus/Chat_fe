import { ChangeEvent, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

type ChatSearchProperties = {
  onSearchChat: (searchTerm: string) => void;
};

const ChatSearch: React.FC<ChatSearchProperties> = ({ 
	onSearchChat }) => {
	const [searchTerm, setSearchTerm] = useState("");
	
	const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value
    setSearchTerm(term);
		onSearchChat(term);
  }, [onSearchChat]);

	return (
		<form
			className={styles["form"]}
		>
			<FontAwesomeIcon className={styles["search__icon"]} icon={faMagnifyingGlass} />
			<input
				className={styles["search__input"]}
				onChange={handleSearch}
				placeholder="Search or start new chat"
				value={searchTerm}
			/>
		</form>
	);
};

export { ChatSearch };