import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import './css/App.css'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import { Provider } from 'react-redux';
import store from './redux-toolkit/configStore';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <AuthProvider>
  <App />
  </AuthProvider>
  </Provider>
  </BrowserRouter>
);

