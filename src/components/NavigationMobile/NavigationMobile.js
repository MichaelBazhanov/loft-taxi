import PropTypes from "prop-types";
import CustomLink from "../CustomLink";

const NavigationMobile = ({ logOut, navigationMobileRef, defaultMenu }) => {
  console.log(logOut);
  console.log(navigationMobileRef);
  console.log(defaultMenu);
  return (
    <div
      className="bg-black absolute inset-0 z-10 transform -translate-x-full"
      ref={navigationMobileRef}
    >
      <nav className="h-full flex flex-col justify-center items-center text-white select-none">
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
