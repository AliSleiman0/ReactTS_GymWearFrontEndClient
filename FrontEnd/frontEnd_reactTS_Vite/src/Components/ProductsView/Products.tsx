
import React from "react"
import data from './productsData';
import Card from './Card';

import './Products.Module.css';

export interface Product {
   
    img: string;
    title: string;
    star: React.ReactNode; // Allow JSX elements
    reviews: string; // Adjust to string for "(123 reviews)"
    prevPrice: string | number;
    newPrice: string | number;
    company: string;
    color: string;
    category: string;
}
export default function Products() { 
    const filteredProducts: Product[] = data; 
    return(

        <section className="card-container">
            {filteredProducts.map(
                ({ img, title, star, reviews, prevPrice, newPrice }) => (
                    <Card
                        key={Math.random()}
                        img={img}
                        title={title}
                        star={star}
                        reviews={reviews}
                        prevPrice={prevPrice}
                        newPrice={newPrice}
                    />
                ))}
              
        </section>);
}