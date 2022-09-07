import React from 'react';
import styles from './style.module.css';
import { ButtonProps } from '../../interface/intefaces';

const Button: React.FC<ButtonProps> = ({ disabled, underlined, text, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className={`${underlined ? styles.underlined : styles.btnWrapper}
        ${disabled ? styles.disabled : ''}`}
  >
    {text}
  </button>
);

export default Button;
