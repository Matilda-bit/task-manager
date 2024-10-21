import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);  // Non-null assertion for TypeScript
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
