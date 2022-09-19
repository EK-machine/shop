import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import SetLogin from '../SetLogin/SetLogin';
import SetPassword from '../SetPassword/SetPassword';
import SetAvatar from '../SetAvatar/SetAvatar';
import { setHeading } from '../../redux/slices/headingSlice';
import { setTitle } from '../../helpers/utils';
import '../../common.css';
import { AppStateType } from '../../interfaces/intefaces';

const SettingsPage: React.FC = () => {
  const [settingsContent, setSettingsContent] = useState<string>('avatar');
  const [active, setActive] = useState<number>(0);
  const currentUser = useSelector((state: AppStateType) => state.user.user);
  const dispatch = useDispatch();

  const setContent = (val: string) => {
    const add = !!currentUser.imgUrl;
    dispatch(setHeading(setTitle(val, add)));
    if (val.includes('avatar')) {
      setSettingsContent('avatar');
      setActive(0);
    }
    if (val.includes('login')) {
      setSettingsContent('login');
      setActive(1);
    }
    if (val.includes('password')) {
      setSettingsContent('password');
      setActive(2);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.imgUrl !== '') {
      dispatch(setHeading('Change your avatar'));
    }
    dispatch(setHeading('Set your avatar'));
  }, []);

  return (
    <Layout>
      <Sidebar settings filterByCategory={setContent} active={active} />
      <div className="contentBlock">
        {settingsContent === 'login' && <SetLogin />}
        {settingsContent === 'password' && <SetPassword />}
        {settingsContent === 'avatar' && <SetAvatar />}
      </div>
    </Layout>
  );
};

export default SettingsPage;
