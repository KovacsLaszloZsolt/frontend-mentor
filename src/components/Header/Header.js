import './Header.css';
import { useState } from 'react';

const Header = () => {
    const preferedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';

    const [theme, setTheme] = useState(preferedTheme);
    const [modeIcon, setModeIcon] = useState('material-icons-outlined');

    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);

    const handleModeChange = (e) => {
        setTheme(theme === 'light' ? 'dark' : 'light', () => {
            html.dataset.theme = theme;
            theme === 'light' ?
                setModeIcon('material-icons-outlined') :
                setModeIcon('material-icons');
        })
    }

    window.addEventListener('unload', () => {
        window.localStorage.setItem('theme', theme);
    })
    return (
        <header>
            <h1 className="page-title">Where in the world?</h1>

            <div className="mode-ctn" data-darkmode="false" onClick={handleModeChange}>
                <span className={"mode-icon " + modeIcon}>
                    nightlight
                </span>
                <span className="color-mode">{theme + " mode"}</span>
            </div>

        </header>
    );
};

export default Header;