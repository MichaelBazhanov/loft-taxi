export const styles = {
  nav: ["flex", "text-white", "space-x-7"].join(" "),
  button: ["hover:text-yellow-me", "text-xl"].join(" "),
  setActive: ({ isActive }) => (isActive ? "text-yellow-me" : ""),
};
