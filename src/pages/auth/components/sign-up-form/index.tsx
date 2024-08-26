import { FC } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { Button, Input } from "~/common/components/index";
import { AppRoute, ButtonType, ButtonVariant } from "~/common/enums/index";

import { useGoogleLogin, useSignUpForm } from "../../hooks/index";
import styles from "./styles.module.scss";

const SignUpForm: FC = () => {
	const { 
    control, 
    errors, 
    handleFormSubmit, 
    isLoading, 
    serverError, 
  } = useSignUpForm();
  
  const { 	
    serverError: googleLoginError,
    handleGoogleLoginSuccess
  } = useGoogleLogin();

  return (
    <>
      <div className={styles["sign-up-head"]}>
        <h2 className={styles["sign-up-header"]}> Sign Up</h2>
        <div>
          <span className={styles["head-message"]}> You already have account? Go to {" "}</span>
          <span className={styles["head-message-link"]}><Link to={AppRoute.SIGN_IN}>Sign In</Link></span>
        </div>
        <GoogleLogin
					logo_alignment="center"
  				onSuccess={handleGoogleLoginSuccess}
					type="icon"
				/>
      </div>
      <form
        autoComplete="off"
        className={styles["form"]}
        onSubmit={handleFormSubmit}
      >
        <Input
          control={control}
          errors={errors}
          label="First Name"
          name="firstName"
          placeholder="First Name"
        />
        <Input
          control={control}
          errors={errors}
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
        />
        <Input
          control={control}
          errors={errors}
          label="Email"
          name="email"
          placeholder="Your email"
        />
        <Input
          control={control}
          errors={errors}
          label="Password"
          name="password"
          placeholder="Your password"
        />
        <Button
          className={styles["send__button"]}
          disabled={isLoading}
          type={ButtonType.SUBMIT}
          variant={ButtonVariant.PRIMARY}
        >
          Submit
        </Button>
        {(serverError) && (
					<p className={styles["error"]}>
						{serverError}
					</p>
				)}
        {(googleLoginError) && (
					<p className={styles["error"]}>
						{googleLoginError}
					</p>
				)}
		</form>
    </>
  )
};

export { SignUpForm };