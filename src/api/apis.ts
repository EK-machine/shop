import httpService from './httpService';
import endpoints from './endpoints';
import { ProductType, UserCartItem, UserLikedItem, UserOrder, UserProfile } from '../interfaces/intefaces';

export const apiGetProduct = (query: string): Promise<ProductType[]> =>
  httpService.get<ProductType[]>(endpoints.getProduct(query));

export const apiGetProducts = (): Promise<ProductType[]> => httpService.get<ProductType[]>(endpoints.getProducts);

export const apiGetUsers = (): Promise<UserProfile[]> => httpService.get<UserProfile[]>(endpoints.getUsers);

export const apiPostUser = (newUser: UserProfile): Promise<UserProfile[]> =>
  httpService.post<UserProfile[]>(endpoints.getUsers, newUser);

export const apiPatchUser = (
  query: string,
  body:
    | { imgUrl: string }
    | { login: string }
    | { password: string }
    | { cart: UserCartItem[] }
    | { liked: UserLikedItem[] }
    | { orders: UserOrder[] },
): Promise<void> => httpService.patch<void>(endpoints.getUserById(query), body);

export const apiPatchError = (id: string, errors: { errors: string[] }) =>
  httpService.patch<{ errors: string[] }>(endpoints.getErrorServerById(id), errors);

export const apiPostError = (errors: { errors: string[] }) =>
  httpService.post<{ errors: string[] }>(endpoints.getErrorServer, errors);

export const apiGetError = (id: string): Promise<{ errors: string[] }> =>
  httpService.get<{ errors: string[] }>(endpoints.getErrorServerById(id));
