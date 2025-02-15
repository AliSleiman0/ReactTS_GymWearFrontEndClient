//import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartButton from './CartButton';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
//import SearchButton from './SeacrhButton';

function Navbr() {
    const { user, accessToken } = useAuth();

    const { cartCount } = useCart();


    //const [top, settop] = useState('fixed-top');
    //useEffect(() => {
    //    const handleScroll = () => {
    //        if (window.scrollY > 600) {

    //            settop('');
    //        } else {

    //            settop('fixed-top');
    //        }

    //    };

    //    window.addEventListener('scroll', handleScroll);

    //    // Cleanup the event listener on unmount
    //    return () => {
    //        window.removeEventListener('scroll', handleScroll);
    //    };
    //}, []);


    const navigate = useNavigate();
    return (
        <Navbar
            className="fixed-top"
            collapseOnSelect
            expand="lg"
            style={{
                background: "linear-gradient(to right, #000000, #333333)"
            }}
        >
            <Container>
                <Navbar.Brand
                    onClick={() => navigate("/")}
                    style={{ color: 'white', cursor: 'pointer' }}
                >
                    BeastFit Wear
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => navigate("/shopproducts/2")}
                            style={{ color: 'white', cursor: 'pointer' }}
                        >
                            Women
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate("/shopproducts/1")}
                            style={{ color: 'white', cursor: 'pointer' }}
                        >
                            Men
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate("/auth/signin")}   // Updated here
                            style={{ color: 'white', cursor: 'pointer' }}
                        >
                            {user && accessToken ? "Logout" : "Login"}
                        </Nav.Link>
                        <NavDropdown
                            title={<span style={{ color: 'white' }}>Profile</span>}
                            id="collapsible-nav-dropdown"
                        >
                         
                           
                            <NavDropdown.Item
                                onClick={() => navigate("/user/UserOrders")}
                                style={{ cursor: 'pointer' }}
                            >
                                Order history
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => navigate("/user/Wishlist")}
                                style={{ cursor: 'pointer' }}
                            >
                                Wishlist
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link
                            onClick={() => navigate("/user/UserCart")}
                            style={{ color: 'white', cursor: 'pointer' }}
                        >
                            <CartButton itemCount={cartCount} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbr;
