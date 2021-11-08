import React, { useState } from 'react';
import './CountryCardsCtn.css';
import { useEffect } from 'react';
import CountryCard from '../CountryCard/CountryCard';


const CountryCardsCtn = ({ counrtiesDetails }) => {

    return (
        <div className="country-cards-ctn">
            {counrtiesDetails &&
                counrtiesDetails.map((country, index) => <CountryCard key={country.name.common} country={country} index={index} />)
            }
        </div>
    );
};

export default CountryCardsCtn;