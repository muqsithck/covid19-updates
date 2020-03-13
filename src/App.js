import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mainHeading: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: "3em"
  },
  mainContainer: {
    width: "50em",
    height: "100%",
    marginTop: "2em",
    textAlign: "center"
  },
  card: {
    backgroundColor: "#EE094F",
    textTransform: "capitalize",
    color: "#eee",
    padding: "1em",
    margin: "2em"
  },
  caseData: {
    lineHeight: 2,
    fontKerning: "normal"
  },
  mainHead: {
    background: "#1f4037",
    background: " -webkit-linear-gradient(to right, #99f2c8, #1f4037)",
    background: "linear-gradient(to right, #99f2c8, #1f4037)",
    color: "#eee"
  }
}));

const App = () => {
  const classes = useStyles();
  const [allData, setAllData] = useState({});
  const [indiaData, setIndiaData] = useState([]);

  useEffect(() => {
    let url = "https://corona.lmao.ninja/all";
    axios
      .get(`https://cors-anywhere.herokuapp.com/${url}`, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        if (res.status === 200) {
          setAllData(res.data);
        }
      })
      .catch(err => console.log(err));
    let url2 = "https://corona.lmao.ninja/countries";
    axios
      .get(`https://cors-anywhere.herokuapp.com/${url2}`, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        console.log(res);
        let dataOfIndia = res.data.filter(d => d.country === "India");
        setIndiaData(dataOfIndia);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item className={classes.mainContainer}>
        <Card>
          <CardContent className={classes.mainHead}>
            <Typography variant="h2" className={classes.mainHeading}>
              Corona Virus Cases
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item className={classes.mainContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h3" className={classes.caseData}>
              Cases WorldWide
            </Typography>
            {Object.entries(allData).map(([key, value]) => (
              <Typography key={key} variant="h5" className={classes.caseData}>
                {key} : {value}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item className={classes.mainContainer}>
        <Card className={classes.card}>
          {indiaData.map((data, i) => {
            return (
              <CardContent key={i}>
                <Typography variant="h3" className={classes.caseData}>
                  Cases in India
                </Typography>
                <Typography variant="h5" className={classes.caseData}>
                  {"Total cases in India : " + data.cases}
                </Typography>
                <Typography variant="h5" className={classes.caseData}>
                  {"Critical : " + data.critical}
                </Typography>
                <Typography variant="h5" className={classes.caseData}>
                  {"Deaths : " + data.deaths}
                </Typography>
                <Typography variant="h5" className={classes.caseData}>
                  {"recovered : " + data.recovered}
                </Typography>
                <Typography variant="h5" className={classes.caseData}>
                  {"Today cases :  " + data.todayCases}
                </Typography>
                <Typography variant="h5" className={classes.caseData}>
                  {"Today death : " + data.todayDeaths}
                </Typography>
              </CardContent>
            );
          })}
        </Card>
      </Grid>
    </Grid>
  );
};

export default App;
