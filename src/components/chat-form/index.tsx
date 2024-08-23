import { useCallback, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { Button, Input } from "../../common/components/index";
import { useAppForm } from "../../common/hooks/index";
import { type NewMessage } from "../../common/types/index";

import { createNewMessageValidation } from "./new-message.validation";
import styles from "./styles.module.scss";
import { ButtonType, ButtonVariant } from "../../common/enums";

type Properties = {
	onSubmit: (payload: NewMessage) => void;
};

const ChatForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	
	const {
		control,
		errors,
		formState: { isSubmitSuccessful },
		handleSubmit,
		reset,
	} = useAppForm<NewMessage>({
		defaultValues: {
      text: "",
    },
		validationSchema: createNewMessageValidation,
	});

	useEffect(() => {
		if (isSubmitSuccessful) {
      reset();

			if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; 
      }
    }
	}, [isSubmitSuccessful, reset]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);

			if (textAreaRef.current) {
				textAreaRef.current.style.height = "auto"; 
			}
		},
		[handleSubmit, onSubmit],
	);

	return (
		<form
			autoComplete="off"
			className={styles["form"]}
			onSubmit={handleFormSubmit}
		>
			<Input
				className={styles["form__input"]}
				control={control}
				errors={errors}
				label=""
				name="text"
				placeholder="Type your message"
				rows={1}
				ref={textAreaRef}
			/>
			<Button
				className={styles["send__button"]}
				type={ButtonType.SUBMIT}
        variant={ButtonVariant.DEFAULT}
			>
				<FontAwesomeIcon className={styles["send__icon"]} icon={faPaperPlane}  />
			</Button>
		</form>
	);
};

export { ChatForm };