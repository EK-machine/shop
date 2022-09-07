import React, { ReactNode } from 'react';

export interface HeaderProps {
  logged: boolean;
}

export interface ProductType {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface SiteType {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

export interface CustomerProps {
  img: string;
  name: string;
  reply: string;
}

export interface ButtonProps {
  disabled?: boolean;
  underlined?: boolean;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ModalProps {
  anchor: 'left' | 'top' | 'right' | 'bottom';
  open: boolean;
  crossButton?: boolean;
  toggleModal: (isOpen: boolean) => () => void;
  extraClassName?: string;
  backdropClickToggle?: boolean;
  children: ReactNode;
}
