import DefaultUserAvatar from "../../../assets/images/avatar.png";

import styles from "./styles.module.scss";

const DefaultAvatar = () => {

  return (
    <img 
      alt="User avatar" 
      className={styles["avatar"]}
      src={DefaultUserAvatar}
     />
  )
}

export { DefaultAvatar };