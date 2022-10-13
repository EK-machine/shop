import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'Components/Layout/Layout';
import Sidebar from 'Components/Sidebar/Sidebar';
import SetLogin from 'Components/SetLogin/SetLogin';
import SetPassword from 'Components/SetPassword/SetPassword';
import SetAvatar from 'Components/SetAvatar/SetAvatar';
import { setHeading } from 'ReduxSlices/headingSlice';
import { AppStateType } from 'Interfaces/intefaces';
import '../../common.css';

const SettingsPageUnmemoized: React.FC = () => {
  const [settingsContent, setSettingsContent] = useState<string>('avatar');
  const [active, setActive] = useState<number>(0);
  const currentUser = useSelector((state: AppStateType) => state.user.user);
  const dispatch = useDispatch();

  const setContent = useCallback((val: string) => {
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
  }, []);

  useEffect(() => {
    const add = !!currentUser.imgUrl;
    if (add) {
      dispatch(setHeading('Change your avatar'));
    } else {
      dispatch(setHeading('Set your avatar'));
    }
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

const SettingsPage = React.memo(SettingsPageUnmemoized);

export default SettingsPage;
