import * as Yup from "yup";

enum createNewChatValidationMessage {
  FIRST_NAME_REQUIRED = "First name is required",
  LAST_NAME_REQUIRED = "Last name is required",
};

const createNewChatValidation = Yup.object().shape({
	firstName: Yup.string().required(createNewChatValidationMessage.FIRST_NAME_REQUIRED).min(1),
	lastName: Yup.string().required(createNewChatValidationMessage.LAST_NAME_REQUIRED).min(1),
});

export { createNewChatValidation };
