import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Alert, Button } from 'react-bootstrap';
import { GetOrderDTO, getOrderById } from '../api/orders';
import { clearCart, getCartByUserId } from '../api/cart';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';

export default function OrderConfirmation() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<GetOrderDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { refreshCart } = useCart();
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await getOrderById(Number(orderId));
                setOrder(orderData);
                const cart = await getCartByUserId(Number(user?.id));
                if (!cart) {
                    // Handle case where no cart exists
                    console.log("No cart to clear");
                    return;
                }
                await clearCart(cart.id);
                refreshCart();

            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="my-5 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Alert variant="success" className="h4">
                    Order #{orderId} Confirmed!
                </Alert>
                <Button
                    variant="primary"
                    onClick={() => navigate("/user/UserOrders")}
                >
                    View Order History
                </Button>
            </motion.div>
        </Container>
    );
}