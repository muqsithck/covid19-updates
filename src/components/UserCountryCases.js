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
const UserCountryCases = props => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const [countryData, setCountryData] = useState([]);
  const [countryIn, setCountryIn] = useState("");

  useEffect(() => {
    const fetchUserLocationData = async () => {
      let url = process.env.REACT_APP_PROD_API_URL;
      let countryUrl = process.env.REACT_APP_PROD_API_URL_USER_COUNTRY;
      let key = process.env.REACT_APP_SECRET_KEY;
      const responseFromUserLocationData = await axios(`${countryUrl}${key}`);
      setCountryIn(responseFromUserLocationData.data.country_name);

      if (countryIn.length > 2) {
        const responseFromCorona = await axios(`${url}countries`);
        const userLocationResult = responseFromCorona.data.map(data => data);
        setCountryData(
          userLocationResult.filter(data => data.country === countryIn)
        );
        if (countryIn.includes("United States")) {
          setCountryData(
            userLocationResult.filter(data => data.country === "USA")
          );
        }
      }
    };
    fetchUserLocationData();
  }, [countryIn]);

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
      <Card
        className={classes.cardContents}
        style={{ minWidth: "20em", minHeight: "20em" }}
      >
        <CardContent>
          <Typography
            className={classes.textColor}
            variant={matchesMD ? "h5" : "h3"}
          >
            Cases in {countryIn}
          </Typography>
          <hr />
          {!countryData || countryData.length === 0 ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            countryData.map((data, i) => {
              return (
                <div key={i}>
                  <Typography variant={matchesMD ? "h6" : "h5"}>
                    Cases :{" "}
                    <span
                      style={{ color: colors(data.cases), fontWeight: "bold" }}
                    >
                      {data.cases}
                    </span>
                  </Typography>
                  <Typography variant={matchesMD ? "h6" : "h5"}>
                    Critical :{" "}
                    <span
                      style={{
                        color: colors(data.critical),
                        fontWeight: "bold"
                      }}
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
            })
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserCountryCases;
