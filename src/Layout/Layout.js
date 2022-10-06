import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Notification from "../components/Notification";
import { connect } from "react-redux";
import { hideNotification } from "../modules/tooltips";

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
    <div className="App sans antialiased grid auto-cols-fr grid-rows-[auto_1fr] relative h-screen">
      {showedHeader && <Header />}

      <main>
        <section className="h-full bg-black-me">
          <Outlet />
        </section>
      </main>

      <div className="fixed top-full left-1/2 -translate-x-1/2">
        <div
          className={
            isTooltipShown
              ? "transition-transform duration-300 -translate-y-full"
              : "transition-transform duration-300"
          }
        >
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
    isTooltipShown: state.tooltipsReducer.isShown,
    tooltipText: state.tooltipsReducer.text,
    tooltipType: state.tooltipsReducer.type,
  }),
  { hideNotification }
)(Layout);
