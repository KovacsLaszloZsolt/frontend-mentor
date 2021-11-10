import './CountryDetails.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const CountryDetails = ({ queryData }) => {
    const { countryName } = useParams();

    const countryObj = queryData.find(country => country.name.common == countryName);

    const getCountry = (border) => {
        return queryData.find(country => country.cca3 === border).name.common;
    };

    return (
        <div className="details-card-ctn">
            <button className="back-btn" type="button">
                <span className="arrow-back material-icons-outlined">
                    keyboard_backspace
                </span>
                <span>Back</span>
            </button>
            <div className="details-ctn">
                <img className="country-details-flag" src={countryObj.flags.png} alt={countryObj.name.common + " flag"} />

                <div className="details">
                    <h2>{countryObj.name.common}</h2>
                    <div className="listed-details">
                        <ul>
                            {countryObj.name.nativeName && <li key="native-name"><strong>Native name:</strong>{Object.values(countryObj.name.nativeName).at(-1).common}</li>}
                            {countryObj.population && <li key="population"><strong>Population:</strong>{Intl.NumberFormat("en-En").format(countryObj.population)}</li>}
                            {countryObj.region && <li key="region"><strong>Region:</strong>{countryObj.region}</li>}
                            {countryObj.subregion && <li key="sub-region"><strong>Sub region:</strong>{countryObj.subregion}</li>}
                            <li key="capital"><strong>Capital: </strong>{countryObj.capital ? countryObj.capital.join(', ') : 'N.A'}</li>
                        </ul>

                        <ul>
                            <li key="tld"><strong>Top Level Domain:</strong> {countryObj.tld ? countryObj.tld.join(', ') : 'N.A'} </li>
                            <li key="currencies"><strong>Currencies:</strong> {Object.keys(countryObj.currencies) ? Object.keys(countryObj.currencies).join(', ') : 'N.A'} </li>
                            <li key="languages"><strong>Languages:</strong> {Object.values(countryObj.languages) ? Object.values(countryObj.languages).join(', ') : 'N.A'} </li>
                        </ul>

                        {countryObj.borders &&
                            <div>
                                <strong>Border countries: </strong>
                                <ul>
                                    {countryObj.borders.map(border => (
                                        <Link key={border} to={'/' + getCountry(border)}>
                                            <li className="">
                                                {getCountry(border)}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
};

export default CountryDetails;