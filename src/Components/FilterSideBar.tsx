


import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { motion } from "framer-motion";
import { GetCategoryDTO } from "../api/categories";
interface FilterSideBarProps {
    handleInputChange: (value: string) => void;
    handleColorChange: (color: string, isChecked: boolean) => void;
    handleSortAsc: () => void;
    handleSortDesc: () => void;
    handleSizeChange: (size: string, isChecked: boolean) => void;
    handleCategoryChange: (category: string, isChecked: boolean) => void;
    Title: string;
    Categories: GetCategoryDTO[];
    ProductsNumber: number;

}

const FilterSideBar: React.FC<FilterSideBarProps> = ({ handleInputChange, handleColorChange, handleSortAsc, handleSortDesc, handleSizeChange, handleCategoryChange, Title, Categories, ProductsNumber }) => {
    //design states
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");

    // Detect screen size
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 992;
            setIsMobile(mobile);
            setIsOpen(!mobile); // Open on desktop, close on mobile
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-close sidebar on mobile when screen resizes to desktop
    useEffect(() => {
        if (!isMobile) setIsOpen(true);
    }, [isMobile]);



    const toggleSection = (section: string): void => {
        setActiveSection((prev) => (prev === section ? "" : section));
    };

    const dropdownVariants = {
        collapsed: { height: 0, opacity: 0, overflow: "hidden" },
        expanded: { height: "auto", opacity: 1 },
    };
    ////design states ends here


    return (


        <>
            {/* Mobile Toggle Button */}
            {isMobile && (
                <>
                    {isMobile ? <><br /><br /><br /></> : null}
                <Button
                    variant="primary"
                    onClick={() => setIsOpen(!isOpen)}
                    className="position-fixed d-lg-none mt-5"
                    style={{
                        zIndex: 1001,
                        top: '1rem',
                        left: '1rem',
                    }}
                >
                    {isOpen ? '✕ Close' : '☰ Filters'}
                    </Button>

                    </>
            )}

            {/* Sidebar Content */}
            <motion.div
                className="p-3 product-filter pl-4 rounded"
                style={{
                    minHeight: "100vh",
                    position: isMobile ? 'fixed' : 'sticky',
                    top: '1rem',
                    left: 0,
                    width: isMobile ? '280px' : '100%',
                    zIndex: 1000,
                    backgroundColor: '#f8f9fa',
                    marginRight: '1rem',
                    height: isMobile ? '100vh' : 'auto',
                    overflowY: 'auto'
                }}
                initial={false}

                animate={{
                    x: isMobile ? (isOpen ? 0 : -300) : 0,
                    boxShadow: isMobile && isOpen ? '4px 0 15px rgba(0,0,0,0.1)' : 'none',
                    opacity: isMobile ? 1 : 1 // Fix for desktop flickering
                }}
                transition={{ type: 'tween', duration: 0.3 }}
            >
                {isMobile ? <><br /><br /><br /></> : null}

                {/* Header */}
                <h5>{Title}'s</h5>
                <h1 className="fw-bold">PRODUCTS</h1>
                <p className="text-muted">{ProductsNumber}</p>

                <hr />
                {/* Search Bar */}
                <Form.Group className="mt-3">
                    <Form.Control
                        type="text"
                        placeholder="Search products in this page..."

                        onChange={(e) => handleInputChange(e.target.value)}

                    />
                </Form.Group>
                <hr />
                {/* Filters */}
                <div className="mt-4">
                    {/* Sort By */}
                    <div className="filter-section">
                        <div
                            className="d-flex justify-content-between align-items-center"
                            onClick={() => toggleSection("sort")}
                            style={{ cursor: "pointer" }}
                        >
                            <h6>Sort By: Price</h6>
                            <Button variant="link" style={{ textDecoration: "none" }} className="p-0">
                                {activeSection === "sort" ? "x" : "+"}
                            </Button>
                        </div>
                        <motion.div

                            initial="collapsed"
                            animate={activeSection === "sort" ? "expanded" : "collapsed"}
                            exit="collapsed"
                            variants={dropdownVariants}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mt-2 pl-2">
                                <Form.Check type="radio" name="sort" label="Price: High-Low" onChange={handleSortDesc} />
                                <Form.Check type="radio" name="sort" label="Price: Low-High" onChange={handleSortAsc} />
                            </div>
                        </motion.div>
                    </div>

                    <hr />
                    {/* Color */}
                    <div className="filter-section">
                        <div
                            className="d-flex justify-content-between align-items-center"
                            onClick={() => toggleSection("color")}
                            style={{ cursor: "pointer" }}
                        >
                            <h6>Color</h6>
                            <Button variant="link" style={{ textDecoration: "none" }} className="p-0">
                                {activeSection === "color" ? "x" : "+"}
                            </Button>
                        </div>
                        <motion.div
                            initial="collapsed"
                            animate={activeSection === "color" ? "expanded" : "collapsed"}
                            exit="collapsed"
                            variants={dropdownVariants}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mt-2 ml-2 d-flex flex-wrap gap-2">
                                {[
                                    "black",
                                    "blue",
                                    "brown",
                                    "green",
                                    "grey",
                                    "orange",
                                    "pink",
                                    "purple",
                                    "red",
                                    "white",
                                    "yellow",
                                ].map((color) => (
                                    <label
                                        key={color}
                                        className="color-box-wrapper"
                                        style={{ display: "inline-block", cursor: "pointer" }}
                                    >
                                        <input
                                            type="checkbox"

                                            name="color"
                                            value={color}
                                            style={{ display: "none" }}
                                            onChange={(e) => handleColorChange(color, e.target.checked)}
                                        />
                                        <div
                                            className={`color-box ${color}`}
                                            style={{
                                                backgroundColor: color,
                                                width: "30px",
                                                height: "30px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                transition: "transform 0.2s ease, border-color 0.2s ease",
                                            }}
                                        ></div>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    </div>


                    <hr />

                    {/* Size */}
                    <div className="filter-section ">
                        <div
                            className="d-flex justify-content-between align-items-center"
                            onClick={() => toggleSection("size")}
                            style={{ cursor: "pointer" }}
                        >
                            <h6>Size</h6>
                            <Button variant="link" style={{ textDecoration: "none" }} className="p-0">
                                {activeSection === "size" ? "x" : "+"}
                            </Button>
                        </div>
                        <motion.div
                            initial="collapsed"
                            animate={activeSection === "size" ? "expanded" : "collapsed"}
                            exit="collapsed"
                            variants={dropdownVariants}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mt-2 pl-2 d-flex flex-wrap gap-2">
                                {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                    <Form.Check
                                        key={size}
                                        type="checkbox"
                                        id={`size-${size}`}
                                        label={size}
                                        className="mb-2"
                                        onChange={(e) => handleSizeChange(size, e.target.checked)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <hr />

                    {/* Product Type */}
                    <div className="filter-section">
                        <div
                            className="d-flex justify-content-between align-items-center"
                            onClick={() => toggleSection("productType")}
                            style={{ cursor: "pointer" }}
                        >
                            <h6>Product Type</h6>
                            <Button variant="link" style={{ textDecoration: "none" }} className="p-0">
                                {activeSection === "productType" ? "x" : "+"}
                            </Button>
                        </div>
                        <motion.div
                            initial="collapsed"
                            animate={activeSection === "productType" ? "expanded" : "collapsed"}
                            exit="collapsed"
                            variants={dropdownVariants}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mt-2 ml-2">
                                {Categories.map((item) => (
                                    <Form.Check
                                        key={item.id}
                                        type="checkbox"
                                        label={item.name}
                                        className="mb-2 text-uppercase"
                                        onChange={(e) => handleCategoryChange(item.name, e.target.checked)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

            </motion.div>
            {isMobile && isOpen && (
                <div
                    className="position-fixed bg-dark opacity-50"
                    style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                    }}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

export default FilterSideBar