import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

const appElement = document.getElementById('root');

const root = ReactDom.createRoot(appElement);
root.render(<App />);
