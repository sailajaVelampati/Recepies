import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  const { getByTestId } = render(<App />);
  const linkElement = getByTestId("App");
  expect(linkElement).toBeInTheDocument();
});
