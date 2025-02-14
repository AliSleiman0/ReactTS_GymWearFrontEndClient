
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AuthProvider } from './Context/AuthContext';
import { WishlistProvider } from './Context/WishlistContext';
import { CartProvider } from './Context/CartContext';



function App() {

    return (
        <AuthProvider>
            <WishlistProvider>

                <CartProvider>
                    <RouterProvider router={router} />
                </CartProvider>

            </WishlistProvider>
        </AuthProvider>
    )
}
export default App
