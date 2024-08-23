import { type ReactNode } from "react";

import { type ModalVariant } from "../../enums/index";

type ModalProperties = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    variant: ModalVariant;
};

export { type ModalProperties };
