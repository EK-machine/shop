import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from 'Components/Layout/Layout';
import Sidebar from 'Components/Sidebar/Sidebar';
import Cart from 'Components/Cart/Cart';
import Liked from 'Components/Liked/Liked';
import Orders from 'Components/Orders/Orders';
import { setHeading } from 'ReduxSlices/headingSlice';
import '../../common.css';

const CartPage: React.FC = () => {
  const [cartPcontent, setCartPContent] = useState<string>('cart');
  const [active, setActive] = useState<number>(0);
  const dispatch = useDispatch();

  const setContent = useCallback((val: string) => {
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
  }, []);

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
