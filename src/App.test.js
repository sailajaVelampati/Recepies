import React from "react";
import { render, act } from "@testing-library/react";
import App from "./App";
import {
  randomMockWithOutVideo,
  randomMockWithVideo,
} from "./components/API.mock";
import ReactDOM from "react-dom";
describe("Application ", () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
    global.fetch.mockRestore();
  });
  test("renders App", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [randomMockWithVideo] }),
    });
    await act(async () => {
      render(<App />, container);
    });
    expect(container).toBeDefined();
  });
});
