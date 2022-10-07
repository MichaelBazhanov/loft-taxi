import logoTaxi from "../../assets/images/logo-taxi.svg";
import NavigationDesktop from "../NavigationDesktop";

const HeaderDesktop = ({ logOut }) => {
  return (
    <header className="bg-black-me">
      <div className="container mx-auto py-5 px-8">
        <div className="flex justify-between items-center">
          <img src={logoTaxi} className="logo-taxi" alt="logo" />

          <NavigationDesktop logOut={logOut} />
        </div>
      </div>
    </header>
  );
};

export default HeaderDesktop;
