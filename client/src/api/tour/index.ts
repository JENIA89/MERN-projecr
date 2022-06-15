import { ITour } from 'models';
import { api } from './../index';

export const createTour = (model: ITour) => api.post('/tour', model);
export const getTours = () => api.get('/tour');