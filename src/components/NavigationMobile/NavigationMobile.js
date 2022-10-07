import CustomLink from "../CustomLink";

const NavigationMobile = ({
  logOut,
  navigationMobileRef,
  toggleMenuDefault,
}) => {
  return (
    <div
      className="bg-black absolute inset-0 z-10 transform -translate-x-full"
      id="toggle-menu-content"
      ref={navigationMobileRef}
    >
      <nav className="h-full flex flex-col justify-center items-center text-white select-none">
        <CustomLink
          to={"map"}
          text={"Карта"}
          toggleMenuDefault={toggleMenuDefault}
        />
        <CustomLink
          to={"profile"}
          text={"Профиль"}
          toggleMenuDefault={toggleMenuDefault}
        />
        <CustomLink
          to={"login"}
          text={"Выйти"}
          toggleMenuDefault={toggleMenuDefault}
          logOut={logOut}
        />
      </nav>
    </div>
  );
};

export default NavigationMobile;
