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
  }
}));

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("https://corona.lmao.ninja/all")
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item className={classes.mainContainer}>
        <Card>
          <CardContent>
            <Typography variant="h2" className={classes.mainHeading}>
              Corona Virus Cases
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item className={classes.mainContainer}>
        <Card className={classes.card}>
          <CardContent>
            {Object.entries(data).map(([key, value]) => (
              <Typography key={key} variant="h5" className={classes.caseData}>
                {"Confirmed " + key} : {value}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default App;
