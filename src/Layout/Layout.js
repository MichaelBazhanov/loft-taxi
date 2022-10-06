import React from "react";
import { connect } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Notification from "../components/Notification";
import { hideNotification } from "../modules/tooltips";
import PropTypes from "prop-types";
import { styles } from "./styles";

import {
  getTooltipsIsShow,
  getTooltipsText,
  getTooltipsType,
} from "./selectors";


const Layout = ({
  isTooltipShown,
  tooltipText,
  tooltipType,
  hideNotification,
}) => {
  const location = useLocation();
  const showedHeader =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/registration";

  return (
    <div className={styles.container}>
      {showedHeader && <Header />}

      <main>
        <section className={styles.section}>
          <Outlet />
        </section>
      </main>

      <div className={styles["container-notification"]}>
        <div className={styles["tooltip-show"]({ isTooltipShown })}>
          <Notification
            text={tooltipText}
            type={tooltipType}
            onClick={() => hideNotification()}
          />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  hideNotification: PropTypes.func,
  isTooltipShown: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipType: PropTypes.string,
};

export default connect(
  (state) => ({
    isTooltipShown: getTooltipsIsShow(state),
    tooltipText: getTooltipsText(state),
    tooltipType: getTooltipsType(state),
  }),
  { hideNotification }
)(Layout);
