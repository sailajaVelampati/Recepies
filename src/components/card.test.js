import React from "react";
import Media from "./card";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { randomMockWithOutVideo, randomMockWithVideo } from "./API.mock";
//import "jest-dom/extent-expect";

describe("Receipe card", () => {
  it("rendered without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Media loading={true} data={{}} />, div);
  });
  it("renders loading image in card when loading is true and data is empty", () => {
    const { getByTestId } = render(<Media loading={true} data={{}} />);
    expect(getByTestId("avatarLoading")).toBeDefined();
    expect(getByTestId("titleLoading")).toBeDefined();
    expect(getByTestId("mediaLoading")).toBeDefined();
    expect(getByTestId("contentLoading")).toBeDefined();
  });
  it("renders recepie  image instead of video when loading is false and data is passed without video link", () => {
    const { getByTestId, container } = render(
      <Media loading={false} data={randomMockWithOutVideo} />
    );
    expect(container.querySelector("[data-testid=video]")).toBeNull();
    expect(getByTestId("image")).toBeDefined();
  });
});
