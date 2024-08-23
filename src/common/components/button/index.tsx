import clsx from "clsx";
import { type ReactNode } from "react";

import { type ButtonType, type ButtonVariant } from "../../enums/index.ts";
import { type ValueOf } from "../../types/index.ts";

import styles from "./styles.module.scss";

const variants: Record<ButtonVariant, string> = {
    default: styles.button__base,
    primary: styles.button__primary,
    outlined: styles.button__outlined,
};

type ButtonProperties = {
    children?: ReactNode;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: ValueOf<typeof ButtonType>;
    variant: ValueOf<typeof ButtonVariant>;
};

const Button: React.FC<ButtonProperties> = ({
    children,
    disabled,
    onClick,
    className,
    type,
    variant,
    ...restProperties
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                styles.button,
                variants[variant],
                className,
            )}
            type={type}
            {...restProperties}
        >
            {children}
        </button>
    );
};

export { Button };
