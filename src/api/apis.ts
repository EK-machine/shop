import httpService from './httpService';
import endpoints from './endpoints';
import { ProductType } from '../interfaces/intefaces';

export const apiGetProducts = (): Promise<ProductType[]> => httpService.get<ProductType[]>(endpoints.getProducts);
export const apiGetProduct = (query: string): Promise<ProductType[]> =>
  httpService.get<ProductType[]>(endpoints.getProduct(query));

export const rr = 1;
