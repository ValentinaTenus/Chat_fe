import * as Yup from "yup";

const createNewMessageValidation = Yup.object().shape({
	text: Yup.string(),
});

export { createNewMessageValidation };
