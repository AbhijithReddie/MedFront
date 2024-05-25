import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Components/LoginSignup/Login';
import { Signup } from './Components/LoginSignup/Signup';
import { NavBar } from './Components/headerfiles/NavBar';
import {Products} from './Components/Products'
import Footer from './Components/footerfiles/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import {Cart} from './Components/Cart';
import Order from './Components/Order';
import AdminDashboard from './Components/AdminDashboard';
import AddProduct from './Components/AddProduct';

const App = () => {
  const [status, setStatus] = useState(true);
  return (
    <Router>
      <div>
        <NavBar status={status} setStatus={setStatus}/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login status={status} setStatus={setStatus}/>} />
          <Route path="/home" element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/addProduct" element={<AddProduct />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
