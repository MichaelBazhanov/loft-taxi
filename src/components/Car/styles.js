export const styles = {
  container: ({ flag }) =>
    ["w-1/3", , "cursor-pointer", flag ? "" : "opacity-50"].join(" "),
  car: ({ flag }) =>
    [
      "flex",
      "flex-col",
      "shadow-me",
      "rounded-lg",
      "p-3",
      flag ? "shadow shadow-yellow-me" : "",
    ].join(" "),
  "price-name": ["text-xs"].join(" "),
  price: ["text-2xl", "whitespace-nowrap"].join(" "),
  img: [
    "mx-auto",
    "mt-1",
    "object-cover",
    "object-center",
    "h-16",
    "shrink-0",
  ].join(" "),
};
