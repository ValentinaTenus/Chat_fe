const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const userValidationMessage = {
	EMAIL_INCORRECT: "Email format is incorrect",
	EMAIL_REQUIRED: "Email is required",
	FIRST_NAME_MIN_LENGTH: "First name should have at least 2 characters",
	FIRST_NAME_REQUIRED: "First name is required",
	LAST_NAME_MIN_LENGTH: "Last name should have at least 2 characters",
	LAST_NAME_REQUIRED: "last name is required",
	PASSWORD_IS_MISSING: "Password is missing",
	PASSWORD_MIN_LENGTH: "Password needs to be at least 8 characters",
	PASSWORD_REQUIRED: "Password is required",
} as const;

const userValidationRules = {
	NAME_MIN_LENGTH: 2,
	PASSWORD_MIN_LENGTH: 8,
};

export { emailRegex, userValidationMessage, userValidationRules };
