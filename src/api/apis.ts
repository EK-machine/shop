import httpService from './httpService';
import endpoints from './endpoints';
import { ProductType } from '../interface/intefaces';

export const apiGetProducts = (): Promise<ProductType[]> => httpService.get<ProductType[]>(endpoints.getProducts);
export const rr = 1;
