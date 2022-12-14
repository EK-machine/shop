import React from 'react';
import { ButtonProps } from 'Interfaces/intefaces';
import { toLike, isliked, btnLoading } from 'Data/data';
import styles from './style.module.css';

const ButtonUnmemoized: React.FC<ButtonProps> = ({
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
  loading,
  pending,
}) => (
  <>
    {loading && (
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          onClick && onClick(event);
          addAction && addAction(text);
        }}
        type={type}
        style={{ minWidth: '195px' }}
        className={`${pending ? styles.pending : styles.btnWrapper}
        ${disabled ? styles.disabled : ''}`}
      >
        {pending ? <img className={styles.pendingIcon} src={btnLoading} alt="loading" /> : text}
      </button>
    )}
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

const Button = React.memo(ButtonUnmemoized);

export default Button;
