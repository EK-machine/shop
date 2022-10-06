import React, { ReactNode } from 'react';

export interface ProductType {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface UserLikedItem extends ProductType {
  liked: boolean;
}

export interface UserCartItem extends ProductType {
  quantity: number;
}

export interface PendingItem {
  id: number;
  pending: boolean;
}

export interface PendingState {
  pending: PendingItem[];
}

export interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  productCategory?: string;
}

export interface HeaderProps {
  productCategory?: string;
}

export interface MostSliderProps {
  products: ProductType[];
  getSelected: (title: string) => void;
  openModal: () => void;
}

export interface MostSlideProps {
  title: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  addAction?: (val: string) => void;
}

export interface UserOrder {
  dateTill: string;
  id: number;
  items: UserCartItem[];
}

export interface OrderItemProps extends UserOrder {
  deleteOrder?: (id: number) => void;
}

export interface ModalProductProps {
  product: ProductType;
  text?: string;
  logged: boolean;
  liked?: boolean;
  like?: () => void;
}

export interface UserProfile {
  login: string;
  password: string;
  id: number;
  imgUrl: string;
  cart: UserCartItem[];
  orders: UserOrder[];
  liked: UserLikedItem[];
}

export interface ProductsContainerProps {
  toDisplay: ProductType[];
}

export interface UserType {
  login: string;
  password: string;
}

export interface CustomerProps {
  img: string;
  name: string;
  reply: string;
}

export interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  disabled?: boolean;
  underlined?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  addAction?: (val: string) => void;
  image?: string;
  usual?: boolean;
  product?: boolean;
  login?: boolean;
  categorySide?: boolean;
  cartSide?: boolean;
  activeBtn?: boolean;
  like?: () => void;
  liked?: boolean;
  loading?: boolean;
  pending?: boolean;
}

export interface ModalProps {
  anchor: 'left' | 'top' | 'right' | 'bottom';
  open: boolean;
  crossButton?: boolean;
  toggleModal: (isOpen: boolean) => () => void;
  extraClassName?: string;
  children: ReactNode;
  logged: boolean;
  modalContent: string;
  title?: string;
  addRemove?: () => void;
  pending?: boolean;
}

export interface ModalRegisterLogin {
  text?: string;
}

export interface FormErrors {
  login?: string | undefined;
  password?: string | undefined;
  repeatpassword?: string | undefined;
}

export interface ValidateLoginData {
  login: string;
  password: string;
}

export interface ProductLineProps {
  title: string;
  getSelected: (title: string) => void;
}

export interface ValidateRegisterData {
  login: string;
  password: string;
  repeatpassword: string;
}

export interface RegExps {
  login: RegExp;
  password: RegExp;
  repeatpassword: RegExp;
}

export interface InputProps {
  forId: string;
  type: string;
  title: string;
  value: string | ProductType[];
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  requiredMark?: boolean;
  error?: FormErrors;
  setError?: React.Dispatch<React.SetStateAction<FormErrors>>;
  addData?: string;
  placeholder?: string;
  addSetData?: React.Dispatch<React.SetStateAction<string>>;
  content?: string;
}

export interface StarRateProps {
  rating: number;
}

export interface SidebarProps {
  filterByCategory?: (title: string) => void;
  categories?: string[];
  products?: boolean;
  cart?: boolean;
  settings?: boolean;
  active?: number;
}

export interface CommonStateType {
  loading: boolean;
  logged: boolean;
}

export interface LikedItemProps {
  image: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  addAction?: (val: string) => void;
  like?: (val: string) => void;
}

export interface CartItemProps {
  image: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  addAction?: (val: string) => void;
  like?: (val: string) => void;
  quantity: number;
  price: number;
  id: number;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface AllProductsState {
  productsRequest: ProductType[];
  products: ProductType[];
  displayProducts: ProductType[];
  debounceProductsRequest: string;
  productsError: string;
  product: ProductType;
}

export interface UsersState {
  users: UserProfile[];
  user: UserProfile;
  userRequest: UserProfile;
  avatarRequest: { id: number; imgUrl: string; prodId: number };
  loginRequest: { id: number; login: string; prodId: number };
  passwordRequest: { id: number; password: string; prodId: number };
  addToCartRequest: { id: number; cart: UserCartItem[]; title: string; prodId: number };
  deleteFromCartRequest: { id: number; cart: UserCartItem[]; title: string; prodId: number };
  changeQuantityRequest: { id: number; cart: UserCartItem[] };
  setLikeRequest: { id: number; liked: UserLikedItem[]; title: string };
  unsetLikeRequest: { id: number; liked: UserLikedItem[]; title: string };
  setOrderRequest: { id: number; orders: UserOrder[]; prodId: number };
  deleteOrderRequest: { id: number; orders: UserOrder[]; prodId: number };
  usetCart: [];
}

export interface HeadingState {
  heading: string;
}

export interface ModalState {
  content: string;
  isOpen: boolean;
}

export interface CommonState {
  loading: boolean;
  logged: boolean;
}

export interface ErrorrsState {
  errors: string[];
  error: string;
}

export interface AppStateType {
  common: CommonState;
  heading: HeadingState;
  user: UsersState;
  modal: ModalState;
  products: AllProductsState;
  errors: ErrorrsState;
  pending: PendingState;
}

export interface ErrorBoundaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/require-default-props
  children: any;
  previousErrors: string[];
  userId: number;
  thrownError: string;
  setTheErros: (data: string[]) => void;
}

export interface ErrorBoundaryState {
  error: boolean;
}
