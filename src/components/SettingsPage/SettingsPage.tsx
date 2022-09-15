import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../Layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import SetLogin from '../SetLogin/SetLogin';
import SetPassword from '../SetPassword/SetPassword';
import SetAvatar from '../SetAvatar/SetAvatar';
import { setHeading } from '../../redux/slices/headingSlice';
import { setTitle } from '../../helpers/utils';
import '../../common.css';

const SettingsPage: React.FC = () => {
  const [settingsContent, setSettingsContent] = useState<string>('login');
  const [active, setActive] = useState<number>(0);
  const dispatch = useDispatch();

  const setContent = (val: string) => {
    dispatch(setHeading(setTitle(val)));
    if (val.includes('login')) {
      setSettingsContent('login');
      setActive(0);
    }
    if (val.includes('password')) {
      setSettingsContent('password');
      setActive(1);
    }
    if (val.includes('avatar')) {
      setSettingsContent('avatar');
      setActive(2);
    }
  };

  useEffect(() => {
    dispatch(setHeading('Change your login'));
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
