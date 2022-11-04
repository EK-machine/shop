/* eslint-disable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from '../redux/store/store';

const renderWithStore = ({ children }) => render(<Provider store={store}>{children}</Provider>);

export default renderWithStore;
