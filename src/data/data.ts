export const base = '/';
export const home = 'home';
export const cart = 'cart';
export const reviews = 'reviews';
export const products = 'products';
export const notFound = '*';

export const navigationLinks = [
  { name: 'home', link: base + home },
  { name: 'cart', link: base + cart },
  { name: 'reviews', link: base + reviews },
  { name: 'products', link: base + products },
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
