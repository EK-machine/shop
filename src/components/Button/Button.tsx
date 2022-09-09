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
  count,
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
        <div className={styles.textContainer}>
          <p className={styles.title}>{text}</p>
          <p className={styles.count}>
            <span className={styles.span}>{count}</span> happy purchases
          </p>
        </div>
        <img src={image} alt="text" className={styles.image} />
      </button>
    )}
  </>
);

export default Button;
