import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Components/AuthContext'; // Assuming you have useAuth hook for accessing auth state
import { Login } from './Components/LoginSignup/Login';
import { Signup } from './Components/LoginSignup/Signup';
import { NavBar } from './Components/headerfiles/NavBar';
import { Products } from './Components/Products';
import { About } from './Components/About';
import { UserPrivateRoutes } from './Components/UserPrivateRoutes';
import { AdminPrivateRoutes } from './Components/AdminPrivateRoutes';
import Footer from './Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Components/Home';
import { Cart } from './Components/Cart';
import { Order } from './Components/Order';
import Payment from './Components/Payment';
import AdminDashboard from './Components/AdminDashboard';
import AddProduct from './Components/AddProduct';

const App = () => {
  
  return (
    <Router>
      <AuthProvider>
        <div>
          <NavBar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/orders" element={<Order />} />
            <Route path='/products' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path='/payment' element={<Payment />} />

            <Route element={<UserPrivateRoutes />}>
              {/* Private routes for authenticated users */}
              <Route path='/home' element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>

            <Route element={<AdminPrivateRoutes />}>
              {/* Private routes for admin users */}
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/admin/addProduct" element={<AddProduct />} />
            </Route>

            {/* Default route if none of the above matches */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
