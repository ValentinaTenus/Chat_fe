import { FC } from "react";
import { useLocation } from "react-router-dom";

import { AppRoute } from "~/common/enums/index";

import { SignInForm, SignUpForm } from "./components/index";
import styles from "./styles.module.scss";

const Auth: FC = () => {

  const { pathname } = useLocation();

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
        case AppRoute.SIGN_IN: {
            return <SignInForm />;
        }
        case AppRoute.SIGN_UP: {
            return <SignUpForm />;
        }
        default: {
          return <SignInForm />
        };
    }
  };

  return (
    <div className={styles["auth"]}>
      <div className={styles["auth__container"]}>
          <section className={styles["auth__form-container"]}>
              <div className={styles["auth__form-content"]}>
                  {getScreen(pathname)}
              </div>
          </section>
      </div>
    </div>
  )
};

export { Auth };