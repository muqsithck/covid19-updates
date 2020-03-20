import React from "react";
import Grid from "@material-ui/core/Grid";


import InputSearch from "./components/allNations";
import WorldWideCases from "./components/WorldWideCases";
import UserCountryCases from "./components/UserCountryCases";

const App = () => {
  return (
    <Grid container>
      <Grid item md={12}>
        Corona Virus Cases
      </Grid>

      <Grid item md={12}>
        <Grid container>
          <Grid item md={4}>
            <InputSearch />
          </Grid>

          <Grid item md={8}>
            <WorldWideCases />
            <UserCountryCases />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
