import httpService from './httpService';
import endpoints from './endpoints';
import { ProductType, SiteType } from '../../interface/intefaces';

export const apiGetProducts = (): Promise<ProductType[]> => httpService.get<ProductType[]>(endpoints.getProducts);
export const apiGetSites = (): Promise<SiteType[]> => httpService.get<SiteType[]>(endpoints.getSites);
