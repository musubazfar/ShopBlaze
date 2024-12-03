import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './Redux/store';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home';
import Products from './Pages/Products';
import CartScreen from './Pages/CartScreen';
import LoginScreen from './Pages/LoginScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/products/:id' element={<Products/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
