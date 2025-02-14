import api from './api';

// Cart Interfaces
export interface GetCartDTO {
    id: number;
    userId: number;
    createdAt: string;
    cartItems: GetCartItemDTO[];
}

export interface GetCartItemDTO {
    id: number;
    productId: number;
    cartId: number;
    productName: string;
    quantity: number;
    price: number;
    imgSrc: string;
    color: string;
    size: string;
}

export interface SetCartItemDTO {
    cartId: number;
    productId: number;
    quantity: number;
    price: number;
    color: string;
    size: string;
}


// Cart Service
export const getCartByUserId = async (userId: number): Promise<GetCartDTO> => {
    const url = `/cart/${userId}`;
    try {
        const response = await api.get<GetCartDTO>(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching cart for user ${userId}:`, error);
        throw error;
    }
};

export const clearCart = async (cartId: number): Promise<void> => {
    const url = `/cart?cartId=${cartId}`;
    try {
        await api.put(url);
    } catch (error) {
        console.error(`Error clearing cart ${cartId}:`, error);
        throw error;
    }
};

// Cart Item Service
export const getCartItemsByCartId = async (cartId: number): Promise<GetCartItemDTO[]> => {
    const url = `/cartitem/${cartId}`;
    try {
        const response = await api.get<GetCartItemDTO[]>(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching items for cart ${cartId}:`, error);
        throw error;
    }
};

export const addCartItem = async (item: SetCartItemDTO): Promise<GetCartItemDTO> => {
    const url = `/cartitem`;
    try {
        const response = await api.post<GetCartItemDTO>(url, item);
        return response.data;
    } catch (error) {
        console.error("Error adding cart item:", error);
        throw error;
    }
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
    const url = `/cartitem/${cartItemId}`;
    try {
        await api.delete(url);
        
    } catch (error) {
        console.error(`Error deleting cart item ${cartItemId}:`, error);
        throw error;
    }
};
export const updateCartItem = async (id: number, item: SetCartItemDTO): Promise<GetCartItemDTO> => {
    const url = `/cartitem/${id}`;
    try {
        const response = await api.put<GetCartItemDTO>(url, item);
        return response.data;
    } catch (error) {
        console.error(`Error updating cart item ${id}:`, error);
        throw error;
    }
};