import api from './api';

export interface GetCategoryDTO {
     id:number
     name:string
     imgsrc:string
    }
export interface SetCategoryDTO{ 
Name: string
imgsrc: string
}
export enum Gender {
    Male = 1,
    Female = 2
}


export const getCategories = async (): Promise<GetCategoryDTO[]> => {
    const url = `/Category`;
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
export const getCategoriesByGender = async (gender:Gender): Promise<GetCategoryDTO[]> => {
    const url = `/Category/ProductsByGender?gender=${gender}`;
    try {
        
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};