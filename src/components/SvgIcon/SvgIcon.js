import React from "react";
import PropTypes from "prop-types";
import { FiMapPin, FiLogOut } from "react-icons/fi";
import { ImProfile } from "react-icons/im";

const SvgIcon = ({ iconName, iconSize }) => {
  switch (iconName) {
    case "map":
      return <FiMapPin className={iconSize} />;
    case "profile":
      return <ImProfile className={iconSize} />;
    case "logout":
      return <FiLogOut className={iconSize} />;

    default:
      return null;
  }
};

SvgIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.string.isRequired,
};

export default SvgIcon;
