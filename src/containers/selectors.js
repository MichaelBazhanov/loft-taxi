import { createSelector } from "reselect";

export const getIsLoggedIn = createSelector(
  [(state) => state.authorizationReducer.isLoggedIn],
  (isLoggedIn) => isLoggedIn
);
