import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LocationSearch from './LocationSearch'
import RouteMap from './RouteMap'
import Map from './Map'
import shortestPathContext from '../context/shortestPathContext'




const StyledContainer=styled.div`
   padding-top: 100px !important;
   display: flex;
   height: 100vh;
`

function WayPoints(props) {
  const { shortestPath, setShortestPath } = useContext(shortestPathContext);
  return (
    <StyledContainer className="container-fluid d-flex" >
        <LocationSearch />
        <RouteMap key={shortestPath.length}/>
    </StyledContainer>
  )
}

WayPoints.propTypes = {}

export default WayPoints
