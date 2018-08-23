import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography, withStyles } from "@material-ui/core";

const styles = () => ({
  imageContainer: { padding: "15px", marginTop: "50px" },
  buttonContainer: { padding: "20px" }
});

class App extends Component {
  state = {
    doggo: null
  };

  getDoggoViaPromise = () => {
    return new Promise((resolve, reject) => {
      fetch("https://dog.ceo/api/breeds/image/random")
        .then(result => result.json())
        .then(doggo => {
          // this is the advantae of ES6 Promises
          // better handling of callback functions
          if (doggo.status === "success") {
            resolve(doggo);
          } else {
            reject(doggo);
          }
        })
        // this handles all uncatched errors if we ever miss out on one
        .catch(() => alert("uh ohh.."));
    });
  };

  handleClick = () => {
    // change state to loading for better User Experience
    this.setState(prevState => ({
      ...prevState,
      doggo: "loading"
    }));

    // initialize our ES6 Promise when button is clicked
    this.getDoggoViaPromise().then(
      // this is the first argument, our resolve callback function
      dogImg =>
        this.setState(prevState => ({
          ...prevState,
          doggo: dogImg.message
        })),
      // this is the second argument, our reject callback function
      () => alert("CANT GET DOGGO THRU :-(")
    );
  };

  render() {
    const { doggo } = this.state;
    const { classes } = this.props;

    // here is where we render our app
    // for tutorial purposes I cramped everything here
    // for best practices we should always separate our presentational components and container components
    return (
      <Grid container justify="center" direction="column" alignItems="center">
        <Grid xs item className={classes.imageContainer}>
          {doggo === null ? (
            <Typography> NO DOGGO YET :-( </Typography>
          ) : doggo === "loading" ? (
            <Typography> LOADING YOUR DOGGO :-)</Typography>
          ) : (
            <img alt="doggo" src={doggo} />
          )}
        </Grid>
        <Grid xs item className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            {doggo === null ? "GET ME A DOGGO!" : "GET ME A NEW DOGGO PLS"}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
