import React from "react";
import Dashboard from "./dashboard";
import ReactDOM from "react-dom";
import { render, screen, act } from "@testing-library/react";
import { randomMockWithOutVideo, randomMockWithVideo } from "./API.mock";
import fetchData from "../API";

//import "jest-dom/extent-expect";
describe("App ", () => {
  it("renders search input and media", () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId("searchInput")).toBeDefined();
    expect(getByTestId("mediaLoading")).toBeDefined();
  });
});
