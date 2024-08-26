import * as Yup from "yup";

import {
	emailRegex,
	userValidationMessage,
	userValidationRules,
} from "./constants.ts";

const userSignUpValidation = Yup.object().shape({
	email: Yup.string()
		.email(userValidationMessage.EMAIL_INCORRECT)
		.matches(emailRegex, userValidationMessage.EMAIL_INCORRECT)
		.required(userValidationMessage.EMAIL_REQUIRED),
	firstName: Yup.string()
		.min(
			userValidationRules.NAME_MIN_LENGTH,
			userValidationMessage.FIRST_NAME_MIN_LENGTH,
		)
		.required(userValidationMessage.FIRST_NAME_REQUIRED),
	lastName: Yup.string()
		.min(
			userValidationRules.NAME_MIN_LENGTH,
			userValidationMessage.LAST_NAME_MIN_LENGTH,
		)
		.required(userValidationMessage.LAST_NAME_REQUIRED),
	password: Yup.string()
		.min(
			userValidationRules.PASSWORD_MIN_LENGTH,
			userValidationMessage.PASSWORD_MIN_LENGTH,
		)
		.required(userValidationMessage.PASSWORD_REQUIRED),
});

export { userSignUpValidation };
