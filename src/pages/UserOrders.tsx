import  { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import Navbr from '../Components/Navbar';
import Footer from '../Components/Footer';
import { GetOrderDTO, getCustomerOrders } from '../api/orders';
import { useAuth } from '../Context/AuthContext';

const UserOrders = () => {
    // Retrieve the logged-in user from the Auth context.
    const { user } = useAuth();

    // Local state to hold the orders and loading status.
    const [orders, setOrders] = useState<GetOrderDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) return;
                // Fetch orders for the current user.
                const data = await getCustomerOrders(Number(user.id));
                console.log(data);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    // Show a loading indicator if data is still being fetched.
    if (loading) {
        return (
            <>
                <Navbr />
                <Container className="my-5" style={{ minHeight: "67vh" }}>
                    <div>Loading orders...</div>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbr />
            <br />
            <Container className="my-5" style={{ minHeight: "67vh" }}>
                <h1 className="mb-4">My Orders</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                {/* Display the order id */}
                                <td>{order.id}</td>
                                {/* Format the date to a readable format */}
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                {/* Use the length of orderProducts as the items count */}
                                <td>{order.orderProducts?.length || 0}</td>
                                {/* Format the total amount to 2 decimal places */}
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td>{order.orderStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Footer />
        </>
    );
};

export default UserOrders;
