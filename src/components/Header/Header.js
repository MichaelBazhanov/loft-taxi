import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logOut } from "../../modules/authorization"; //просто импортируем action
import PropTypes from "prop-types";

import HeaderDesktop from "../HeaderDesktop";
import HeaderMobile from "../HeaderMobile";

const Header = ({ logOut }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <header>
      {width >= 640 && <HeaderDesktop logOut={logOut} />}
      {width < 640 && <HeaderMobile logOut={logOut} />}
    </header>
  );
};
Header.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default connect(null, { logOut })(Header);
