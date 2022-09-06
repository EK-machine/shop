import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

// eslint-disable-next-line import/no-webpack-loader-syntax
require('file-loader?name=[name].[ext]!./index.html');

const appElement = document.getElementById('root');

const root = ReactDom.createRoot(appElement);
root.render(<App />);
