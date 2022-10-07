import { NavLink } from "react-router-dom";
import { styles } from "./styles";
import PropTypes from "prop-types";

const NavigationDesktop = ({ logOut }) => {
  return (
    <nav className={styles.nav}>
      <button type="button" className={styles.button}>
        <NavLink to={"map"} className={styles.setActive}>
          Карта
        </NavLink>
      </button>

      <button type="button" className={styles.button}>
        <NavLink to={"profile"} className={styles.setActive}>
          Профиль
        </NavLink>
      </button>

      <button onClick={() => logOut()} type="button" className={styles.button}>
        <NavLink to={"login"} className={styles.setActive}>
          Выйти
        </NavLink>
      </button>
    </nav>
  );
};

NavigationDesktop.propTypes = {
  props: PropTypes.shape({
    logOut: PropTypes.func.isRequired,
  }),
};

export default NavigationDesktop;
