import './SearchBar.css';

const SearchBar = ({ search, setSearch }) => {
    const handleSearchOnChange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div className="search-bar-ctn">
            <label htmlFor="country-search" className="search-icon material-icons-outlined">
                search
            </label>
            <input
                type="text"
                name="country-search"
                id="country-search"
                value={search}
                placeholder="Search for a country..."
                onChange={handleSearchOnChange}
            />
        </div>
    );
};

export default SearchBar;