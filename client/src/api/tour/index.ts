import { ITour } from '../../models';
import { api } from './../index';

export const createTour = (model: ITour) => api.post('/tour', model);
export const getTours = () => api.get('/tour');
export const getTour = (id: any) => api.get(`/tour/${id}`);
export const deleteTour = (id: any) => api.delete(`/tour/${id}`);
export const updateTour = (id: any, data: any) => api.patch(`/tour/${id}`, data);
export const getToursByUser = (userId: any) => api.get(`/tour/userTours/${userId}`);
export const getToursBySearch = (searchQuery: any) => api.get(`/tour/search?searchQuery=${searchQuery}`);
export const getToursByTag = (tag: any) => api.get(`/tour/tag/${tag}`);