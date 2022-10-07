import React from "react";
import PropTypes from "prop-types";
import { Link, useMatch } from "react-router-dom";
import { styles } from "./styles";

const CustomLink = ({ to, text, defaultMenu, logOut }) => {
  const match = useMatch(to);

  return (
    <button
      onClick={() =>
        typeof logOut === "function" ? (logOut(), defaultMenu()) : defaultMenu()
      }
      type="button"
      className={styles.button({ match })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles["svg-size"]}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>

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
};

export default CustomLink;
