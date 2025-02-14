import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { placeOrder } from "../api/orders";
import { useCart } from "../Context/CartContext";
import Footer from "../Components/Footer";
import Navbr from "../Components/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import { GetCartItemDTO } from "../api/cart";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function ProceedToCheckout() {
    const { user } = useAuth();
    const { refreshCart } = useCart();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalAmount } = state || {};

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate("/user/UserCart");
        }
    }, [cartItems, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!user) throw new Error("User not authenticated");

            const orderData = {
                userId: Number(user.id),
                orderProducts: cartItems.map((item: GetCartItemDTO) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.price,  // Changed from 'price' to 'unitPrice'
                    color: item.color,
                    size: item.size
                }))
            };

            const response = await placeOrder(orderData);

            if (response) {
                setSuccess(true);
                //console.log(cartItems(0).cartId);
                //await clearCart(cartItems(0).cartId);
                refreshCart();
                setTimeout(() => navigate(`/user/OrderConfirmation/${response.id}`), 2000);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
           
            <Container className="text-center my-5">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="d-inline-block"
                >
                    <Alert variant="success" className="h4">
                        Order placed successfully! Redirecting...
                    </Alert>
                </motion.div>
            </Container>
        );
    }

    return (
        <>
            <Navbr />
            <br/>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="my-5"
            >
                <Container>
                    <h1 className="mb-4">Checkout</h1>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            {/* Order Summary */}
                            <Col md={8} className="mx-auto">
                                <motion.div variants={itemVariants}>
                                    <Card className="shadow-sm">
                                        <Card.Body>
                                            <Card.Title className="mb-4">Order Summary</Card.Title>
                                            <AnimatePresence>
                                                {cartItems.map((item: GetCartItemDTO) => (
                                                    <motion.div
                                                        key={item.id}
                                                        variants={itemVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="hidden"
                                                        className="mb-3"
                                                    >
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h6 className="mb-1">{item.productName}</h6>
                                                                <small className="text-muted">
                                                                    {item.color} / {item.size}
                                                                </small>
                                                                <div className="mt-1">
                                                                    <small>
                                                                        Qty: {item.quantity}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <div className="text-end">
                                                                <div>${item.price.toFixed(2)}</div>
                                                                <small className="text-muted">
                                                                    Total: ${(item.price * item.quantity).toFixed(2)}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>

                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h4 className="mb-0">Total:</h4>
                                                <h4 className="mb-0">${totalAmount.toFixed(2)}</h4>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </motion.div>

                                {/* Payment and Submit Section */}
                                <motion.div variants={itemVariants} className="mt-4">
                                    <Card className="shadow-sm">
                                        <Card.Body>
                                            <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    size="lg"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <Spinner animation="border" size="sm" />
                                                    ) : (
                                                        "Confirm & Place Order"
                                                    )}
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        </Row>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-3"
                            >
                                <Alert variant="danger" className="text-center">{error}</Alert>
                            </motion.div>
                        )}
                    </form>
                </Container>
            </motion.div>
            <Footer />
        </>
    );
}