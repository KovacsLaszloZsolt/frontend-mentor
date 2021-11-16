import './App.css';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import CountryCardsCtn from '../CountryCardsCtn/CountryCardsCtn';
import CountryDetails from '../CountryDetails/CountryDetails';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
// import Loader from '../Loader/Loader';
// import data from '../../data/data';

function App() {
  const URL = "https://restcountries.com/v3.1/all";
  const [counrtiesDetails, setCountriesDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // setCountriesDetails(data);
    // setQueryData(data);
    fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        setCountriesDetails(data);
        setQueryData(data);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [queryData, setQueryData] = useState('');

  useEffect(() => {
    if (counrtiesDetails) {
      setQueryData(counrtiesDetails
        .filter(country => country.name.common.toLowerCase()
          .includes(search.toLowerCase())).filter(country => country.region.includes(filter)));
    }
  }, [search, filter, counrtiesDetails]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/" element={
            <>
              <div className="s-f-ctn">
                <SearchBar search={search} setSearch={setSearch} />
                <Filter filter={filter} setFilter={setFilter} />
              </div>
              {isLoading ? <Loader
                className="loader"
                type="Puff"
                color="#c4ac26"
                height={200}
                width={200}
                timeout={3000} //3 secs
              /> :
                <CountryCardsCtn counrtiesDetails={queryData} />
              }
            </>
          }
        />
        <Route
          path=":countryName"
          element={<CountryDetails
            queryData={queryData}
            counrtiesDetails={counrtiesDetails}
            navigate={navigate}
          />}
        />
      </Routes>

    </div >
  );
}

export default App;
