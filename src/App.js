import React, { useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import axios from "axios";
import "./index.css";
import countryCode from "./code";

export default function App() {
  const [coronaData, setCoronaData] = useState([]);
  const [search, setSearch] = useState("");

  const handleChnage = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios.get("https://corona.lmao.ninja/countries").then(res => {
      setCoronaData([...res.data]);
    });
  }, []);

  let countryList = coronaData

  if (search.length > 0) {
    let searchResult = coronaData.filter(item =>
      item.country.toLowerCase().includes(search.toLowerCase())
    );
    countryList = searchResult;
  } else {
    countryList = coronaData;
  }



  return (
    <Container maxWidth="lg" className="app-container"  style={{ padding: "50px" }}>
      <Grid container>
        <Grid item md={4}>
          <h1 className="heading">COVID19 </h1>
          <h1 className="heading-main"> UPDATES </h1>
        </Grid>
        <Grid item md={8}></Grid>

        <Grid item md={12}>
          <input
            className="input-box"
            placeholder="Search Country...."
            onChange={handleChnage}
          />
        </Grid>

        <Grid item md={12} xs={12} className="heading-wrapper" >
          <Grid container>
            <Grid item xs={12} md={4} className="flex-start heading-wrapper">
              <p className="item-count-heading">Country</p>
            </Grid>

            <Grid item md={2} xs={3} className="flex-start"
           
            >
              <p className="item-count-heading">Cases</p>
            </Grid>

            <Grid item md={2} xs={3} className="flex-start">
              <p className="item-count-heading">Recovered</p>
            </Grid>

            <Grid item md={2} xs={3} className="flex-start">
              <p className="item-count-heading">Recovery Rate</p>
            </Grid>

            <Grid item md={2} xs={3} className="flex-start">
              <p className="item-count-heading">Death Rate</p>
            </Grid>
          </Grid>
        </Grid>




        {countryList.length > 0 ? (
          countryList.map(item => {
            let recoveredRate =  (Math.round((100 * item.recovered) / item.cases * 100) / 100).toFixed(2)
            let deathsRate = (Math.round((100 * item.deaths) / item.cases * 100) / 100).toFixed(2)
          
            
            


            const nationCode = countryCode.find(name => {
              return name.Name === item.country;
            });

            let image = `https://www.countryflags.io/${
              nationCode ? nationCode.Code : null
            }/shiny/64.png`;
            

            return (
              <Grid item md={12}>
                <Grid container>
                  <Grid item xs={12} md={4} className="flex-start">
                    <img
                      src={image}
                      width="50px"
                      alt="flag"
                      style={{ margin: "3px", marginRight: "20px" }}
                    />
                    <p className="item-count-text">{item.country}</p>
                  </Grid>
                  <Grid item xs={3} md={2} className="flex-start">
                    <div className="item-count">
                      <div>
                      <p className="item-count-heading text-hide">Cases</p>
                      <p className="item-count-text">{item.cases}</p>
                    </div>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={2} className="flex-start">
                    <div className="item-count">
                    <div>
                      <p className="item-count-heading text-hide">Recovered</p>
                      <p className="item-count-text">{item.recovered}</p>{" "}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={2} className="flex-start">
                    <div
                      className="item-count"
                      style={{ backgroundColor: "#27ae60" }}
                    >
                       <div>
                      <p className="item-count-heading text-hide">Recovery</p>
                      <p className="item-count-text">{recoveredRate} %</p>{" "}
                    </div>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={2} className="flex-start">
                    <div
                      className="item-count"
                      style={{ backgroundColor: "#e74c3c" }}
                    >
                      <div>
                      <p className="item-count-heading text-hide">Death</p>
                      <p className="item-count-text">{deathsRate} %</p>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <p>loading</p>
        )}

        <div className="app-wrapper"></div>
      </Grid>
    </Container>
  );
}
