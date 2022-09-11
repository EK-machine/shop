import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { apiGetProduct } from '../../api/apis';
import { HeaderProps, ProductType } from '../../interface/intefaces';
import { navigationLinks, base } from '../../data/data';
import ModalContainer from '../ModalContainer/ModalContainer';
import useScreenWidth from '../../hooks/useScreenWidth';
import LoginButton from '../LoginButton/LoginButton';
import styles from './style.module.css';
import Logo from '../../../public/logo.png';
import ModalLoginRegister from '../ModalLoginRegister/ModalLoginRegister';
import FilterBlock from '../FilterBlock/FilterBlock';
import ModalProduct from '../ModalProduct/ModalProduct';

const Header: React.FC<HeaderProps> = ({ logged, bottomShadow }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType>({
    id: 0,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const isMobile: boolean = useScreenWidth() < 768;

  const toggleModal = (value: boolean) => () => {
    setIsOpen(value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openWithContent = (val: string) => {
    setModalContent(val);
  };

  const getSelected = (title: string) => {
    if (title) {
      const selected = products.find((item) => item.title === title);
      selected && setProduct(selected);
      setIsOpen(true);
    }
  };

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e?.target?.value);
  };
  const debounced = debounce(updateQuery, 300);

  useEffect(() => {
    const getProduct = async (string: string) => {
      const prod = await apiGetProduct(string);
      if (prod) {
        setProducts(prod);
      }
    };
    getProduct(query);
  }, [query]);

  return (
    <div className={`${styles.headerContainer} ${bottomShadow ? styles.bottomShadow : ''}`}>
      <NavLink className={styles.logoWrapper} to={base}>
        <img className={styles.logo} src={Logo} alt="logo" />
      </NavLink>
      <FilterBlock onChange={debounced} products={products} query={query} getSelected={getSelected} />

      {logged &&
        navigationLinks.map((item) => (
          <NavLink className={styles.link} key={item.name} to={item.link}>
            {item.name}
          </NavLink>
        ))}
      <LoginButton addAction={openWithContent} onClick={openModal} />
      <ModalContainer
        text="Create new account"
        crossButton
        anchor={isMobile ? 'bottom' : 'right'}
        open={isOpen}
        toggleModal={toggleModal}
      >
        <ModalLoginRegister modalContent={modalContent} />
        <ModalProduct
          id={product.id}
          title={product.title}
          price={product.price}
          category={product.category}
          description={product.description}
          image={product.image}
          rating={product.rating}
        />
      </ModalContainer>
    </div>
  );
};

export default Header;
