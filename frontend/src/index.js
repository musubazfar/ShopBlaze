import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import store from "./Redux/store";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import CartScreen from "./Pages/CartScreen";
import LoginScreen from "./Pages/LoginScreen";
import RegisterScreen from "./Pages/RegisterScreen";
import ShippingScreen from "./Pages/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from './Pages/PaymentScreen'
import PlaceOrderScreen from "./Pages/PlaceOrderScreen";
import OrderScreen from "./Pages/OrderScreen";
import ProfileScreen from "./Pages/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./Pages/adminScreens/OrderListScreen";
import ProductListScreen from "./Pages/adminScreens/ProductListScreen";
import ProductEditScreen from "./Pages/adminScreens/ProductEditScreen";
import UsersListScreen from "./Pages/adminScreens/UsersListScreen";
import UsersEditScreen from "./Pages/adminScreens/UsersEditScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/products/:id" element={<Products />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
        <Route path="/order/:id" element={<OrderScreen/>}/>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userlist" element={<UsersListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UsersEditScreen />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
       <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
