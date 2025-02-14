import { Container, Row, Col } from "react-bootstrap";
import ButtonShop from "./ButtonShop";
import { useNavigate } from "react-router-dom";

const WelcomeBanner = () => {
    const navigate = useNavigate();
    return (
        <Container fluid="md" className="Welcome-banner">
            <Row className="justify-content-center mb-2">
                <p className="headerStyle">
                   TRAIN HARD, LOOK GOOD!
                </p>
            </Row>
            <Row className="justify-content-center mb-12">
                <Col xs="auto">
                    <ButtonShop onClick={() => navigate("/shopproducts/1")}>Shop Men</ButtonShop>
                </Col>
                <Col xs="auto">
                    <ButtonShop onClick={() => navigate("/shopproducts/2")}>Shop Women</ButtonShop>
                </Col>
            </Row>

        </Container>
    );
}
export default WelcomeBanner