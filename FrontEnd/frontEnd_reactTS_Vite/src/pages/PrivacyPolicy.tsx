import { Container, Card } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
const PrivacyPolicy = () => {
    return (
        <>
        <Navbar/>
        <Container className="my-5">
            <h1 className="text-center mb-4">Privacy Policy</h1>

            <Card className="shadow-sm">
                <Card.Body>
                    <section className="mb-4">
                        <h2>Data Collection</h2>
                        <p>
                            We collect personal information you provide when creating an account,
                            making purchases, or contacting customer support. This includes your name,
                            email address, and payment details.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h2>Data Usage</h2>
                        <p>
                            Your data is used to process transactions, improve our services,
                            and communicate important updates. We do not share your information
                            with third parties without your consent.
                        </p>
                    </section>

                    <section>
                        <h2>Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data.
                            All sensitive information is encrypted during transmission and storage.
                        </p>
                    </section>
                </Card.Body>
            </Card>
        </Container>
        <Footer />
    </>
    );
};

export default PrivacyPolicy;