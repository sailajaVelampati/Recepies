import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactPlayer from "react-player";
const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  media: {
    height: 390,
  },
}));
const ingrediaent = (data) => {
  let IngeredientsList = [];
  let x = 1;
  labelCancelLoops: while (true) {
    x++;
    if (!data[`strIngredient${x}`]) {
      break labelCancelLoops;
    }
    IngeredientsList.push(
      `${data[`strIngredient${x}`]}: ${data[`strMeasure${x}`]}`
    );
  }
  return IngeredientsList;
};
function Media(props) {
  const { loading, data } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card} data-testid="card">
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              data-testid="avatarLoading"
              animation="wave"
              variant="circle"
              width={60}
              height={60}
            />
          ) : (
            <Avatar
              data-testid="avatar"
              alt={data.strMeal}
              src={data.strMealThumb}
            />
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
              data-testid="titleLoading"
            />
          ) : (
            <Typography
              data-testid="title"
              variant="h5"
              display="block"
              gutterBottom
              align="left"
            >
              {data.strMeal}
            </Typography>
          )
        }
      />
      {loading ? (
        <Skeleton
          animation="wave"
          data-testid="mediaLoading"
          variant="rect"
          className={classes.media}
        />
      ) : data.strYoutube ? (
        <ReactPlayer
          data-testid="video"
          url={data.strYoutube}
          controls
          width="100%"
        />
      ) : (
        <CardMedia
          data-testid="image"
          className={classes.media}
          image={data.strMealThumb}
          title="Ted talk"
        />
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              data-testid="contentLoading"
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <div data-testid="content">
            <Typography variant="h6" display="block" gutterBottom align="left">
              Ingredients
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {ingrediaent(data).map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </Typography>
            <Typography variant="h6" display="block" gutterBottom align="left">
              Instructions
            </Typography>
            <Typography variant="body1" gutterBottom align="justify">
              {data.strInstructions}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
};

export default Media;
