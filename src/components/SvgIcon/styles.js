export const styles = {
  "svg-size": ["h-8", "w-8"].join(" "),
  button: ({ match }) =>
    [
      "text-3xl",
      "hover:text-yellow-me",
      "leading-loose",
      "flex",
      "items-center",
      match ? "text-yellow-me" : "",
    ].join(" "),
  link: ({ match }) => ["ml-2", match ? "text-yellow-me" : ""].join(" "),
};
