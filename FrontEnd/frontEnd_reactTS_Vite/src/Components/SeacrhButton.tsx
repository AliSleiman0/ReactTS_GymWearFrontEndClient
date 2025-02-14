import { Button } from 'react-bootstrap';

const SearchButton = () => {
    return (
        <Button
            data-open-modal="quick-search"
            className="position-relative d-flex justify-content-center align-items-center transition-opacity"
            style={{
                width: '2.5rem', // Match the size of the CartButton
                height: '2.5rem', // Match the size of the CartButton
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0, // Remove extra padding to match icon size
                opacity: 1,
            }}
        >
            {/* SVG Search Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
                viewBox="0 0 512 512"
                style={{
                    height: '1.5rem', // Match the icon size of CartButton
                    width: '1.5rem',  // Match the icon size of CartButton
                    fill: 'currentColor', // To make the color consistent with the theme
                }}
            >
                <path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path>
            </svg>
        </Button>
    );
};

export default SearchButton;
