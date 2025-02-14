import { Button } from 'react-bootstrap';

const CartButton = ({ itemCount }: { itemCount: number }) => {
    return (
        <Button
            data-open-modal="minicart"
            className="position-relative d-flex justify-content-center align-items-center transition-opacity"
            style={{
                width: '2.5rem', // Reduced button size
                height: '2.5rem', // Reduced button size
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0, // Remove extra padding to match icon size
                opacity: 1,
            }}
        >
            {/* SVG Cart Icon */}
            <svg
                id="CartIcon"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
                viewBox="0 0 512 512"
                className="icon-cart"
                style={{
                    height: '1.5rem', // Reduced icon size to match the search icon
                    width: '1.5rem',  // Reduced icon size to match the search icon
                    stroke: 'currentColor',
                }}
            >
                <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="40"
                    d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"
                />
            </svg>

            {/* Badge for item count */}
            <span
                className="position-absolute d-flex justify-content-center align-items-center"
                style={{
                    bottom: '5%', // Adjusted for smaller button
                    right: '5%',  // Adjusted for smaller button
                    fontWeight: 600,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    minWidth: '1.2rem',  // Reduced badge size
                    minHeight: '1.2rem', // Reduced badge size
                    fontSize: '0.7rem',  // Adjusted font size to fit within the smaller badge
                }}
            >
                {itemCount}
            </span>
        </Button>
    );
}

export default CartButton;
