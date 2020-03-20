import React, {useEffect, useState} from 'react'
import {Grid} from '@material-ui/core'
import axios from 'axios'






export default function AllNations() {

  const [countriesData, setCountries] = useState([]);
 
  useEffect(() => {
    let url = process.env.REACT_APP_PROD_API_URL;
    axios
      .get(`${url}countries`, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
          setCountries([...res.data]);
      })
      .catch(err => console.log(err));

  }, []);

 console.log("DATA",countriesData)


    return (
        <Grid container>
            
               


        </Grid>
    )
}
