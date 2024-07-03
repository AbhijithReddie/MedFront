import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const Order = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");
            const userId = localStorage.getItem("userId");
            const response = await axios.post(`http://localhost:5632/orders/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Role: role
                }
            });
            setOrder(response.data.order);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    if (!order) return <Container className="mt-5 text-center">No Orders yet</Container>;

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="bg-light p-4 rounded shadow-lg">
                        <h2 className="text-center mb-4">Your Order</h2>
                        <div className="mb-4">
                            <h4 className="text-danger mb-3">Order ID: {order.orderId}</h4>
                            <p className="mb-2"><strong>Username:</strong> {localStorage.getItem("username")}</p>
                            {order.items.map((item, index) => (
                                <Row key={index} className="mb-3">
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{item.productName}</Card.Title>
                                                <Card.Text>
                                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                                    <p><strong>Price:</strong> ₹{item.price.toFixed(2)}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            ))}
                            <p className="mt-3"><strong>GST:</strong> {getGST(order.totalPrice).toFixed(2)}</p>
                            <p><strong>Delivery Charge:</strong> Free</p>
                            <h4 className="mt-3">Total Price: ₹{calculateTotalPrice(order.totalPrice, getGST(order.totalPrice)).toFixed(2)}</h4>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

// Function to calculate total price including GST and delivery charges
const calculateTotalPrice = (tp, gst) => {
    return tp + gst;
};

const getGST = (tp) => {
    return 0.18 * tp;
};

export default Order;
