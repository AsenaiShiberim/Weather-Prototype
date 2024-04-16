'use client';
import React, { useState, useEffect } from 'react';
import co2Data from './owid-co2-data.json'; // Import your JSON data
import { Result } from 'postcss';

export default function Co2() {

const backgroundImage = "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

const backgroundImageStyle = {
  backgroundImage: backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column', // ensure items are stacked vertically
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
};




  // Define state to store CO2 data and user input
  const [countryInput, setCountryInput] = useState('');
  const [yearInput, setYearInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]); // [1

  // Function to handle user input for country
  const handleCountryChange = (event) => {
    setCountryInput(event.target.value);
  };

  // Function to handle user input for year
  const handleYearChange = (event) => {
    setYearInput(event.target.value);
  };


  // Function to save the search
  const saveSearch = () => {
    if (countryInput && yearInput) {
      const search = {
        country: countryInput,
        year: yearInput,
        results: filteredData,
      };
      setSavedSearches([...savedSearches, search]);
      // You can also store the saved searches in local storage or a database
      localStorage.setItem('savedSearches', JSON.stringify([...savedSearches, search]));
    }
  };

  //load saved searches from local storage
  const loadSearches = (search) => {
    setCountryInput(search.country);
    setYearInput(search.year);
    setFilteredData(search.results);
  };





  //load saved searches from local storage
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches'));
    if (savedSearches) {
      setSavedSearches(savedSearches);
    }
  }, []);







  // Set CO2 data when component mounts
  useEffect(() => {
    setFilteredData(co2Data[countryInput]?.data || []);
  }, [countryInput, yearInput]);

  // Function to filter CO2 data based on user input
  useEffect(() => {
    if (countryInput && yearInput) {
      const filteredData = co2Data[countryInput]?.data.filter(entry => entry.year === parseInt(yearInput));
      setFilteredData(filteredData || []);
    } else {
      setFilteredData([]);
    }
  }, [countryInput, yearInput]);

  return (
    <div style={backgroundImageStyle}>
      <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-6">CO2 Emissions Data</h1>
        {/* Input fields for country and year */}
        <div className="flex mb-4">
          <label className="mr-2">
            Country:
            <input type="text" className="ml-2 border border-gray-300 rounded px-2 py-1" value={countryInput} onChange={handleCountryChange} />
          </label>
          <label>
            Year:
            <input type="number" className="ml-2 border border-gray-300 rounded px-2 py-1" value={yearInput} onChange={handleYearChange} />
          </label>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={saveSearch}>Save Search</button>
      </div>
    );
    

      {/* Display the filtered data */}
      {filteredData.length > 0 ? (
        <div>
          <h2>{countryInput}</h2>
          <ul>
            {filteredData.map((entry, index) => (
              <li key={index}>
                <strong>Year:</strong> {entry.year},&nbsp;
                <strong>Population:</strong> {entry.population},&nbsp;
                <strong>Cumulative CO2:</strong> {entry.cumulative_luc_co2},&nbsp;
                <strong>Temp Change from co2:</strong> {entry.temperature_change_from_co2},&nbsp;
                
                
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data found</p>
      )}


      {/* Button to save the search */}
      <h2>savedSearches</h2>
      {savedSearches.map((search, index) => (
       <div key={index} onClick={() => loadSearches(search)} style={{ marginBottom: '10px', cursor: 'pointer' }}>
          <strong>Country:</strong> {search.country},&nbsp;
          <strong>Year:</strong> {search.year},&nbsp;
          <strong>Results:</strong> {search.results.length} entries
       </div> 
      ))}
    </div>
  );
}
