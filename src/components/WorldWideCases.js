import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  cardContents: {
    background: "linear-gradient(to right, #ece9e6, #ffffff)",
    textAlign: "center"
  },
  textColor: {
    color: " #581845 "
  }
}));

const WorldWideCases = props => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();

  const [globalData, setGlobalData] = useState([]);
  useEffect(() => {
    let url = process.env.REACT_APP_PROD_API_URL;
    axios
      .get(`${url}all`, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        if (res.status === 200) {
          let globalDataArray = Object.entries(res.data);
          globalDataArray.splice(-1);
          setGlobalData(globalDataArray);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid item>
      <Card
        className={classes.cardContents}
        style={{ minWidth: "20em", minHeight: "20em" }}
      >
        <CardContent>
          <Typography
            className={classes.textColor}
            variant={matchesMD ? "h5" : "h3"}
          >
            Cases WorldWide
          </Typography>
          <hr />
          {globalData.length === 0 ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            globalData.map(([key, value]) => {
              return (
                <Typography key={key} variant={matchesMD ? "h6" : "h5"}>
                  <span style={{ fontSize: "1.5em", color: " #273746 " }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} :{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "1em",
                      fontWeight: "bold",
                      color: "#C70039"
                    }}
                  >
                    {value - 1}
                  </span>
                </Typography>
              );
            })
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WorldWideCases;
