import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../Layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import Cart from '../Cart/Cart';
import Liked from '../Liked/Liked';
import Orders from '../Orders/Orders';
import { setHeading } from '../../redux/slices/headingSlice';
import { setTitle } from '../../helpers/utils';
import '../../common.css';

const CartPage: React.FC = () => {
  const [cartPcontent, setCartPContent] = useState<string>('cart');
  const [active, setActive] = useState<number>(0);
  const dispatch = useDispatch();

  const setContent = (val: string) => {
    dispatch(setHeading(setTitle(val)));
    if (val.includes('cart')) {
      setCartPContent('cart');
      setActive(0);
    }
    if (val.includes('liked')) {
      setCartPContent('liked');
      setActive(1);
    }
    if (val.includes('orders')) {
      setCartPContent('orders');
      setActive(2);
    }
  };

  useEffect(() => {
    dispatch(setHeading('Your cart'));
  }, []);

  return (
    <Layout>
      <Sidebar cart filterByCategory={setContent} active={active} />
      <div className="contentBlock">
        {cartPcontent === 'cart' && <Cart />}
        {cartPcontent === 'liked' && <Liked />}
        {cartPcontent === 'orders' && <Orders />}
      </div>
    </Layout>
  );
};

export default CartPage;
