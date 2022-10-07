import { useRef } from "react";
import NavigationMobile from "../NavigationMobile";
import PropTypes from "prop-types";
import { styles } from "./styles";

const toggleMenu = ({ menuButton, menuContent, active_, in_, out_ }) => {
  if (menuButton && menuContent) {
    menuButton.classList.toggle(active_); // color

    // animate add and remove
    if (menuContent.classList.contains(in_)) {
      menuContent.classList.remove(in_);
      menuContent.classList.add(out_);
    } else {
      menuContent.classList.add(in_);
      menuContent.classList.remove(out_);
    }
  }
};

const defaultMenu = ({ menuButton, menuContent, active_, in_, out_ }) => {
  // animate remove
  if (menuButton && menuContent) {
    menuButton.classList.remove(active_);
    menuContent.classList.remove(in_);
    menuContent.classList.remove(out_);
  }
};

const HeaderMobile = ({ logOut }) => {
  const headerMobileRef = useRef();
  const navigationMobileRef = useRef();

  return (
    <>
      <div
        className={styles["header-container"]}
        onClick={() =>
          toggleMenu({
            menuButton: headerMobileRef.current,
            menuContent: navigationMobileRef.current,
            active_: styles.active_,
            in_: styles.in_,
            out_: styles.out_,
          })
        }
        ref={headerMobileRef}
      >
        <svg
          width="25"
          height="17"
          viewBox="0 0 25 17"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          <rect width="25" height="3" rx="1.5" />
          <rect y="7" width="17" height="3" rx="1.5" />
          <rect y="14" width="25" height="3" rx="1.5" />
        </svg>
      </div>

      <NavigationMobile
        logOut={logOut}
        navigationMobileRef={navigationMobileRef}
        defaultMenu={() =>
          defaultMenu({
            menuButton: headerMobileRef.current,
            menuContent: navigationMobileRef.current,
            active_: styles.active_,
            in_: styles.in_,
            out_: styles.out_,
          })
        }
      />
    </>
  );
};

HeaderMobile.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default HeaderMobile;
