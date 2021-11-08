import './CountryCard.css';

const CountryCard = ({ country, index }) => {
    return (

        index < 3 &&
        <div key={country.name.common} className="country-card">
            {country.flags.svg && <img src={country.flags.svg} alt={country.name.common} className="country-flag" />}
            <div className="country-details-ctn">
                {country.name.common && <h2 className="country-name">{country.name.common}</h2>}
                <ul>
                    {country.population && <li key={country.population} className="country-detail">Population: {country.population}</li>}
                    {country.region && <li key={country.region} className="country-detail">Region: {country.region}</li>}
                    {country.capital && <li key={country.capital.join(' ,')} className="country-detail">Capital: {country.capital.join(' ,')}</li>}
                </ul>
            </div>
        </div>

    )
}

export default CountryCard;