import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    Spinner,
    InputGroup,
    FormControl
} from "react-bootstrap";
import {
    //GetCartDTO,
    GetCartItemDTO,
    getCartByUserId,
    getCartItemsByCartId,
    deleteCartItem,
    updateCartItem
} from "../api/cart";
import Footer from "../Components/Footer";
import Navbr from "../Components/Navbar";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
};

export default function UserCart() {
    const { user } = useAuth();
    const { refreshCart } = useCart();
    //const [cart, setCart] = useState<GetCartDTO | null>(null);
    const [cartItems, setCartItems] = useState<GetCartItemDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchCartData = async () => {
        if (!user) return;

        try {
            const cartData = await getCartByUserId(Number(user.id));
            //setCart(cartData);

            if (cartData?.id) {
                const itemsData = await getCartItemsByCartId(cartData.id);
                setCartItems(itemsData || []);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, [user]);

    const handleQuantityChange = async (item: GetCartItemDTO, newQuantity: number) => {
        try {
            if (newQuantity < 1) {
                await deleteCartItem(item.id);
                setCartItems(prev => prev.filter(i => i.id !== item.id));
                refreshCart();
            } else {
                 await updateCartItem(item.id, {
                    ...item,
                    quantity: newQuantity
                });
                setCartItems(prev =>
                    prev.map(i => i.id === item.id ? { ...i, quantity: newQuantity } : i)
                );
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            fetchCartData(); // Re-fetch to sync with server
        }
    };
    const handleRemoveItem = async (itemId: number) => {
        try {
            await deleteCartItem(itemId);
            setCartItems(prev => prev.filter(i => i.id !== itemId));
            refreshCart(); // Add this line
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };
    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading cart...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <>
            <Navbr />
            <br /> <br />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{minHeight:"65vh"} }
                className="my-5"
            >
                <Container>
                    <h1 className="mb-4">Your Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-5"
                        >
                            <h3>Your cart is empty</h3>
                            <p>Start adding items to see them here!</p>
                        </motion.div>
                    ) : (
                        <>
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                        className="mb-3"
                                    >
                                        <Card
                                            as={motion.div}
                                            whileHover={{ scale: 1.01 }}
                                            className="shadow-sm"
                                        >
                                            <Card.Body>
                                                <Row className="align-items-center">
                                                    <Col md={2}>
                                                        <Card.Img
                                                            src={item.imgSrc}
                                                            alt={item.productName}
                                                            style={{ maxHeight: '100px', objectFit: 'contain' }}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <h5>{item.productName}</h5>
                                                        <div className="d-flex gap-3 align-items-center mt-2">
                                                            {item.color && (
                                                                <div className="d-flex align-items-center gap-1">
                                                                    <div
                                                                        className="color-swatch"
                                                                        style={{
                                                                            backgroundColor: item.color,
                                                                            width: '20px',
                                                                            height: '20px',
                                                                            borderRadius: '50%',
                                                                            border: '1px solid #ddd'
                                                                        }}
                                                                    />
                                                                    <span className="text-muted small">
                                                                        {item.color}-<strong>{item.size}</strong>
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col md={4} className="text-end">
                                                        <div className="d-flex align-items-center justify-content-end gap-3">
                                                            <InputGroup style={{ width: '130px' }}>
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    -
                                                                </Button>
                                                                <FormControl
                                                                    value={item.quantity}
                                                                    readOnly
                                                                    className="text-center"
                                                                />
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                                >
                                                                    +
                                                                </Button>
                                                            </InputGroup>
                                                            <Button
                                                                variant="outline-danger"
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                size="sm"
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                        <div className="mt-2">
                                                            <Badge bg="success">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </Badge>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-light rounded shadow-sm"
                            >
                                <Row className="align-items-center">
                                    <Col md={6}>
                                        <h4 className="mb-0">Total: ${calculateTotal().toFixed(2)}</h4>
                                    </Col>
                                    <Col md={6} className="text-end">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={() => navigate("/checkout", {
                                                state: {
                                                    cartItems,
                                                    totalAmount: calculateTotal()
                                                }
                                            })}
                                            className="px-5"
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </Col>
                                </Row>
                            </motion.div>
                        </>
                    )}
                </Container>
            </motion.div>
            <Footer />
        </>
    );
}