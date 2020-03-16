import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import Input from "@material-ui/core/Input";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  cardContents: {
    background: "linear-gradient(to right, #ece9e6, #ffffff)",
    textAlign: "center"
  },
  textColor: {
    color: " #581845"
  }
}));

const InputSearch = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const [countryName, setCountryName] = useState("");
  const [countriesData, setCountries] = useState([]);

  const handleChange = e => {
    let value = e.target.value;
    const userSearchResult = value.charAt(0).toUpperCase() + value.slice(1);
    setCountryName(userSearchResult);
  };
  useEffect(() => {
    let url = "https://corona.lmao.ninja/countries";
    axios
      .get(`https://cors-anywhere.herokuapp.com/${url}`, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        if (res.status === 200) {
          let searchResult = res.data.filter(
            countryCoronaResult => countryCoronaResult.country === countryName
          );
          setCountries([...searchResult]);
        }
      })
      .then(err => console.log(err));
  }, [countryName]);

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
    <>
      <Card>
        <CardContent className={classes.cardContents}>
          <Input
            type="text"
            color="secondary"
            onChange={e => handleChange(e)}
            placeholder="Search Country wise"
            style={{
              width: matchesMD ? "20em" : "30em",
              height: matchesMD ? "2em" : "3em",
              textAlign: "center",
              fontSize: matchesMD ? "1em" : "1.5em",
              fontWeight: "bold"
            }}
            className={classes.textColor}
          />
        </CardContent>
      </Card>
      <Grid item>
        {countriesData.length > 0 && (
          <Card>
            <CardContent className={classes.cardContents}>
              {countriesData.map((countryData, i) => {
                return (
                  <div key={i}>
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
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </Grid>
    </>
  );
};

export default InputSearch;
