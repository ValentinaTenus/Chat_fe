import { type KeyboardEvent, type SyntheticEvent, useCallback, useEffect } from "react";

import {
    type ModalHandlers,
    type ModalProperties,
} from "../types/index";

const ESCAPE_KEY = "Escape";

const useModal = ({
    onClose,
    isOpen,
}: Omit<ModalProperties, "children" | "variant">): ModalHandlers => {
    const handleOutsideClick = useCallback(() => onClose(), [onClose]);

    const preventModalCloseOnClick = useCallback(
        (event: SyntheticEvent) => event.stopPropagation(),
        [],
    );
    const handleModalCloseOnEscapeKey = useCallback(
        ({ key, target, currentTarget }: KeyboardEvent) => {
            if (key === ESCAPE_KEY && target === currentTarget) {
                handleOutsideClick();
            }
        },
        [handleOutsideClick],
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            return;
        }
        document.body.style.overflow = "auto";
    }, [isOpen]);

    return {
        handleOutsideClick,
        preventModalCloseOnClick,
        handleModalCloseOnEscapeKey,
    };
};

export { useModal };
