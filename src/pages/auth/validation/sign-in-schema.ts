import * as Yup from "yup";

import { emailRegex, userValidationMessage } from "./constants.ts";

const userSignInValidation = Yup.object().shape({
	email: Yup.string()
		.email(userValidationMessage.EMAIL_INCORRECT)
		.matches(emailRegex, userValidationMessage.EMAIL_INCORRECT)
		.required(userValidationMessage.EMAIL_REQUIRED),
	password: Yup.string().required(userValidationMessage.PASSWORD_IS_MISSING),
});

export { userSignInValidation };