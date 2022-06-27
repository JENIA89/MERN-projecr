import { ITour } from '../../models';
import { api } from './../index';

export const createTour = (model: ITour) => api.post('/tour', model);
export const getTours = (page: any) => api.get(`/tour?page=${page}`);
export const getTour = (id: any) => api.get(`/tour/${id}`);
export const deleteTour = (id: string) => api.delete(`/tour/${id}`);
export const updateTour = (id: any, updateTourData: any) => api.patch(`/tour/${id}`, updateTourData);
export const getToursByUser = (userId: string) => api.get(`/tour/userTours/${userId}`);
export const getToursBySearch = (searchQuery: string) => api.get(`/tour/search?searchQuery=${searchQuery}`);
export const getToursByTag = (tag: string) => api.get(`/tour/tag/${tag}`);
export const likeTour = (id: string) => api.patch(`/tour/like/${id}`);