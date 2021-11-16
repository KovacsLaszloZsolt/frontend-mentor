import { useState } from 'react';
import './Filter.css';

const Filter = ({ filter, setFilter }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const handleFilterDisplay = () => {

        const currentFilterOpen = !isFilterOpen;

        const arrow = document.querySelector('.arrow-icon');
        const filter = document.querySelector('.filter');
        const filterTitle = document.querySelector('.filter-base-title');

        if (currentFilterOpen) {
            arrow.innerText = 'expand_more';
            filter.classList.remove('filter-inactive');

            if (filterTitle.innerText !== 'Filter by Region') {
                filterTitle.innerText = 'Filter by Region';
            }

        } else {
            arrow.innerText = 'expand_less';
            filter.classList.add('filter-inactive');
        }

        setIsFilterOpen(currentFilterOpen);
    }

    const handleFilterOnClick = (e) => {
        const prevSelectedFilter = document.querySelector('.filter-selected');
        if (prevSelectedFilter) {
            prevSelectedFilter.classList.remove('filter-selected');
        }

        const arrow = document.querySelector('.arrow-icon');
        const filter = document.querySelector('.filter');
        const filterTitle = document.querySelector('.filter-base-title');
        const selectedFilter = e.target;
        selectedFilter.classList.add('filter-selected');
        arrow.innerText = 'expand_less';
        filter.classList.add('filter-inactive');

        filterTitle.innerText = selectedFilter.innerText;


        setFilter(selectedFilter.innerText === 'All' ? '' : selectedFilter.innerText);
        setIsFilterOpen(false);
    }

    const continents = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    return (
        <div className="filter-ctn">
            <div className="filter-base" onClick={handleFilterDisplay}>
                <span className="filter-base-title">Filter by Region</span>
                <span className="arrow-icon material-icons-outlined">
                    expand_less
                </span>
            </div>
            <ul className="filter filter-inactive">
                {continents.map(continent => (
                    <li key={continent}
                        className="filter-elem inactive-filter"
                        onClick={handleFilterOnClick}>
                        {continent}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Filter;