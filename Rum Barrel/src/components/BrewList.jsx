import React from "react";
import { useState } from 'react';
import Details from "./Details";
import { Link } from "react-router-dom";
import { LineChart, Line } from 'recharts';
import BarChart from "./BreweryBarChart";



const BrewList = () => {

    const [city, setCity] = useState('');
    const [display, setDisplay] = useState(false);
    const [breweries, setBreweries] = useState([]);
    
    const callAPI = async (query) => {
        try{
          const response = await fetch(query);
        const json = await response.json();
        setBreweries(json);
        } catch (error) {
          console.error('Error fetching breweries', error);
        }
      };

    const startSearch = (e) => {
        if (city === '') {
          alert('Please enter a city');
          return;
        };
    
        e.preventDefault();
        callAPI(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}`);
        setDisplay(true);
      };

    const typeCounts = breweries.reduce((acc, brewery) => {
        acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
        return acc;
    }, {});

    const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);

    let mostCommonType = sortedTypes[0] ? sortedTypes[0][0].toUpperCase() : '';
    if (sortedTypes[1] && sortedTypes[0][1] === sortedTypes[1][1]) {
      mostCommonType = `${sortedTypes[0][0].toUpperCase()} & ${sortedTypes[1][0].toUpperCase()}`;
    }
  

    return(


       <div className="centerPiece">
         {!display && (
        <div id='openingPage'>
          <h1>Welcome to Rum Barrel🍻</h1>
          <h3>Your #1 Brewery Map</h3>

          <form action="">
            <label htmlFor="userInput">Please enter your current city to Kick things off</label>
            <br/>
            <input type="text" name="userInput" id="userInput" required onChange={(e) => {setCity(e.target.value)}}/>
            <br/>
            <button onClick={startSearch}>Find Near {city}</button>
          </form>
        </div>
      )}
            {display && (
                 <div className="brewList">
                 <div className='info'>
                     <div>Your City is: <br/><span>{city.toUpperCase()}</span></div>
                     <div>There are <br />
                     <span>{breweries.length}</span> <br />
                     in {city.toUpperCase()}</div>
                     <div>
                         The Major types are:
                         <br />
                         <span>{mostCommonType}</span>
                     {}
                     </div>
                 </div>
                 <div className="brewries">
                 {breweries.length === 0 ? <h1>Sorry, no breweries found</h1> :
                 <table>
                     <thead>
                         <tr>
                         <th>Name</th>
                         <th>City, State</th>
                         <th>Type</th>
                         <th>Details</th>
                         </tr>
                     </thead>
                     <tbody>
                     {breweries.map((brewery, index) => {
                     return(
                         <tr key={index} className='brewery'>
                             <td>{brewery.name}</td>
                             <td>{brewery.city}, {brewery.state}</td>
                             <td>{brewery.brewery_type}</td>
                             <td> <Link to={`/brewery/${brewery.id}`} className="navButton">🍻</Link></td>
                         </tr>
                     )
                 })}
                     </tbody>
                
                </table>}
                
                 </div>
                 <BarChart breweries={breweries} className="bar"/>
             </div>
             
            )}
             
       </div>
    )
}

export default BrewList;