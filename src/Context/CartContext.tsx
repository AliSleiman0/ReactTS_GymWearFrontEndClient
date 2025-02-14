// contexts/CartContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getCartByUserId, getCartItemsByCartId } from '../api/cart';
import { useAuth } from './AuthContext';

interface CartContextType {
    cartCount: number;
    refreshCart: () => void;
}

const CartContext = createContext<CartContextType>({
    cartCount: 0,
    refreshCart: () => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const refreshCart = () => setRefreshTrigger(prev => prev + 1);

    return (
        <CartContext.Provider value={{ cartCount, refreshCart }}>
            <CartDataFetcher refreshTrigger={refreshTrigger} setCartCount={setCartCount}>
                {children}
            </CartDataFetcher>
        </CartContext.Provider>
    );
};

const CartDataFetcher = ({ refreshTrigger, setCartCount, children }: any) => {
    const { user, accessToken } = useAuth();

    useEffect(() => {
        const fetchCart = async () => {
            if (!user?.id) return;

            try {
                const cart = await getCartByUserId(Number(user.id));
                if (!cart?.id) return;

                const cartItems = await getCartItemsByCartId(cart.id);
                setCartCount(cartItems.length);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, [user, accessToken, refreshTrigger]);

    return children;
};

export const useCart = () => useContext(CartContext);