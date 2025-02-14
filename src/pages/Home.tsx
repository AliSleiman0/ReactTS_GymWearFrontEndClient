
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Navbr from '../Components/Navbar';
import WelcomeBanner from '../Components/WelcomeBanner';

import CaourselCategories from '../Components/CustomCarousel';

import Footer from '../Components/Footer';
//import { GetCategoryDTO, getCategoriesByGender } from '../api/categories';
//import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




function Home() {

    //const [categoriesMen, setCategoriesMen] = useState<GetCategoryDTO[]>([]);
    //const [categoriesWomen, setCategoriesWomen] = useState<GetCategoryDTO[]>([]);

    //// Fetch categories on mount
    //useEffect(() => {
    //    const fetchCategories = async () => {
    //        try {
    //            const menCategories = await getCategoriesByGender(1);
    //            console.log(menCategories);
    //            const womenCategories = await getCategoriesByGender(2);
    //            setCategoriesMen(menCategories);
    //            setCategoriesWomen(womenCategories);
    //        } catch (error) {
    //            console.error("Error fetching categories:", error);
    //        }
    //    };

    //    fetchCategories();
    //}, []);


    const slideDataWomen = [
        { id: 1, imgsrc: '/hoodiesWomen.webp', name: 'Hoodies' },
        { id: 2, imgsrc: '/shirts.webp', name: 'Shirts' },
        { id: 6, imgsrc: '/leggings.webp', name: 'Leggings' },
        { id: 7, imgsrc: '/shorts.webp', name: 'Shorts' },
        { id: 8, imgsrc: '/sweatpantswomen.webp', name: 'Sweatpants' },

    ];
    const slideDataMen = [
        { id: 1, imgsrc: '/Hoodies.webp', name: 'Hoodies' },
        { id: 2, imgsrc: '/tanks.webp', name: 'Tanks' },
        { id: 6, imgsrc: '/shortsMen.webp', name: 'Shorts' },
        { id: 7, imgsrc: '/Pants.webp', name: 'Pants' },
        { id: 8, imgsrc: '/Tshirts.webp', name: 'Tshirts' },

    ];
    const navigate = useNavigate();
    return (
        <>

            <div className="full-screen-background">
                <Navbr />
                <WelcomeBanner />
            </div>
            <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.3)' }}>
                <div className="py-4 px-5 ">
                    <CaourselCategories onClick={() => navigate("/shopproducts/2")} slideData={slideDataWomen} headers={{ title: "Women's", subtitle: "Most Populer Right Now" }} />
                </div>
                <div className="py-4 px-5 pb-5">
                    <CaourselCategories onClick={() => navigate("/shopproducts/1")} slideData={slideDataMen} headers={{ title: "Men's", subtitle: "Trending Right Now" }} />
                </div>
            </div>
        

            <Footer />
        </>
    );
}
export default Home
