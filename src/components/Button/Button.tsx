import React from 'react';
import styles from './style.module.css';
import { ButtonProps } from '../../interface/intefaces';

const Button: React.FC<ButtonProps> = ({ disabled, underlined, text, onClick, type, addAction }) => (
  <button
    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick && onClick(event);
      addAction && addAction(text);
    }}
    type={type}
    className={`${underlined ? styles.underlined : styles.btnWrapper}
        ${disabled ? styles.disabled : ''}`}
  >
    {text}
  </button>
);

export default Button;
