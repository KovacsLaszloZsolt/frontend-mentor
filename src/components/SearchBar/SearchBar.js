import './SearchBar.css';

const SearchBar = ({ setSearch }) => {
    const handleSearchOnChange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div className="search-bar-ctn">
            <span className="search-icon material-icons-outlined">
                search
            </span>
            <input
                type="text"
                name="country-search"
                id="country-search"
                placeholder="Search for a country..."
                onChange={handleSearchOnChange}
            />
        </div>
    );
};

export default SearchBar;