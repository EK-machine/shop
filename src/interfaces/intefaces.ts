import React, { ReactNode } from 'react';
import { Dispatch } from 'redux';

export interface InfoBannerProps {
  successM: string;
  errorM: string;
}

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

// export interface UserLikedItem extends ProductType {
//   liked: boolean;
// }

export interface UserLikedItem extends ProductType {
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
  liked: boolean;
}

export interface UserCartItem extends ProductType {
  quantity: number;
}

export interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
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
  items: UserCartItem[];
}

export interface ModalProductProps {
  product: ProductType;
  text?: string;
}

export interface UserProfile {
  login: string;
  password: string;
  role: string;
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
}

export interface ModalProps {
  anchor: 'left' | 'top' | 'right' | 'bottom';
  open: boolean;
  crossButton?: boolean;
  toggleModal: (isOpen: boolean) => () => void;
  extraClassName?: string;
  backdropClickToggle?: boolean;
  children: ReactNode;
  logged: boolean;
  modalContent: string;
  title?: string;
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

export type BaseAction<T> = {
  type: string;
  payload: T;
};

export type BaseDispatch<T> = Dispatch<BaseAction<T>>;

export interface LikedItemProps {
  image: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  addAction?: (val: string) => void;
  like?: (val: string) => void;
}

export interface CartItemProps extends LikedItemProps {
  quantity: number;
  price: number;
}

export interface AllProductsState {
  products: ProductType[];
  product: ProductType;
}

export interface UsersState {
  users: UserProfile[];
  user: UserProfile;
  userRequest: UserProfile;
  avatarRequest: { id: number; imgUrl: string };
  loginRequest: { id: number; login: string };
  passwordRequest: { id: number; password: string };
  addToCartRequest: { id: number; cart: UserCartItem[] };
  deleteFromCartRequest: { id: number; cart: UserCartItem[] };
  changeQuantityRequest: { id: number; cart: UserCartItem[] };
  setLikeRequest: { id: number; liked: UserLikedItem[] };
  unsetLikeRequest: { id: number; liked: UserLikedItem[] };
  cartError: string;
  userError: string;
  createError: string;
  likedError: string;
  orderError: string;
  usersError: string;
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

export interface AppStateType {
  common: CommonState;
  heading: HeadingState;
  user: UsersState;
  modal: ModalState;
  products: AllProductsState;
}
