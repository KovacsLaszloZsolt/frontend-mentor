import './Header.css';

const Header = () => {
    const handleModeChange = (e) => {
        console.log(e);
    }
    return (
        <header>
            <h1 className="page-title">Where in the world?</h1>

            <div className="mode-ctn">
                <span className="mode-icon material-icons-outlined">
                    dark_mode
                </span>
                <span className="color-mode">Light mode</span>
            </div>

        </header>
    );
};

export default Header;