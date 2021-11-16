import React, { useState } from 'react';
import './CountryCardsCtn.css';
import { useEffect } from 'react';
import CountryCard from '../CountryCard/CountryCard';


const CountryCardsCtn = ({ counrtiesDetails, navigate }) => {

    return (
        <div className="country-cards-ctn">
            {counrtiesDetails &&
                counrtiesDetails.map((country, index) =>
                    <CountryCard
                        key={country.name.common}
                        country={country}
                        index={index}
                        navigate={navigate}
                    />)
            }
        </div>
    );
};

export default CountryCardsCtn;