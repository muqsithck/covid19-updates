import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
  cardContents: {
    background: "linear-gradient(to right, #ece9e6, #ffffff)",
    textAlign: "center"
  },
  textColor: {
    color: " #581845"
  },
  autoContainer: {
    height: "4.6em",
    backgroundColor: "#eee",
    alignItems: "center",
    textAlign: "center"
  }
}));

const InputSearch = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const [countriesData, setCountries] = useState([]);

  useEffect(() => {
    let url = process.env.REACT_APP_PROD_API_URL;
    axios
      .get(`${url}countries`, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        if (res.status === 200) {
          setCountries([...res.data]);
        }
      })
      .then(err => console.log(err));
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
    <Grid item className={classes.autoContainer}>
      <Autocomplete
        id="corona-infected-countries-list"
        options={countriesData}
        getOptionLabel={countryData => countryData.country}
        style={{
          width: matchesMD ? "25em" : "30em",
          backgroundColor: "#fff",
          paddingTop: "0.5em",
          paddingBottom: "0"
        }}
        renderOption={countryData => (
          <Card className={classes.cardContents}>
            <CardContent>
              <Typography variant="h5">
                Country :{" "}
                <span
                  className={classes.textColor}
                  style={{ fontWeight: "bold" }}
                >
                  {countryData.country}
                </span>
              </Typography>
              <Typography variant="h5">
                Cases :{" "}
                <span
                  style={{
                    color: colors(countryData.cases),
                    fontWeight: "bold"
                  }}
                >
                  {countryData.cases}
                </span>
              </Typography>
              <Typography variant="h5">
                Critical :{" "}
                <span
                  style={{
                    color: colors(countryData.critical),
                    fontWeight: "bold"
                  }}
                >
                  {countryData.critical}
                </span>
              </Typography>
              <Typography variant="h5">
                Deaths :{" "}
                <span
                  style={{
                    color: colors(countryData.deaths),
                    fontWeight: "bold"
                  }}
                >
                  {countryData.deaths}
                </span>
              </Typography>
              <Typography variant="h5">
                Recovered :{" "}
                <span
                  style={{
                    color: colors(countryData.recovered),
                    fontWeight: "bold"
                  }}
                >
                  {countryData.recovered}
                </span>
              </Typography>
              <Typography variant="h5">
                Today's Cases :{" "}
                <span
                  style={{
                    color: colors(countryData.todayCases),
                    fontWeight: "bold"
                  }}
                >
                  {countryData.todayCases}
                </span>
              </Typography>
              <Typography variant="h5">
                Today's Death :{" "}
                <span
                  style={{
                    color: colors(countryData.todayDeaths),
                    fontWeight: "bold"
                  }}
                >
                  {countryData.todayDeaths}
                </span>
              </Typography>
              <br />
            </CardContent>
          </Card>
        )}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose the Country you wanna check"
            variant="outlined"
          />
        )}
      />
    </Grid>
  );
};

export default InputSearch;
