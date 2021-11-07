import './SearchBar.css';

const SearchBar = () => {
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
            />
        </div>
    );
};

export default SearchBar;