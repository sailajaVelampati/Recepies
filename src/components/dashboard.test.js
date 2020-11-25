import React from "react";
import Dashboard from "./dashboard";
import ReactDOM from "react-dom";
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import {
  randomMockWithVideo,
  recipeNotFoundText,
  randomRecipeAPI,
} from "./API.mock";
global.fetch = jest.fn();
let container;

describe("Card ", () => {
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
  });
  test("Should renders data when API request is called with meals data", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [randomMockWithVideo] }),
    });
    await act(async () => {
      render(<Dashboard />, container);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(randomRecipeAPI);

    expect(document.querySelector("[data-testid=title]").innerHTML).toBe(
      randomMockWithVideo.strMeal
    );
    global.fetch.mockRestore();
  });
  //negative test case
  test("Should renders data when API request is called with zero meals data", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [] }),
    });
    await act(async () => {
      render(<Dashboard />, container);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(randomRecipeAPI);
    expect(document.querySelector("[data-testid=alert]").textContent).toBe(
      recipeNotFoundText
    );
    global.fetch.mockRestore();
  });

  test("Should renders data when user makes a valid text to search field", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: randomMockWithVideo }),
    });
    await act(async () => {
      render(<Dashboard />, container);
    });

    const searchField = document
      .querySelector("[data-testid=searchInput]")
      .querySelector("input");

    await act(async () => {
      fireEvent.change(searchField, { target: { value: "Bread" } });
      fireEvent.blur(searchField);
    });

    // console.log(document.querySelector("[data-testid=title]"));

    // expect(document.querySelector("[data-testid=title]").innerHTML).toBe(
    //   randomMockWithVideo.strMeal
    // );
    global.fetch.mockRestore();
  });
  //negative test case for invalid search input
  test("Should alert when user makes a invalid text to search field", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [] }),
    });
    await act(async () => {
      render(<Dashboard />, container);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(randomRecipeAPI);
    const searchField = document
      .querySelector("[data-testid=searchInput]")
      .querySelector("input");

    await act(async () => {
      fireEvent.change(searchField, { target: { value: "" } });
      fireEvent.blur(searchField);
    });

    expect(document.querySelector("[data-testid=alert]").textContent).toBe(
      recipeNotFoundText
    );
    global.fetch.mockRestore();
  });
  // negative test case for API error
  test("Should log error when Service is rejected", async () => {
    const error = new Error("Async error");
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockRejectedValueOnce(error),
    });
    console.log = jest.fn();
    await act(async () => {
      render(<Dashboard />, container);
    });
    expect(console.log).toHaveBeenCalledWith(error);
    global.fetch.mockRestore();
  });
});
