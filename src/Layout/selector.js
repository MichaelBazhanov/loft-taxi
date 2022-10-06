import { createSelector } from "reselect";

export const getTooltipsIsShow = createSelector(
  [(state) => state.tooltipsReducer.isShown],
  (isShown) => isShown
);
export const getTooltipsText = createSelector(
  [(state) => state.tooltipsReducer.text],
  (text) => text
);
export const getTooltipsType = createSelector(
  [(state) => state.tooltipsReducer.type],
  (type) => type
);
