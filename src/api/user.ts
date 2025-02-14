import api from './api';

// Define User DTO interfaces
export interface AddUserDTO {
    id: number;         // Added to match C# DTO
    name: string;
    email?: string;     // Made optional (string | undefined) since it's nullable in C#
}
export interface GetUserDTO {
    id: number;
    name: string;
    email: string;
}

// User API functions
export const getUsers = async (): Promise<GetUserDTO[]> => {
    const url = '/api/User';
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<GetUserDTO> => {
    const url = `/api/User/${id}`;
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw error;
    }
};

export const addUser = async (user: AddUserDTO): Promise<AddUserDTO> => {
    const url = '/api/User';
    try {
        const response = await api.post(url, user);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const updateUser = async (user: AddUserDTO): Promise<AddUserDTO> => {
    const url = '/api/User';
    try {
        const response = await api.put(url, user);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id: number): Promise<void> => {
    const url = `/api/User?id=${id}`;
    try {
        await api.delete(url);
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw error;
    }
};