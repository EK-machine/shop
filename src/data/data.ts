import womanIcon from '../../public/woman.svg';
import manIcon from '../../public/man.svg';
import jewlryIcon from '../../public/jewlry.svg';
import allIcon from '../../public/all.svg';
import electronicIcon from '../../public/electronic.svg';
import cartIcon from '../../public/cart.svg';
import likeIcon from '../../public/liked.svg';
import cardIcon from '../../public/creditCard.svg';
import loginIcon from '../../public/login.svg';
import passIcon from '../../public/password.svg';
import avaIcon from '../../public/avatar.svg';
import refresharrows from '../../public/refresharrows.svg';

export const categoryIcons = [allIcon, manIcon, jewlryIcon, electronicIcon, womanIcon];

export const base = '/';
export const settings = 'settings';
export const cart = 'cart';
export const reviews = 'reviews';
export const reviewsmore = 'reviewsmore';
export const notFound = '*';

export const navigationLinks = [
  { name: 'cart', link: base + cart },
  { name: 'reviews', link: base + reviews },
];

export const errorMessages = {
  login: [
    '',
    'This field is required',
    'Login shall contain only latin letters and numbers',
    'This login is already taken',
  ],
  password: [
    '',
    'This field is required',
    'Min character count is 5',
    'Max character count is 16',
    'No special characters ($,%,/,@, etc...)',
  ],
  repeatpassword: [
    '',
    'This field is required',
    'Min character count is 5',
    'Max character count is 16',
    'No special characters ($,%,/,@, etc...)',
    "Does'n match the password",
  ],
};

export const regexp = {
  login: /^[a-zA-Z0-9]+$/,
  password: /^[a-zA-Z0-9]{5,16}$/,
  repeatpassword: /^[a-zA-Z0-9]{5,16}$/,
};

export const specCharacters = [
  ' ',
  '!',
  '”',
  '#',
  '$',
  '%',
  '&',
  '’',
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  ':',
  ';',
  '<',
  '=',
  '>',
  '?',
  '@',
  '[',
  '\\',
  ']',
  '^',
  '_',
  '`',
  '{',
  '|',
  '}',
  '~',
];

export const cartSideData = [
  {
    copy: 'your cart',
    icon: cartIcon,
  },
  {
    copy: 'liked',
    icon: likeIcon,
  },
  {
    copy: 'your orders',
    icon: cardIcon,
  },
];

export const setSideData = [
  {
    copy: 'avatar',
    icon: avaIcon,
  },
  {
    copy: 'login',
    icon: loginIcon,
  },
  {
    copy: 'password',
    icon: passIcon,
  },
];

export const newAva = avaIcon;
export const change = refresharrows;
