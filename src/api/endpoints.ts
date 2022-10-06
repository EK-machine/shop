const getProducts = 'http://localhost:3001/products';
const getProduct = (query: string) => `http://localhost:3001/products?title_like=${query}`;
const getUsers = 'http://localhost:3001/users';
const getUserById = (query: string) => `http://localhost:3001/users/${query}`;
const getErrorServerById = (query: string) => `http://localhost:3002/errors/${query}`;
const getErrorServer = 'http://localhost:3002/errors';

const endpoints = {
  getProducts,
  getProduct,
  getUsers,
  getUserById,
  getErrorServerById,
  getErrorServer,
};

export default endpoints;
