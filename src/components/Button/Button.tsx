import React from 'react';
import styles from './style.module.css';
import { ButtonProps } from '../../interface/intefaces';

const Button: React.FC<ButtonProps> = ({
  usual,
  product,
  image,
  disabled,
  underlined,
  text,
  onClick,
  type,
  addAction,
  category,
}) => (
  <>
    {usual && (
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
    )}
    {product && (
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          onClick && onClick(event);
          addAction && addAction(text);
        }}
        type={type}
        className={styles.productBtn}
      >
        <p className={styles.title}>{text}</p>
        <img src={image} alt="text" className={styles.image} />
      </button>
    )}
    {category && (
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          onClick && onClick(event);
          addAction && addAction(text);
        }}
        type="button"
        className={styles.categoryBtn}
      >
        <img className={styles.categoryIcon} src={image} alt={text} />
        <span className={styles.categoryText}>{text}</span>
      </button>
    )}
  </>
);

export default Button;
