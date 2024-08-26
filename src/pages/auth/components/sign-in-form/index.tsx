import { FC } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { Button, Input } from "~/common/components/index";
import { AppRoute, ButtonType, ButtonVariant } from "~/common/enums/index";

import { useGoogleLogin, useSignInForm } from "../../hooks/index";
import styles from "./styles.module.scss";

const SignInForm: FC = () => {

  const {
		control,
		errors,
		handleFormSubmit,
		isLoading,
		serverError,
	} = useSignInForm();

  const { 	
    serverError: googleLoginError,
    handleGoogleLoginSuccess
  } = useGoogleLogin();

  return (
    <>
      <div className={styles["sign-in-head"]}>
        <h2 className={styles["sign-in-header"]}> Sign In</h2>
        <div>
          <span className={styles["head-message"]}> Don't you have account yet? Go to {" "}</span>
          <span className={styles["head-message-link"]}><Link to={AppRoute.SIGN_UP}>Sign Up</Link></span>
        </div>
      </div>
      <GoogleLogin
					logo_alignment="center"
  				onSuccess={handleGoogleLoginSuccess}
					type="icon"
				/>
      <form
        autoComplete="off"
        className={styles["form"]}
        onSubmit={handleFormSubmit}
      >
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
        {serverError && (
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

export { SignInForm };