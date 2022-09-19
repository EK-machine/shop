import httpService from './httpService';
import endpoints from './endpoints';
import { ProductType, UserProfile } from '../interfaces/intefaces';

export const apiGetProducts = (): Promise<ProductType[]> => httpService.get<ProductType[]>(endpoints.getProducts);
export const apiGetProduct = (query: string): Promise<ProductType[]> =>
  httpService.get<ProductType[]>(endpoints.getProduct(query));

// in saga
export const apiGetUsers = (): Promise<UserProfile[]> => httpService.get<UserProfile[]>(endpoints.getUsers);
export const apiPostUser = (newUser: UserProfile): Promise<UserProfile[]> =>
  httpService.post<UserProfile[]>(endpoints.getUsers, newUser);
export const apiPatchUser = (
  query: string,
  body: { imgUrl: string } | { login: string } | { password: string },
): Promise<void> => httpService.patch<void>(endpoints.getUserById(query), body);
