import React, { ReactNode } from 'react';
import { Dispatch } from 'redux';

export interface HeaderProps {
  bottomShadow?: boolean;
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

export interface ModalProductProps {
  product: ProductType;
  text?: string;
}

export interface UserProfile {
  login: string;
  password: string;
  role: string;
  id: number;
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
  category?: boolean;
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
  error?: FormErrors;
  setError?: React.Dispatch<React.SetStateAction<FormErrors>>;
  addData?: string;
  addSetData?: React.Dispatch<React.SetStateAction<string>>;
  modalContent?: string;
}

export interface StarRateProps {
  rating: number;
}

export interface ProductsSidebarProps {
  filterByCategory: (title: string) => void;
  categories: string[];
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

export interface AppStateType {
  common: {
    loading: boolean;
    logged: boolean;
  };
  user: {
    login: string;
    password: string;
    role: string;
    id: number;
  };
  modal: {
    content: string;
    isOpen: boolean;
  };
  products: {
    products: ProductType[];
    product: ProductType;
  };
}
