import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { BsFillBagFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

import { addCartItem, getCartByUserId, getCartItemsByCartId } from '../api/cart';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';

interface ProductModalProps {
    show: boolean;
    onHide: () => void;
    modalCardData?: {
        id: number;
        background: string;
        title: string;
        oldPrice: number;
        newPrice: number;
        colors: string[];
        sizes: string[];
        category: string;
    };
}

const ProductModal: React.FC<ProductModalProps> = ({ show, onHide, modalCardData }) => {
    if (!modalCardData) return null;

    const { id, background, title, oldPrice, newPrice, colors, sizes, category } = modalCardData;
    const { user } = useAuth();
    const { refreshCart } = useCart();
    const [color, setSelectedColor] = useState<string>('');
    const [size, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [isInCart, setIsInCart] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkCartStatus = async () => {
            if (!user) return;

            setLoading(true);
            try {
                const cart = await getCartByUserId(Number(user.id));
                console.log(cart);
                const cartItems = await getCartItemsByCartId(cart.id);
                console.log(cartItems);
                setIsInCart(
                    cartItems.some(item =>
                        item.productId === id &&
                        item.color === color &&
                        item.size === size
                    )
                );
                refreshCart();
                console.log(isInCart);
            } catch (error) {
                console.error('Error checking cart:', error);
            } finally {
                setLoading(false);
            }
        };

        if (show) checkCartStatus();
    }, [show, user, id, color, size]);

    const handleAddToCart = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const cart = await getCartByUserId(Number(user.id));
            await addCartItem({ cartId: cart.id, productId: id, quantity, price: newPrice, color, size });
            setIsInCart(true);
            refreshCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} size="lg" centered onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.5 }}>
                    <Row>
                        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
                            <motion.img src={background} alt={title} style={{ maxWidth: '100%', borderRadius: '8px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
                        </Col>
                        <Col xs={12} md={6}>
                            <h5 className="font-weight-bold">Product Details</h5>
                            <p><strong>Category:</strong> {category}</p>
                            <p>
                                <strong className="text-success">Price:</strong>
                                <del className="text-danger"> ${oldPrice?.toFixed(2)}</del>
                                <span className="text-success"> ${newPrice?.toFixed(2)}</span>
                            </p>

                            <Form.Group>
                                <Form.Label>Select Color</Form.Label>
                                <div className="d-flex flex-wrap">
                                    {colors?.map((colorr, index) => (
                                        <div key={index} onClick={() => setSelectedColor(colorr)} style={{ width: '30px', height: '30px', backgroundColor: colorr, margin: '5px', borderRadius: '4px', cursor: 'pointer', border: color === colorr ? '2px solid black' : '2px solid transparent' }} />
                                    ))}
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Select Size</Form.Label>
                                <div className="d-flex flex-wrap">
                                    {sizes?.map((s, index) => (
                                        <div key={index} onClick={() => setSelectedSize(s)} style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', margin: '5px', borderRadius: '4px', cursor: 'pointer', backgroundColor: size === s ? 'grey' : 'transparent' }}>
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" value={quantity} className="border border-dark" onChange={(e) => setQuantity(Number(e.target.value))} min={1} />
                            </Form.Group>

                            <motion.div className="mt-4" whileTap={{ scale: 0.95 }}>
                                <Button variant="primary" onClick={handleAddToCart} style={{ background: "linear-gradient(to right, #000000, #333333)" }} disabled={isInCart || loading} >
                                    <BsFillBagFill /> {isInCart ? 'Item in Cart' : loading ? 'Adding...' : 'Add to Cart'}
                                </Button>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} style={{ background: "linear-gradient(to right, #000000, #333333)" }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;