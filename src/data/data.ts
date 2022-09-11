import one from '../../public/1.svg';
import two from '../../public/2.svg';
import three from '../../public/3.svg';
import four from '../../public/4.svg';
import five from '../../public/5.svg';

export const base = '/';
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

export const categoryIcons = [one, two, three, four, five];
