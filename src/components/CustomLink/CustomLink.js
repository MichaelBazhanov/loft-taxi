import React from "react";
import { Link, useMatch } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomLink = ({ to, text, defaultMenu, logOut }) => {
  const match = useMatch(to);

  return (
    <button
      onClick={() =>
        typeof logOut === "function" ? (logOut(), defaultMenu()) : defaultMenu()
      }
      type="button"
      className={classNames(
        match ? "text-yellow-me" : "",
        "hover:text-yellow-me text-3xl leading-loose flex items-center"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
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

      <Link
        to={to}
        className={classNames(match ? "text-yellow-me" : "", "ml-2")}
      >
        {text}
      </Link>
    </button>
  );
};

export default CustomLink;
