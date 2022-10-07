import PropTypes from "prop-types";
import CustomLink from "../CustomLink";
import { styles } from "./styles";

const NavigationMobile = ({ logOut, navigationMobileRef, defaultMenu }) => {
  return (
    <div className={styles.container} ref={navigationMobileRef}>
      <nav className={styles.nav}>
        <CustomLink
          to={"map"}
          text={"Карта"}
          defaultMenu={defaultMenu}
          iconName="map"
          iconSize={styles["icon-size"]}
        />
        <CustomLink
          to={"profile"}
          text={"Профиль"}
          defaultMenu={defaultMenu}
          iconName="profile"
          iconSize={styles["icon-size"]}
        />
        <CustomLink
          to={"login"}
          text={"Выйти"}
          defaultMenu={defaultMenu}
          logOut={logOut}
          iconName="logout"
          iconSize={styles["icon-size"]}
        />
      </nav>
    </div>
  );
};

NavigationMobile.propTypes = {
  logOut: PropTypes.func.isRequired,
  defaultMenu: PropTypes.func.isRequired,
  navigationMobileRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};

export default NavigationMobile;
