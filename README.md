# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test -- --coverage`

Displays the unit test coverage in each file.

## Application Flow

# case 1

Application Loads with a loading card along with search input box

> Application make an API call to get the random receipe.
> On success it display recepie image, title, youtube video/ image, ingerdients details and Instructions.

# case 2

User can type available receipe name.

> OnBlur of the input field an API call is made to fetch the recipe, Mean while loading card is displayed.
> On success it display recepie image, title, youtube video/ image, ingerdients details and Instructions.

# case 3

User can type unavailable receipe name.

> Onblur of input field an API call is made which fetches empty data.
> An alert with error message "Receipe not found!"
