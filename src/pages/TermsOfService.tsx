import { Container, Card, ListGroup } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
const TermsOfService = () => {
    return (
        <>
    <Navbar />
        <Container className="my-5">
            <h1 className="text-center mb-4">Terms of Service</h1>

            <Card className="shadow-sm">
                <Card.Body>
                    <section className="mb-4">
                        <h2>Acceptance of Terms</h2>
                        <p>
                            By accessing or using our services, you agree to be bound by these terms.
                            If you do not agree, please refrain from using our platform.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2>User Responsibilities</h2>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Provide accurate and up-to-date information.
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Do not misuse or abuse the platform.
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Respect the intellectual property rights of others.
                            </ListGroup.Item>
                        </ListGroup>
                    </section>

                    <section>
                        <h2>Termination</h2>
                        <p>
                            We reserve the right to terminate or suspend your account if you violate
                            these terms or engage in prohibited activities.
                        </p>
                    </section>
                </Card.Body>
            </Card>
            </Container>
            <Footer />
            </>
    );
};

export default TermsOfService;