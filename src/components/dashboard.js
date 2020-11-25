import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Media from "./card";
import Alert from "@material-ui/lab/Alert";
import fetchData from "../API";
import {
  randomRecipeAPI,
  searchRecipeAPI,
  recipeNotFoundText,
} from "./API.mock";
const Dashboard = () => {
  const [searchInput, setSearchInput] = useState(null);
  const [receipeNotFound, setReceipeNotFound] = useState(false);

  useEffect(() => {
    fetchData(randomRecipeAPI, randomReceipe);
    // eslint-disable-next-line
  }, []);

  const randomReceipe = (result) => {
    result.meals.length ? setSearchInput(result.meals[0]) : notFound(true);
  };

  const searchData = (value) => {
    if (value) {
      setSearchInput(null);
      setReceipeNotFound(false);
      fetchData(searchRecipeAPI(value), searchRecepie);
    } else {
      setSearchInput(null);
    }
  };

  const notFound = (status) => {
    setReceipeNotFound(status);
    setSearchInput(null);
  };

  const searchRecepie = (result) => {
    result.meals ? setSearchInput(result.meals[0]) : notFound(true);
  };

  return (
    <div>
      <TextField
        data-testid="searchInput"
        id="standard-basic"
        label="Enter Recipe"
        onBlur={(event) => searchData(event.currentTarget.value)}
      />
      {receipeNotFound ? (
        <Alert data-testid="alert" severity="error">
          {recipeNotFoundText}
        </Alert>
      ) : null}
      {Boolean(searchInput) ? (
        <Media data-testid="mediaLoading" loading={false} data={searchInput} />
      ) : (
        <Media data-testid="Media" loading={true} data={{}} />
      )}
    </div>
  );
};

export default Dashboard;
