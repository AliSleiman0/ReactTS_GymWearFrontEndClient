import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../Context/WishlistContext';
import { getProductById, getProductCardById, GetProductDTO, ProductCardDTO } from '../api/product';
import ProductModal from '../Components/ProductModal';
import Navbr from '../Components/Navbar'; 
import Footer from '../Components/Footer';
const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const [products, setProducts] = useState<GetProductDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalCardData, setModalCardData] = useState<ProductCardDTO>();
    const [modalShow, setModalShow] = useState<boolean>(false);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            try {
                setLoading(true);
                const productPromises = wishlist.map(id => getProductById(Number(id)));
                const productsData = await Promise.all(productPromises);
                setProducts(productsData);
                setError(null);
            } catch (err) {
                setError('Failed to load wishlist items');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (wishlist.length > 0) {
            fetchWishlistProducts();
        } else {
            setLoading(false);
            setProducts([]);
        }
    }, [wishlist]);

    const handleCardClick = async (id: number) => {
        if (!id) return;
        try {
            const clickedCard = await getProductCardById(id);
            if (!clickedCard) {
                console.error(`No card found with id: ${id}`);
                return;
            }
            setModalCardData(clickedCard);
            setModalShow(true);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleRemove = (productId: string) => {
        removeFromWishlist(Number(productId));
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: 50 }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading wishlist...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return <Container className="mt-5 text-center text-danger">{error}</Container>;
    }

    if (products.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h3>Your wishlist is empty</h3>
                <p>Start adding items to your wishlist!</p>
            </Container>
        );
    }

    return (
        <>
        <Navbr/>
            <br />
            <br />
        <Container className="my-5">
            <ProductModal show={modalShow} onHide={() => setModalShow(false)} modalCardData={modalCardData} />
            <h1 className="mb-4">My Wishlist</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                <AnimatePresence>
                    {products.map((product) => (
                        <Col key={product.id}>
                            <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" layout>
                                <Card className="h-100 shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={product.imgSrc}
                                        alt={product.productName}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{product.productName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            ${product.price.toFixed(2)}
                                        </Card.Subtitle>
                                        <div className="mt-auto d-flex justify-content-between align-items-center">
                                            <Button variant="outline-primary" onClick={() => handleCardClick(Number(product.id))}>
                                                View Product
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleRemove(product.id);
                                                }}
                                                aria-label="Remove from wishlist"
                                            >
                                                X
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </AnimatePresence>
            </Row>
                </Container>
                <Footer />
            </>
    );
};

export default Wishlist;