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
  addAction,
  type,
  categorySide,
  cartSide,
  activeBtn,
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
    {categorySide && (
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          onClick && onClick(event);
          addAction && addAction(text);
        }}
        type={type}
        className={`${styles.categoryBtn} ${activeBtn ? styles.categoryBtnActive : ''}`}
      >
        <img className={styles.categoryIcon} src={image} alt={text} />
        <span className={styles.categoryText}>{text}</span>
      </button>
    )}
    {cartSide && (
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          onClick && onClick(event);
          addAction && addAction(text);
        }}
        type={type}
        className={`${styles.cartSideBtn} ${activeBtn ? styles.cartSideBtnActive : ''}`}
      >
        <img className={styles.cartSideIcon} src={image} alt={text} />
        <span className={styles.cartSideText}>{text}</span>
      </button>
    )}
  </>
);

export default Button;
