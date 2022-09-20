import React from 'react';
import styles from './style.module.css';
import { ButtonProps } from '../../interfaces/intefaces';
import { toLike, isliked } from '../../data/data';

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
  like,
  liked,
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
        <div className={styles.categoryIconWrapper}>
          <img className={styles.categoryIcon} src={image} alt={text} />
        </div>
        <span className={styles.categoryText}>{text.split(' ')[0]}</span>
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
    {like && (
      <button type={type} onClick={like} className={styles.likebtn}>
        <img className={styles.likeImg} src={liked ? isliked : toLike} alt="like" />
      </button>
    )}
  </>
);

export default Button;
