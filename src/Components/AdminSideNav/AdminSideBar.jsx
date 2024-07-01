import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaChartArea, FaChartBar, FaUsers, FaChartLine, FaCog, FaUser } from 'react-icons/fa';
import './AdminSideBar.css'; // Import CSS for styling

const AdminSideBar = () => {
    return (
        <div className="admin-sidebar bg-dark text-white">
            <Nav className="flex-column">
                <Nav.Link as={NavLink} to="/admindashboard" className="sidebar-link py-3">
                    <FaTachometerAlt className="me-3" />
                    Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/manageInventory" className="sidebar-link py-3">
                    <FaChartArea className="me-3" />
                    Manage Inventory
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/orders" className="sidebar-link py-3">
                    <FaChartBar className="me-3" />
                    Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/customers" className="sidebar-link py-3">
                    <FaUsers className="me-3" />
                    Customers
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/analytics" className="sidebar-link py-3">
                    <FaChartLine className="me-3" />
                    Analytics & Reports
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/settings" className="sidebar-link py-3">
                    <FaCog className="me-3" />
                    Settings
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/customerFeedback" className="sidebar-link py-3">
                    <FaUser className="me-3" />
                    Customer Feedback
                </Nav.Link>
            </Nav>
        </div>
    );
};

export {AdminSideBar};
