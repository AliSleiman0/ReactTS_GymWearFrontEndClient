import React, { createContext, useContext, useEffect, useState } from 'react';
interface WishlistContextType {
    wishlist: number[];
    addToWishlist: (id: number) => void;
    removeFromWishlist: (productId: string | number) => void;
    isInWishlist: (productId: string | number) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    isInWishlist: () => false,
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<number[]>(() => {
        // Initialize from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('wishlist');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    // Sync with localStorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (id: number) => {
        setWishlist(prev => [...prev, id]);
    };

    const removeFromWishlist = (productId: string | number) => {
        setWishlist(prev => prev.filter(id => id !== productId));
    };

    const isInWishlist = (productId: string | number) => {
        return wishlist.some(id => id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);