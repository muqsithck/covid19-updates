import React, { useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import axios from "axios";
import "./index.css";

export default function App() {
     
  const [coronaData, setCoronaData ] = useState([])

  useEffect(
    () => {       
    axios.get("https://corona.lmao.ninja/countries").then(
      res => {
        // console.log(res)
        setCoronaData([...res.data])
      }
    )
    }, []
  )
    
  console.log("data", coronaData[0])

  return (
    <Container maxWidth="lg" style={{ padding: "50px" }}>
      <Grid container>
        <Grid item md={4}>
          <h1 className="heading">COVID19 </h1>
          <h1 className="heading-main"> UPDATE </h1>
        </Grid>
        <Grid item md={8}></Grid>

        <Grid item md={12}>
          <Grid container>
          <Grid item md={4} className="flex-start">
          <p className="item-count-heading">Country</p>
          </Grid>

          <Grid item md={2} className="flex-start">
          <p className="item-count-heading">Cases</p>
          </Grid>

          <Grid item md={2} className="flex-start">
          <p className="item-count-heading"
        
          >Recovered</p>
          </Grid>

          <Grid item md={2} className="flex-start">
          <p className="item-count-heading">Recovery Rate</p>
          </Grid>
        
          <Grid item md={2} className="flex-start">
          <p className="item-count-heading">Death Rate</p>
          </Grid>

          </Grid>
        </Grid>


        { 
         
         coronaData.length > 0 ?

      coronaData.map( (item) =>  
      {
          let recoveredRate = Math.round(100 *  item.recovered / item.cases)
          let deathsRate =  Math.round(100 *  item.deaths / item.cases)

        return(

        <Grid item md={12}>
          <Grid container>
          <Grid item md={4} className="flex-start">
            <img src="https://restcountries.eu/data/ind.svg" width="50px"  alt="flag" style={{margin:"3px", marginRight:"20px"}}/>
            <p className="item-count-text">{item.country}</p>
          </Grid>
          <Grid item md={2} className="flex-start">
        <div className="item-count"> <p className="item-count-text">{item.cases}</p> </div>
          </Grid>
          <Grid item md={2} className="flex-start">
        <div className="item-count"> <p className="item-count-text">{item.recovered}</p> </div>
          </Grid>
          <Grid item md={2} className="flex-start">
           <div className="item-count"
             style={{backgroundColor:"#27ae60"}}
           > <p className="item-count-text">{recoveredRate} %</p> </div>
          </Grid>
          <Grid item md={2} className="flex-start">
           <div className="item-count"
           style={{backgroundColor:"#e74c3c"}}
        > <p className="item-count-text">{deathsRate} %</p> </div>
          </Grid>
          </Grid>
        </Grid>

      )
      }
      )

         :

         <p>loading</p>
        
        }

        <div className="app-container"></div>
      </Grid>
    </Container>
  );
}
