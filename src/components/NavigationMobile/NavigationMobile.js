import CustomLink from "../CustomLink";

const NavigationMobile = ({ logOut }) => {
  const toggleMenuDefault = () => {
    const menuContent = document.querySelector("#toggle-menu-content");
    menuContent.classList.remove("animate-menu-in"); //убираем класс
    menuContent.classList.remove("animate-menu-out"); //убираем класс

    const menu = document.querySelector("#toggle-menu");
    menu.classList.remove("active-toggle-menu"); //убираем класс
  };

  return (
    <div
      className="bg-black absolute inset-0 z-10 transform -translate-x-full"
      id="toggle-menu-content"
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
