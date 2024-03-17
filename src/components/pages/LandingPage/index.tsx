import styles from "./Header.module.css";
// import LogoImage from "./images/logo-white.png";
import logo from "../../../img/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles["header__logo-box"]}>
          <img src={logo} alt="Logo" className={styles["header__logo"]} />
        </div>

        <div className={styles["header__text-box"]}>
          <h1 className={styles["heading-primary"]}>
            <span className={styles["heading-primary--main"]}>Kalyankar's</span>
            <span className={styles["heading-primary--sub"]}>
              is where life happens
            </span>
          </h1>

          <Link
            to="/admin-login"
            className={`${styles.btn} ${styles["btn--white"]} ${styles["btn--animated"]}`}
          >
            Admin Login
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
