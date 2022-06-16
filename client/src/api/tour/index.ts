import { ITour } from 'models';
import { api } from './../index';

export const createTour = (model: ITour) => api.post('/tour', model);
export const getTours = () => api.get('/tour');
export const getTour = (id: any) => api.get(`/tour/${id}`);