import womanIcon from 'Images/woman.svg';
import manIcon from 'Images/man.svg';
import jewlryIcon from 'Images/jewlry.svg';
import allIcon from 'Images/all.svg';
import electronicIcon from 'Images/electronic.svg';
import cartIcon from 'Images/cart.svg';
import likeIcon from 'Images/liked.svg';
import tolikeIcon from 'Images/tolike.svg';
import cardIcon from 'Images/creditCard.svg';
import loginIcon from 'Images/login.svg';
import passIcon from 'Images/password.svg';
import avaIcon from 'Images/avatar.svg';
import loadingIcon from 'Images/loading.svg';
import refresharrows from 'Images/refresharrows.svg';
import arrowIcon from 'Images/arrow.svg';

export const categoryIcons = [allIcon, manIcon, jewlryIcon, electronicIcon, womanIcon];

export const base = '/';
export const settings = 'settings';
export const cart = 'cart';
export const reviews = 'reviews';
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
export const toLike = tolikeIcon;
export const isliked = likeIcon;
export const btnLoading = loadingIcon;
export const arrow = arrowIcon;
