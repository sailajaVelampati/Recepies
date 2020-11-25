import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "block",
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    <div data-testid="mainApp" className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Best Recipes in Town
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Dashboard />
    </div>
  );
};

export default App;
