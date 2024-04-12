'use client';
import React, { useState, useEffect } from 'react';
import co2Data from './owid-co2-data.json'; // Import your JSON data

export default function Co2() {
  // Define state to store CO2 data and user input
  const [countryInput, setCountryInput] = useState('');
  const [yearInput, setYearInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Function to handle user input for country
  const handleCountryChange = (event) => {
    setCountryInput(event.target.value);
  };

  // Function to handle user input for year
  const handleYearChange = (event) => {
    setYearInput(event.target.value);
  };

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
    <div>
      <h1>CO2 Emissions Data</h1>
      {/* Input fields for country and year */}
      <label>
        Country:
        <input type="text" value={countryInput} onChange={handleCountryChange} />
      </label>
      <label>
        Year:
        <input type="number" value={yearInput} onChange={handleYearChange} />
      </label>

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
                
                {/* Add more properties here */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}
