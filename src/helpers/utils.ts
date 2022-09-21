/* eslint-disable no-else-return */
import { UserOrder } from '../interfaces/intefaces';

/* eslint-disable consistent-return */
export const getModalTitle = (val: string) => {
  if (val === 'login') {
    return 'LOG IN';
  }
  if (val === 'register') {
    return 'CREATE NEW ACCOUNT';
  }
  if (val === 'product') {
    return 'PRODUCT DESCRIPTION:';
  }
};

export const getDate = (val: string) => {
  const current = new Date().getTime();
  const date = new Date(val);
  const dateTime = date.getTime();
  const deliv = current > dateTime;
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const strDate = `${dateMonth}/${dateDate}/${dateYear}`;
  return { strDate, deliv };
};

const compareTime = (val: string) => {
  const current = new Date().getTime();
  const given = new Date(val).getTime();
  if (current > given) {
    return true;
  }
  return false;
};

export const sortByDate = (orders: UserOrder[]) => {
  const delivered: UserOrder[] = [];
  const awaited: UserOrder[] = [];
  orders &&
    orders.length > 0 &&
    orders.forEach((item) => {
      const val = compareTime(item.dateTill);
      if (val) {
        delivered.push(item);
      } else {
        awaited.push(item);
      }
    });
  if (delivered.length === 0) {
    return awaited;
  } else if (awaited.length === 0) {
    return delivered;
  } else {
    const newOrder = awaited.concat(delivered);
    return newOrder;
  }
};

export const disablePastDates = () => {
  const today = new Date();
  const dd = String(today.getDate() + 1).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

export const setTitle = (val: string, add?: boolean) => {
  if (val.toLocaleLowerCase() === `men's clothing`) {
    return 'Products for men';
  }
  if (val.toLocaleLowerCase() === `jewelry`) {
    return 'Jewelry products';
  }
  if (val.toLocaleLowerCase() === `electronics`) {
    return 'Electronics products';
  }
  if (val.toLocaleLowerCase() === `women's clothing`) {
    return 'Products for women';
  }
  if (val.toLocaleLowerCase() === 'all products') {
    return 'All products';
  }
  if (val.toLocaleLowerCase() === 'your cart') {
    return 'Your cart';
  }
  if (val.toLocaleLowerCase() === 'liked') {
    return 'Products you like';
  }
  if (val.toLocaleLowerCase() === 'your orders') {
    return 'Your orders';
  }
  if (val.toLocaleLowerCase() === 'login') {
    return 'Change your login';
  }
  if (val.toLocaleLowerCase() === 'password') {
    return 'Change your password';
  }
  if (val.toLocaleLowerCase() === 'avatar' && add) {
    return 'Change your avatar';
  }
  if (val.toLocaleLowerCase() === 'avatar' && !add) {
    return 'Set your avatar';
  }
  return '';
};

export const locationProducts = (val: string): boolean => {
  if (val.includes('settings')) {
    return false;
  }
  if (val.includes('cart')) {
    return false;
  }
  if (val.includes('reviews')) {
    return false;
  }
  if (val.includes('reviewsmore')) {
    return false;
  }
  return true;
};
