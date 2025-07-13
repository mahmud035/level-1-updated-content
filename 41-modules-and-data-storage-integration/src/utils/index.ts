import { IBottle } from '../types';

export const retrieveCart = () =>
  JSON.parse(localStorage.getItem('shoppingCart') || '[]') as IBottle[];

export const storeCart = (data: IBottle[]) =>
  localStorage.setItem('shoppingCart', JSON.stringify(data));
