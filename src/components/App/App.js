import './App.css';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import CountryCardsCtn from '../CountryCardsCtn/CountryCardsCtn';
import CountryDetails from '../CountryDetails/CountryDetails';
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import data from '../../data/data';

function App() {
  const URL = "https://restcountries.com/v3.1/all";
  const [counrtiesDetails, setCountriesDetails] = useState(null);

  useEffect(() => {
    setCountriesDetails(data);
    setQueryData(data);
    //     fetch(URL)
    //         .then(response => response.json())
    //         .then((data) => {
    //             setCountriesDetails(data);
    //         })
  }, []);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [queryData, setQueryData] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    if (counrtiesDetails) {
      setQueryData(counrtiesDetails
        .filter(country => country.name.common.toLowerCase()
          .includes(search.toLowerCase())).filter(country => country.region.includes(filter)));
    }
  }, [search, filter]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/" element={
            <>
              <SearchBar setSearch={setSearch} />
              <Filter filter={filter} setFilter={setFilter} />
              <CountryCardsCtn counrtiesDetails={queryData} />
            </>
          }
        />
        <Route path=":countryName" element={<CountryDetails queryData={queryData}/>} />
      </Routes>

    </div >
  );
}

export default App;
