import { Card, ListGroup, Container, Button } from 'react-bootstrap';
import Navbr from '../Components/Navbar';
import Footer from '../Components/Footer';

const UserAccount = () => {
    // Temporary mock data
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        joined: 'January 2023',
        role: 'Premium Member',
    };

    return (<>
        <div style={{ height: "77vh" }}>
        <Navbr />
        <Container className="my-5" >
            <h1 className="my-4 pt-4">Account Details</h1>
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">{user.email}</Card.Subtitle>

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>Member Since:</strong> {user.joined}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Account Type:</strong> {user.role}
                        </ListGroup.Item>
                    </ListGroup>

                    <div className="mt-4 d-flex gap-3">
                        <Button variant="primary">Edit Profile</Button>
                        <Button variant="outline-danger">Change Password</Button>
                    </div>
                </Card.Body>
            </Card>
            </Container>
        </div>
        <Footer />
    </>
    );
};

export default UserAccount;