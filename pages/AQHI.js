import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import emissionData from './owid-co2-data.json';

import { useState, useEffect} from 'react';

export default function EmissionsGraph() {

  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [emissionData1, setEmissionData1] = useState([]);
  const [emissionData2, setEmissionData2] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [year, setYear] = useState('');


useEffect(() => {
  if (country1 && country2) {
    setEmissionData1(emissionData[country1]?.data || []); 
    setEmissionData2(emissionData[country2]?.data || []);
  }

}, [country1, country2]);

const saveSearch = () => {
  if (country1 && country2) {
    const search = {
      country1: country1,
      country2: country2,
      data1: emissionData1,
      data2: emissionData2,
      year: year,
    };


    setSavedSearches([...savedSearches, search]);
    localStorage.setItem('savedSearches', JSON.stringify([...savedSearches, search]));
  }
}

const loadSearches = (search) => {
  setCountry1(search.country1);
  setCountry2(search.country2);
  setEmissionData1(search.data1);
  setEmissionData2(search.data2);
  setYear(search.year);

};

const handleYearChange = (event) => {
  setYearInput(event.target.value);
};





const barData = {
  labels: emissionData1.map((data) => data.year),
  datasets: [
    {
      label: country1,
      data: emissionData1.map((data) => data.cumulative_luc_co2),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: country2,
      data: emissionData2.map((data) => data.cumulative_luc_co2),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};





  return (
    <div>
      <h1>CO2 Emissions</h1>
      <div>
        <label>
          Country 1:
          <input
            type="text"
            value={country1}
            onChange={(event) => setCountry1(event.target.value)}
          />
        </label>
        <label>
          Country 2:
          <input
            type="text"
            value={country2}
            onChange={(event) => setCountry2(event.target.value)}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </label>
      </div>
      <div>
        
      </div>
      <div>
        <Bar data={barData} />
      </div>
    </div>
  );
}
