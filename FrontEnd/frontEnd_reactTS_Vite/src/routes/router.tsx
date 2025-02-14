import Home from "../pages/Home";
import { createBrowserRouter } from 'react-router-dom';
import { Signup } from "../pages/Signup";
import ShopProducts from "../pages/ShopProducts";
import { getCategories } from "../api/categories";


const Categories = await getCategories();
//import { useParams } from "react-router-dom";
import { Signin } from "../pages/Signin";
import OurTeam from "../pages/ OurTeam";
import PrivacyPolicy from "../pages/ PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import UserAccount from "../pages/UserAccount";
import UserOrders from "../pages/UserOrders";
import Wishlist from "../pages/Wishlist";
import UserCart from "../pages/UserCart";
import ProceedToCheckout from "../pages/ProceedToCheckout";
import OrderConfirmation from "../pages/OrderConfirmation";
//const ShopProductsWrapper = () => {
//    const { gender } = useParams();
//    return <ShopProducts categories={Categories} gender={Number(gender)} />;
//};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'shopproducts/:gender',
        element: <ShopProducts categories={Categories} />,
    },
    {
        path: 'auth',
        children: [
            { path: 'signin', element: <Signin /> },
            { path: 'signup', element: <Signup /> },
        ],
    },
    {
        path: 'legal',
        children: [
            { path: 'PrivacyPolicy', element: <PrivacyPolicy /> },
            { path: 'TermsOfService', element: <TermsOfService /> },
        ],
    },
    {
        path: 'about',
        children: [
            { path: 'OurTeam', element: <OurTeam /> },
        ],
    },
    {
        path: 'user',
        children: [
            { path: 'Wishlist', element: <Wishlist /> },
            { path: 'UserOrders', element: <UserOrders /> },
            { path: 'UserAccount', element: <UserAccount /> },
            { path: 'UserCart', element: <UserCart /> },
        ],
    },
    {
        path: '/checkout',
        element: <ProceedToCheckout />,
    },
    {
        path: '/user/OrderConfirmation/:orderId',
        element: <OrderConfirmation />, // Create this component
    }
]);