export const styles = {
  container: ({ type }) =>
    [
      "min-w-[400px]",
      "relative0",
      "flex",
      "justify-between",
      "items-center",
      "text-white",
      "rounded-t-lg",
      `${type}`,
    ].join(" "),
  text: ["pl-5", "select-none"].join(" "),
  button: [
    "p-5",
    "text-white",
    "ml-5",
    "cursor-pointer",
    "hover:text-white",
    "transition-colors",
    "duration-500",
    "ease-in-out",
  ].join(" "),
  svg: ["h-5", "w-5", "stroke-current", "stroke-[3px]"].join(" "),
};