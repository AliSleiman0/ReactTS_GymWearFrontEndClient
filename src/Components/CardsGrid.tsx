import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { ProductCardDTO } from "../api/product";


// Define props for ResponsiveCards
interface ResponsiveCardsProps {
    cardData: ProductCardDTO[];
    handleCardClick: () => void;


}

// ResponsiveCards Component
const CardsGrid: React.FC<ResponsiveCardsProps> = ({ cardData, handleCardClick }) => {
    return (
        <Container className="mt-2">
            <Row>
                {cardData.map((card, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <ProductCard
                            key={card.id}
                            id={card.id}
                            background={card.background}
                            title={card.title}
                            oldPrice={card.oldPrice}
                            newPrice={card.newPrice}
                            handleCardClick={handleCardClick }

                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardsGrid;