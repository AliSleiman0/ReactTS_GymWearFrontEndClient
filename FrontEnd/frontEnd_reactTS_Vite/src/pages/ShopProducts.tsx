import { useEffect, useState } from "react";
import CardsGrid from "../Components/CardsGrid";
import FilterSideBar from "../Components/FilterSideBar";
import Navbr from "../Components/Navbar";
import ProductModal from "../Components/ProductModal";
import Footer from "../Components/Footer";
import { ProductCardProps } from "../Components/ProductCard";
import { ProductCardDTO, getProductsGender } from "../api/product";
import { GetCategoryDTO } from "../api/categories";
import { useLocation, useParams } from "react-router-dom";

export interface Card {
    id: number;
    background: string;
    title: string;
    oldPrice: number;
    newPrice: number;
    colors: string[];
    sizes: string[];
    category: string;
}
export interface ShopProductsProp {
    categories: GetCategoryDTO[];
}

const ShopProducts: React.FC<ShopProductsProp> = ({ categories}) => {
    // product data
    const { gender } = useParams(); 
    const [genderProducts, setGenderProducts] = useState<ProductCardDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [modalShow, setModalShow] = useState<boolean>(false);

    // modal and filtering
    const [modalCardData, setModalCardData] = useState<ProductCardDTO>(genderProducts[0]);
    const [filteredItems, setFilteredData] = useState<ProductCardDTO[]>(genderProducts);
    const [queryString, setQueryString] = useState("");
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // cart and favorites
    const [cart, setCart] = useState<ProductCardProps[]>([]);
   

    // fetch products by gender
    const fetchProductsByGender = async () => {
        try {
            setLoading(true);
            setError(null);
            const genderFilteredProducts = await getProductsGender(gender);
            setGenderProducts(genderFilteredProducts);
        } catch (error) {
            setError("Error fetching products by gender.");
        } finally {
            setLoading(false);
        }
    };

    // Handle card click to show modal
    const handleCardClick = (id: number) => {
        if (!id) {
            console.error("handleCardClick received undefined id");
            return;
        }
        setModalShow(true);

        const clickedCard = updatedArray.find(card => card.id === id);
        if (!clickedCard) {
            console.error(`No card found with id: ${id}`);
            return;
        }
        setModalCardData(clickedCard);
    };

    // insert click handler to all products objects, it could be needed
    const updatedArray = genderProducts.map(obj => ({
        ...obj,
        handleCardClick: handleCardClick
    }));

    // handle changes for cart and favorites
    const handleAddToCart = (product: ProductCardProps) => {
        setCart(prev => {
            if (prev.some(item => item.id === product.id)) {
                return prev.filter(item => item.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    };

    

    // Handle filter input changes
    const handleInputChange = (value: string) => setQueryString(value.toLowerCase());

    const handleCategoryChange = (category: string, isChecked: boolean) => {
        setSelectedCategories(prevCategories =>
            isChecked ? [...prevCategories, category] : prevCategories.filter(selectedCategory => selectedCategory !== category)
        );
    };

    const handleSizeChange = (size: string, isChecked: boolean) => {
        setSelectedSizes(prevSizes =>
            isChecked ? [...prevSizes, size] : prevSizes.filter(selectedSize => selectedSize !== size)
        );
    };

    const handleColorChange = (color: string, isChecked: boolean) => {
        setSelectedColors(prevColors =>
            isChecked ? [...prevColors, color] : prevColors.filter(selectedColor => selectedColor !== color)
        );
    };

    const handleSortAsc = () => setSortOrder("asc");
    const handleSortDesc = () => setSortOrder("desc");

    // Filter and sort products based on selected criteria
    useEffect(() => {
        let updatedItems = genderProducts;

        // Filter by queryString (title search)
        if (queryString) {
            updatedItems = updatedItems.filter(item => item.title.toLowerCase().includes(queryString));
        }

        // Filter by selectedColors
        if (selectedColors.length > 0) {
            updatedItems = updatedItems.filter(item => selectedColors.some(color => item.colors?.includes(color)));
        }

        // Filter by selectedSizes
        if (selectedSizes.length > 0) {
            updatedItems = updatedItems.filter(item => selectedSizes.some(size => item.sizes?.includes(size)));
        }

        // Filter by selectedCategories
        if (selectedCategories.length > 0) {
            updatedItems = updatedItems.filter(item => selectedCategories.some(selectedCategory => item.category?.includes(selectedCategory)));
        }

        // Apply sorting
        if (sortOrder === "asc") {
            updatedItems = [...updatedItems].sort((a, b) => a.newPrice - b.newPrice);
        } else if (sortOrder === "desc") {
            updatedItems = [...updatedItems].sort((a, b) => b.newPrice - a.newPrice);
        }

        setFilteredData(updatedItems);
    }, [queryString, selectedColors, sortOrder, selectedSizes, selectedCategories, genderProducts]);

    // Fetch products on component mount
    const location = useLocation(); // Get current URL

    useEffect(() => {
        fetchProductsByGender();
    }, [location]); // Dependency on URL changes

    return (
        <div className="pt-3" style={{ backgroundColor: 'rgba(128, 128, 128, 0.3)', height: "100%", width: "100%" }}>
            <Navbr />
            <div className="p-3 ml-0" style={{ display: "flex", marginTop: "3rem", minHeight: "100vh" }}>
                <FilterSideBar
                    handleInputChange={handleInputChange}
                    handleColorChange={handleColorChange}
                    handleSortAsc={handleSortAsc}
                    handleSortDesc={handleSortDesc}
                    handleSizeChange={handleSizeChange}
                    handleCategoryChange={handleCategoryChange}
                    Title={gender == 1 ? "MEN" : "WOMEN"}
                    Categories={categories}
                    ProductsNumber={genderProducts.length }
                />
                {loading && <p>Loading products...</p>}
                {!loading && genderProducts.length === 0 && <p>No products found.</p>}
                <CardsGrid
                    cardData={filteredItems}
                    handleCardClick={handleCardClick}
                   
                    handleAddToCart={handleAddToCart}
                />
            </div>

            <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalCardData={modalCardData}
            />
            <Footer />
        </div>
    );
}
export default ShopProducts;

