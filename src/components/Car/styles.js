export const styles = {
  container: ({ flag }) =>
    ["w-1/3", , "cursor-pointer", flag ? "" : "opacity-50"].join(" "),
  car: ["flex", "flex-col", "shadow-me", "rounded-lg", "p-3"].join(" "),
  img: ["mx-auto", "mt-1", "object-cover", "object-center", "h-16"].join(" "),
  "price-name": ["text-xs"].join(" "),
  price: ["text-2xl"].join(" "),
};
