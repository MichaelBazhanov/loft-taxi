import PropTypes from "prop-types";
import CustomLink from "../CustomLink";
import { styles } from "./styles";

const NavigationMobile = ({ logOut, navigationMobileRef, defaultMenu }) => {
  return (
    <div className={styles.container} ref={navigationMobileRef}>
      <nav className={styles.nav}>
        <CustomLink to={"map"} text={"Карта"} defaultMenu={defaultMenu} />
        <CustomLink to={"profile"} text={"Профиль"} defaultMenu={defaultMenu} />
        <CustomLink
          to={"login"}
          text={"Выйти"}
          defaultMenu={defaultMenu}
          logOut={logOut}
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
