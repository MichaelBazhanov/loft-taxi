import NavigationMobile from "../NavigationMobile";

const HeaderMobile = ({ logOut }) => {
  const toggleMenu = (e) => {
    const parent = e.target.closest("#toggle-menu");

    if (parent) {
      parent.classList.toggle("active-toggle-menu");

      const menuContent = document.querySelector("#toggle-menu-content");

      if (menuContent.classList.contains("animate-menu-in")) {
        menuContent.classList.remove("animate-menu-in"); //убираем класс
        menuContent.classList.add("animate-menu-out"); //добавляем класс
      } else {
        menuContent.classList.add("animate-menu-in"); //добавляем класс
        menuContent.classList.remove("animate-menu-out"); //убираем класс
      }
    }
  };

  return (
    <header>
      <div
        className="bg-transparent py-5 px-8 pl-3 fixed z-20 cursor-pointer"
        id="toggle-menu"
        onClick={toggleMenu}
      >
        <div className="text-black-me">
          <svg
            width="25"
            height="17"
            viewBox="0 0 25 17"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer fill-current"
          >
            <rect width="25" height="3" rx="1.5" />
            <rect y="7" width="17" height="3" rx="1.5" />
            <rect y="14" width="25" height="3" rx="1.5" />
          </svg>
        </div>
      </div>

      <NavigationMobile logOut={logOut} />
    </header>
  );
};

export default HeaderMobile;
