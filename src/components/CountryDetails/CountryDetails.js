import './CountryDetails.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CountryDetails = ({ counrtiesDetails, navigate }) => {
    const { countryName } = useParams();
    const [currentCountry, setCurrentCountry] = useState(null);

    useEffect(() => {
        if (counrtiesDetails && countryName) {
            setCurrentCountry(counrtiesDetails.find(country => country.name.common === countryName));
        }
    }, [counrtiesDetails, countryName]);

    const getCountry = (border) => {
        return counrtiesDetails.find(country => country.cca3 === border).name.common;
    };

    const handleBackBtnOnClick = () => {
        navigate(-1);
    }

    return (
        <>
            {currentCountry &&
                <div className="details-card-ctn">
                    <button className="back-btn" type="button" onClick={handleBackBtnOnClick}>
                        <span className="arrow-back material-icons-outlined">
                            keyboard_backspace
                        </span>
                        <span>Back</span>
                    </button>
                    <div className="details-ctn">
                        <img className="country-details-flag" src={currentCountry.flags.png} alt={currentCountry.name.common + " flag"} />

                        <div className="details">
                            <h2 className="country-details-name">{currentCountry.name.common}</h2>
                            <div className="listed-details">
                                <ul>
                                    {currentCountry.name.nativeName && <li key="native-name"><strong>Native name:</strong>{Object.values(currentCountry.name.nativeName).at(-1).common}</li>}
                                    {currentCountry.population && <li key="population"><strong>Population:</strong>{Intl.NumberFormat("en-En").format(currentCountry.population)}</li>}
                                    {currentCountry.region && <li key="region"><strong>Region:</strong>{currentCountry.region}</li>}
                                    {currentCountry.subregion && <li key="sub-region"><strong>Sub region:</strong>{currentCountry.subregion}</li>}
                                    <li key="capital"><strong>Capital: </strong>{currentCountry.capital ? currentCountry.capital.join(', ') : 'N.A'}</li>
                                </ul>

                                <ul>
                                    <li key="tld"><strong>Top Level Domain:</strong> {currentCountry.tld ? currentCountry.tld.join(', ') : 'N.A'} </li>
                                    <li key="currencies"><strong>Currencies:</strong> {Object.keys(currentCountry.currencies) ? Object.keys(currentCountry.currencies).join(', ') : 'N.A'} </li>
                                    <li key="languages"><strong>Languages:</strong> {Object.values(currentCountry.languages) ? Object.values(currentCountry.languages).join(', ') : 'N.A'} </li>
                                </ul>
                            </div>

                            {currentCountry.borders &&
                            <div className="border-countries-wrapper">
                                    <strong>Border countries: </strong>
                                    <ul className="border-countries-ctn">
                                        {currentCountry.borders.map(border => (
                                            <Link key={border} to={'/' + getCountry(border)}>
                                                <li className="border-country">
                                                    {getCountry(border)}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div >
            }
        </>
    )
};

export default CountryDetails;