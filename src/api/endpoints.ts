const getProducts = 'http://localhost:3001/products';
const getProduct = (query: string) => `http://localhost:3001/products?title_like=${query}`;
const getUsers = 'http://localhost:3001/users';

const endpoints = {
  getProducts,
  getProduct,
  getUsers,
};

export default endpoints;
