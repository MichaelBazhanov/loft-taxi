import logoTaxi from "../../assets/images/logo-taxi.svg";
import NavigationDesktop from "../NavigationDesktop";
import { styles } from "./styles";

const HeaderDesktop = ({ logOut }) => {
  return (
    <>
      <div className={styles["header-container"]}>
        <div className={styles.div}>
          <img src={logoTaxi} alt="logo-taxi" />

          <NavigationDesktop logOut={logOut} />
        </div>
      </div>
    </>
  );
};

export default HeaderDesktop;
