import clsx from "clsx";
import { useEffect } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
    useController
} from "react-hook-form";

import styles from "./styles.module.scss";

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
	ref?: React.RefObject<HTMLTextAreaElement>
	rows?: number;
};

const Input = <T extends FieldValues>({
	className,
	control,
	errors,
	label,
	name,
	placeholder = "",
	type = "text",
	ref,
	rows,
}: Properties<T>): JSX.Element => {
	const { field } = useController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const isTextArea = Boolean(rows);

	const inputClasses = clsx(
		className,
		styles["input"],
		hasError && styles["input__error"],
		isTextArea && styles["textarea"]
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    if (textarea) {
      textarea.style.height = "auto"; 
      textarea.style.height = `${textarea.scrollHeight}px`; 
    }
  };

  useEffect(() => {
    if (ref && ref.current) {
      handleInputChange({ target: ref.current } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }, [ref]);

	return (
		<label className={styles["container"]}>
			<span className={"label"}>{label}</span>
			{ isTextArea ? (
				<textarea
					className={inputClasses}
					{...field}
					placeholder={placeholder}
					rows={rows}
					onChange={(e) => {
            field.onChange(e);
            handleInputChange(e);
          }}
          onBlur={field.onBlur}
          value={field.value || ""}
          ref={ref} 
				/>
			) : (
				<input
					className={inputClasses}
					{...field}
					placeholder={placeholder}
					type={type}
				/>
			)}
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</label>
	);
};

export { Input };