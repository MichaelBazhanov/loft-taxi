import React from "react";
import TestRenderer from "react-test-renderer";

import Car from "../components/Car";

it("Renders correctly", () => {
  const CarForFormExample = TestRenderer.create(<Car />).toJSON();

  expect(CarForFormExample).toMatchSnapshot();
});
