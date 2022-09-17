import httpService from './httpService';
import endpoints from './endpoints';
import { ProductType, UserProfile } from '../interfaces/intefaces';

export const apiGetProducts = (): Promise<ProductType[]> => httpService.get<ProductType[]>(endpoints.getProducts);
export const apiGetProduct = (query: string): Promise<ProductType[]> =>
  httpService.get<ProductType[]>(endpoints.getProduct(query));

export const apiGetUsers = (): Promise<UserProfile[]> => httpService.get<UserProfile[]>(endpoints.getUsers);
export const apiGetUser = (query: string): Promise<UserProfile[]> =>
  httpService.get<UserProfile[]>(endpoints.getUser(query));
