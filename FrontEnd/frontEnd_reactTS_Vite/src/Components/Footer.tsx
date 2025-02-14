
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <Container fluid className="py-2"
            style={{

                background: "linear-gradient(to right, #000000, #333333)"
            }}>
            {/* Legal Links Section */}
            <Row className="align-items-center justify-content-center mb-2">
                <Col xs="auto" className="d-flex flex-wrap justify-content-center gap-2">
                    <Link
                        to="/legal/PrivacyPolicy"
                        className="d-flex align-items-center text-white font-weight-bold small text-decoration-none"
                    >
                        Privacy Policy &bull;
                    </Link>
                    <Link
                        to="/legal/TermsOfService"
                        className="d-flex align-items-center text-white font-weight-bold small text-decoration-none"
                    >
                        Terms of Service &bull;
                    </Link>
                    <Link
                        to="/about/OurTeam"
                        className="d-flex align-items-center text-white font-weight-bold small text-decoration-none"
                    >
                        Our Team
                    </Link>
                </Col>
            </Row>

            {/* Copyright Section */}
            <Row >
                <Col className="text-center  font-weight-bold text-white bold  justify-content-center ">
                    &copy; 2024 &bull; BeastFit Athletics BFT &bull; All Rights Reserved
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
