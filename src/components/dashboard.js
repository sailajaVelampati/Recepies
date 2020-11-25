import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Media from "./card";
import Alert from "@material-ui/lab/Alert";
import fetchData from "../API";
const Dashboard = () => {
  const [searchInput, setSearchInput] = useState(null);
  const [receipeNotFound, setReceipeNotFound] = useState(false);

  useEffect(() => {
    fetchData(
      `https://www.themealdb.com/api/json/v1/1/random.php`,
      randomReceipe
    );
  }, []);

  const randomReceipe = (result) => {
    result.meals.length ? setSearchInput(result.meals[0]) : notFound(true);
  };

  const searchData = (value) => {
    console.log(value);
    if (value) {
      setSearchInput(null);
      setReceipeNotFound(false);
      fetchData(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
        searchRecepie
      );
    } else {
      setSearchInput(null);
    }
  };

  const notFound = (status) => {
    setReceipeNotFound(status);
    setSearchInput(null);
  };

  const searchRecepie = (result) => {
    console.log(result);
    result.meals ? setSearchInput(result.meals[0]) : notFound(true);
  };

  return (
    <div>
      <TextField
        data-testid="searchInput"
        id="standard-basic"
        label="Search"
        onBlur={(event) => searchData(event.currentTarget.value)}
      />
      {receipeNotFound ? (
        <Alert data-testid="alert" severity="error">
          Receipe not found!
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
