import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  cardContents: {
    background: "linear-gradient(to right, #ece9e6, #ffffff)",
    textAlign: "center"
  },
  textColor: {
    color: " #581845"
  }
}));
const IndianCases = props => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const [indianData, setIndianData] = useState([]);

  useEffect(() => {
    let url = "https://corona.lmao.ninja/countries";
    axios
      .get(`https://cors-anywhere.herokuapp.com/${url}`, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        let dataOfIndia = res.data.filter(d => d.country === "India");
        setIndianData(dataOfIndia);
      })
      .catch(err => console.log(err));
  }, []);

  function colors(data) {
    // eslint-disable-next-line no-unused-vars
    let subjectColor = "";
    if (data <= 30) {
      return (subjectColor = "#58d68d");
    } else if (data > 30 && data < 80) {
      return (subjectColor = "#FFC300");
    } else if (data > 80 && data < 130) {
      return (subjectColor = "#FF5733");
    } else {
      return (subjectColor = "#C70039");
    }
  }
  return (
    <Grid item>
      <Card>
        <CardContent className={classes.cardContents}>
          <Typography
            className={classes.textColor}
            variant={matchesMD ? "h5" : "h3"}
          >
            Cases in India
          </Typography>
          <hr />
          {indianData.map((data, i) => {
            return (
              <div key={i}>
                <Typography variant={matchesMD ? "h6" : "h5"}>
                  Total cases in India :{" "}
                  <span
                    style={{ color: colors(data.cases), fontWeight: "bold" }}
                  >
                    {data.cases}
                  </span>
                </Typography>
                <Typography variant={matchesMD ? "h6" : "h5"}>
                  Critical :{" "}
                  <span
                    style={{ color: colors(data.critical), fontWeight: "bold" }}
                  >
                    {data.critical}
                  </span>
                </Typography>
                <Typography variant={matchesMD ? "h6" : "h5"}>
                  Deaths :{" "}
                  <span
                    style={{ color: colors(data.deaths), fontWeight: "bold" }}
                  >
                    {data.deaths}
                  </span>
                </Typography>
                <Typography variant={matchesMD ? "h6" : "h5"}>
                  Recovered :{" "}
                  <span
                    style={{
                      color: colors(data.recovered),
                      fontWeight: "bold"
                    }}
                  >
                    {data.recovered}
                  </span>
                </Typography>
                <Typography variant={matchesMD ? "h6" : "h5"}>
                  Today's Cases :{" "}
                  <span
                    style={{
                      color: colors(data.todayCases),
                      fontWeight: "bold"
                    }}
                  >
                    {data.todayCases}
                  </span>
                </Typography>
                <Typography variant={matchesMD ? "h6" : "h5"}>
                  Today's Deaths :{" "}
                  <span
                    style={{
                      color: colors(data.todayDeaths),
                      fontWeight: "bold"
                    }}
                  >
                    {data.todayDeaths}
                  </span>
                </Typography>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default IndianCases;
