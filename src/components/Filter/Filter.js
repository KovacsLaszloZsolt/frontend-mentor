import './Filter.css';

const Filter = () => {
    const handleFilterOnClick = (e) => {
        console.log(e.target);
    }
    const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    return (
        <div className="select-ctn">
            <ul className="filter-elems-ctn">
                <li className="filter-elem filter-elem-selected" onClick={handleFilterOnClick}>Filter by Region</li>
                <li className="filter-elem inactive">Africa</li>
                <li className="filter-elem inactive">America</li>
                <li className="filter-elem inactive">Europa</li>
            </ul>
        </div >
    );
};

export default Filter;