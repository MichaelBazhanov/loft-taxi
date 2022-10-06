export default {
  container: [
    "font-sans",
    "antialiased",
    "grid",
    "auto-cols-fr",
    "grid-rows-[auto_1fr]",
    "relative",
    "h-screen",
  ].join(" "),
  section: ["h-full", "bg-black-me"].join(" "),
  "container-notification": [
    "fixed",
    "top-full",
    "left-1/2",
    "-translate-x-1/2",
  ].join(" "),
  "tooltip-show": ({ isTooltipShown }) =>
    [
      "transition-transform",
      "duration-300",
      isTooltipShown ? "-translate-y-full" : "",
    ].join(" "),
};
