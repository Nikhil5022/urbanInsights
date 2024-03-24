import React, { useState, useContext, useCallback } from "react";
import wayPointsContext from "../context/wayPointsContext";
import styled from "styled-components";
import { Autocomplete, Box, Chip, Grid, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import ShortestRoute from "./ShortestRoute";
import shortestPathContext from "../context/shortestPathContext";


const StyeledAutocomplete=styled(Autocomplete)`
.css-1uhj2ym-MuiInputBase-root-MuiOutlinedInput-root
{
max-height: 200px;
overflow: auto;
border: 0px;
border: 1px solid #333333;
}
.css-1d3z3hw-MuiOutlinedInput-notchedOutline
{
  border: 0px;
}
`

const LocationSearch = () => {
  const [results, setResults] = useState([]);
  const [selectedLocation,setSelectedLocation]=useState([])
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=useState(false)
  const { waypoints, addWayPoint, deleteWayPoint } =useContext(wayPointsContext);
  const { shortestPath, setShortestPath } = useContext(shortestPathContext);
  

  
  const delWayPoints = (option) => {
    const deleted=selectedLocation.filter((loc)=>loc.formatted!==option.formatted)
    setSelectedLocation(deleted)
    deleteWayPoint([option]);
  };


  const onSearch = async (query) => {
    console.log(query);
    if (query.trim() === "") {
      return;
    }
    const apiKey = "5d94847184414a7dbb25ec73adb023b7"; // Replace with your OpenCage Data API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      query
    )}&key=${apiKey}`;
    setLoading(true);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setOpen(true)
          setResults((prev)=>[...data.results,...prev]);
        }
      })
      .catch((error) => {
        console.log("Error searching for locations:", error);
      });
    setLoading(false);
  };

  const onSearchDebounce = useCallback(debounce(onSearch, 1500), []);

  const onSelctedLocation=(option)=>
  {
    const add=selectedLocation?.filter((loc)=>loc?.formatted===option?.formatted)
    if(add.length===0)
    {
      addWayPoint([
        [
          option.formatted,
          option.geometry.lat,
          option.geometry.lng,
        ],
      ]);
      setSelectedLocation((prev)=>[...prev,option])
    }
    else 
    {
      delWayPoints(option)
    }
  }


  return (
    <>
      <div
        className="container-fluid d-flex flex-column"
        style={{ padding: "16px" }}
      >
        <div className="container-fluid d-flex justify-content-center">
              <StyeledAutocomplete
                value={selectedLocation}
                key={results}
                className="form-control bg-opacity-0"
                multiple
                id="multiple-limit-tags"
                options={results}
                getOptionLabel={(option) => option.label}
                popupIcon={<ArrowDropDownCircleOutlined onClick={()=>setOpen((prev)=>!prev)}/>}
                open={open}
                sx={{ width: '500px' }}
                defaultValue={selectedLocation}
                renderTags={(value, getTagProps) =>{
                 return value.map((option, index) => (
                    <Chip variant="outlined" label={option.formatted} 
                    {...getTagProps({ index })} onDelete={()=>{delWayPoints(option)}} />
                  ))
                }
                }
                renderInput={(params) => (
                  <TextField {...params}
                   label="Locations" 
                  placeholder="Locations" 
                  onChange={(e)=>{onSearchDebounce(e.target.value)}}/>
                )}
              renderOption={(props, option) => {
              return (
                <li {...props} options={results}>
                  <Grid container alignItems="center" onClick={()=>onSelctedLocation(option)}>
                    <Grid item sx={{ display: 'flex', width: 44 }}>
                      <LocationOnIcon sx={{ color: 'text.secondary' }} />
                    </Grid>
                    <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                        <Typography variant="body2" color="text.secondary">
                        {option.formatted}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
              />
        </div>
    <ShortestRoute key={shortestPath.length}/>
      </div>
    </>
  );
};

export default LocationSearch;