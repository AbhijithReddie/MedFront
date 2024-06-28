import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import { Login } from './Components/LoginSignup/Login';
import { Signup } from './Components/LoginSignup/Signup';
import { NavBar } from './Components/headerfiles/NavBar';
import { Products } from './Components/Products';
import { About } from './Components/About';
import { UserPrivateRoutes } from './Components/UserPrivateRoutes';
import { AdminPrivateRoutes } from './Components/AdminPrivateRoutes';
import Footer from './Components/footerfiles/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './Components/Home';
import { Cart } from './Components/Cart';
import { Order } from './Components/Order';
import Payment from './Components/Payment';
import AdminDashboard from './Components/AdminDashboard';
import AddProduct from './Components/AddProduct';

const App = () => {
  const [status, setStatus] = useState(false);
  return (
    <Router>
      <AuthProvider>
        <div>
          <NavBar status={status} setStatus={setStatus} />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login status={status} setStatus={setStatus} />} />
            <Route path="/orders" element={<Order />} />
            <Route path='/products' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path='/payment' element={<Payment/>} />


            <Route element={<UserPrivateRoutes />}>
              <Route path='/home' element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>

            <Route element={<AdminPrivateRoutes />}>
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/admin/addProduct" element={<AddProduct />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
