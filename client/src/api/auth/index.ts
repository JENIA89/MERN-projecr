import { api } from './../index';
import * as models from 'models';

export const signIn = (model: models.ILoginModel) => api.post('/users/sigin', model)