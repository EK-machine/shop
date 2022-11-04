import { InitialState, ProductType, UserCartItem, UserLikedItem, UserOrder, UserProfile } from 'Interfaces/intefaces';

const initialState: InitialState = {
  allProductsInitialState: {
    productsRequest: [],
    products: [],
    displayProducts: [],
    debounceProductsRequest: '',
    productsError: '',
    product: {} as ProductType,
  },
  commonInitialState: {
    logged: false,
  },
  errorInitialState: {
    errors: [],
    error: '',
  },
  headingInitialState: {
    heading: '',
  },
  modalInitialState: {
    content: '',
    isOpen: false,
  },
  pendingInitialState: {
    pending: [
      { id: 0, pending: false },
      { id: 1, pending: false },
      { id: 2, pending: false },
      { id: 3, pending: false },
      { id: 4, pending: false },
      { id: 5, pending: false },
      { id: 6, pending: false },
      { id: 7, pending: false },
      { id: 8, pending: false },
      { id: 9, pending: false },
      { id: 10, pending: false },
      { id: 11, pending: false },
      { id: 12, pending: false },
      { id: 13, pending: false },
      { id: 14, pending: false },
      { id: 15, pending: false },
      { id: 16, pending: false },
      { id: 17, pending: false },
      { id: 18, pending: false },
      { id: 19, pending: false },
      { id: 20, pending: false },
    ],
  },
  userInitialState: {
    users: [],
    user: {} as UserProfile,
    userRequest: {} as UserProfile,
    avatarRequest: {} as { id: number; imgUrl: string; prodId: number },
    loginRequest: {} as { id: number; login: string; prodId: number },
    passwordRequest: {} as { id: number; password: string; prodId: number },
    addToCartRequest: {} as { id: number; cart: UserCartItem[]; title: string; prodId: number },
    deleteFromCartRequest: {} as { id: number; cart: UserCartItem[]; title: string; prodId: number },
    changeQuantityRequest: {} as { id: number; cart: UserCartItem[] },
    setLikeRequest: {} as { id: number; liked: UserLikedItem[]; title: string },
    unsetLikeRequest: {} as { id: number; liked: UserLikedItem[]; title: string },
    setOrderRequest: {} as { id: number; orders: UserOrder[]; prodId: number },
    deleteOrderRequest: {} as { id: number; orders: UserOrder[]; prodId: number },
    usetCart: [],
  },
};

export default initialState;
