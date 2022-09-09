import React, { useState } from 'react';
import styles from './style.module.css';
import Button from '../Button/Button';
import { FilterBlockProps } from '@/interface/intefaces';
import ModalProduct from '../ModalProduct/ModalProduct';
import ModalContainer from '../ModalContainer/ModalContainer';
import useScreenWidth from '../../hooks/useScreenWidth';

const FilterBlock: React.FC<FilterBlockProps> = ({
  onChange,
  title,
  image,
  id,
  price,
  category,
  description,
  rating,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile: boolean = useScreenWidth() < 768;

  const openModal = () => {
    setIsOpen(true);
  };

  const toggleModal = (value: boolean) => () => {
    setIsOpen(value);
  };

  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Search..." type="text" title="Search products" onChange={onChange} />
      <Button onClick={openModal} product type="button" count={rating.count} text={title} image={image} />
      <ModalContainer
        text="product description"
        crossButton
        anchor={isMobile ? 'bottom' : 'right'}
        open={isOpen}
        toggleModal={toggleModal}
      >
        <ModalProduct
          id={id}
          title={title}
          price={price}
          category={category}
          description={description}
          image={image}
          rating={rating}
        />
      </ModalContainer>
    </div>
  );
};

export default FilterBlock;
