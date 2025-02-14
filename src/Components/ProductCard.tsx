
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { useState } from 'react';

import { WishlistButton } from './WishlistButton';

// ProductCard Component
// Define props for ProductCard
export interface ProductCardProps {
    id: number;
    title: string;
    oldPrice: number;
    newPrice: number;
    background: string;
}

// ProductCard Component

const Card = ({ id, background, title, oldPrice, newPrice}: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.section
            className="card"
            data-id={id}
            whileHover={{ scale: 1.05 }}
            style={{ position: "relative", cursor: "pointer" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={background} alt={title} className="card-img" />
            <div className="card-details">
                <h3 className="card-title">{title}</h3>
            </div>

            {isHovered && (
                <motion.div
                    className="card-hover-bar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "#f8f9fa",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="card-info">
                        <section className="card-price">
                            <div>
                                <del style={{ color: "red" }}>${oldPrice.toFixed(2)}</del> ${newPrice.toFixed(2)}

                            </div>
                        </section>
                    </div>

                    <div className="card-actions">
                       
                        <WishlistButton id={id}/>
                        
                    </div>
                </motion.div>
            )}
        </motion.section>
    );
};

export default Card;