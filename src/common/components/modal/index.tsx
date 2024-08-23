import clsx from "clsx";
import { type FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../index";
import { useModal } from "../../hooks/index";
import { type ModalProperties } from "../../types/index";

import styles from './styles.module.scss';
import { ButtonVariant } from "../../enums";

const Modal: FC<ModalProperties> = ({
    children,
    isOpen,
    onClose,
    title,
    variant,
}) => {
    const {
        preventModalCloseOnClick,
        handleOutsideClick,
        handleModalCloseOnEscapeKey,
    } = useModal({
        onClose,
        isOpen,
    });

    if (!isOpen) {
        return null;
    }

    return (
      <div
        className={styles["modal"]}
        role="button"
        onKeyDown={handleModalCloseOnEscapeKey}
        tabIndex={0}
        onClick={handleOutsideClick}
  >
      <div
          className={clsx(
              styles["modal_content"],
              styles[`modal_variant__${variant}`],
          )}
          onClick={preventModalCloseOnClick}
          role="button"
          tabIndex={0}
          onKeyDown={handleModalCloseOnEscapeKey}
      >
          <Button className={styles["content_button"]} onClick={onClose} variant={ButtonVariant.DEFAULT}>
              <FontAwesomeIcon  icon={faXmark}/>
          </Button>
          <div className={styles["content_title"]}>{title}</div>
          <div className={styles["content_body"]}>{children}</div>
          <div className={styles["content_actions"]}></div>
        </div>
      </div>
    );
};

export { Modal };
