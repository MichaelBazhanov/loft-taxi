import React from "react";
import TestRenderer from "react-test-renderer";

import Car from "../components/Car";

it("Renders correctly", () => {
  const CarExample = TestRenderer.create(<Car />).toJSON();

  expect(CarExample).toMatchSnapshot();
});
