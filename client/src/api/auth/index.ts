import { api } from './../index';
import * as models from 'models';

export const signIn = (model: models.ILoginModel) => api.post('/users/signin', model);
export const signUp = (model: models.IRegisterModel) => api.post('/users/signup', model);