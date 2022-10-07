import React from "react";
import PropTypes from "prop-types";
import { Link, useMatch } from "react-router-dom";
import { styles } from "./styles";
import SvgIcon from "../SvgIcon";

const CustomLink = ({ to, text, defaultMenu, logOut, iconName, iconSize }) => {
  const match = useMatch(to);

  return (
    <button
      onClick={() =>
        typeof logOut === "function" ? (logOut(), defaultMenu()) : defaultMenu()
      }
      type="button"
      className={styles.button({ match })}
    >
      <SvgIcon iconName={iconName} iconSize={iconSize} />

      <Link to={to} className={styles.link({ match })}>
        {text}
      </Link>
    </button>
  );
};

CustomLink.propTypes = {
  logOut: PropTypes.func,
  defaultMenu: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.string.isRequired,
};

export default CustomLink;
