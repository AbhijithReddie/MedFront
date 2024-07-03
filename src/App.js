import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext'; 
import { Login } from './Components/LoginSignup/Login';
import { Signup } from './Components/LoginSignup/Signup';
import { NavBar } from './Components/headerfiles/NavBar'; 
import { AdminNavBar } from './Components/AdminNavBar'; 
import { UserPrivateRoutes } from './Components/UserPrivateRoutes';
import { AdminPrivateRoutes } from './Components/AdminPrivateRoutes';
import { Footer } from './Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Components/Home';
import Cart from './Components/Cart';
import Order from './Components/Order'
import { Payment } from './Components/Payment';
import { AdminDashboard } from './Components/AdminDashboard';
import { AddProduct } from './Components/AddProduct';
import { Products } from './Components/Products';
import { About } from './Components/About';
import {AdminSideBar} from './Components/AdminSideNav/AdminSideBar'; 
import './App.css'; 
import { ManageInventory } from './Components/ManageInventory';
import { ManageExistingStock } from './Components/ManageExistingStock';
import { Payment2 } from './Components/Payment2';
import { UserProfile } from './Components/UserProfile';

const App = () => {
    const [role, setRole] = useState("");

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        console.log(typeof role);
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    return (
        <Router>
            <AuthProvider>
                <div className="app-container">
                    {role === 'admin' ? <AdminNavBar /> : <NavBar />}
                    <div className="content-container">
                        {role === 'admin' ? <AdminSideBar />:<></>} 
                        <Routes>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            
                            <Route path="/orders" element={<Order />} />
                            <Route path='/products' element={<Products />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/payment' element={<Payment />} />
                            <Route path='/payment2' element={<Payment2 />} />


                            <Route element={<UserPrivateRoutes />}>
                                <Route path='/home' element={<Home />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/profile" element={<UserProfile/>}/>
                                {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
                            </Route>

                            <Route element={<AdminPrivateRoutes />}>
                                <Route path='/manageexisting' element={<ManageExistingStock />} />
                                <Route path='/addproduct' element={<AddProduct />} />
                                <Route path='/manageinv' element={<ManageInventory />} />
                                <Route path='/sidebar' element={<AdminSideBar /> }/>
                                <Route path="/admindashboard" element={<AdminDashboard />} />
                                <Route path="/admin/addProduct" element={<AddProduct />} />
                            </Route>

                            {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
                        </Routes>
                        <Footer />
                    </div>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
