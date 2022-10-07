import { NavLink } from "react-router-dom";
const setActive = ({ isActive }) => (isActive ? "text-yellow-me" : "");

const HeaderDesktop = ({ logOut }) => {
  return (
    <nav className="flex text-white space-x-7">
      <button type="button" className="hover:text-yellow-me text-xl">
        <NavLink to={"map"} className={setActive}>
          Карта
        </NavLink>
      </button>

      <button type="button" className="hover:text-yellow-me text-xl">
        <NavLink to={"profile"} className={setActive}>
          Профиль
        </NavLink>
      </button>

      <button
        onClick={() => {
          logOut();
        }}
        type="button"
        className="hover:text-yellow-me text-xl"
      >
        <NavLink to={"login"} className={setActive}>
          Выйти
        </NavLink>
      </button>
    </nav>
  );
};

export default HeaderDesktop;
