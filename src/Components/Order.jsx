import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5632/orders'); // Adjust the endpoint as needed
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="h-100 gradient-custom">
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={10} xl={8}>
            <Card style={{ borderRadius: '10px' }}>
              <Card.Header className="px-4 py-5">
                <h5 className="text-muted mb-0">
                  Thanks for your Order, <span style={{ color: '#a8729a' }}>Anna</span>!
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}>
                    Receipt
                  </p>
                  <p className="small text-muted mb-0">Receipt Voucher : 1KAU9-84UIL</p>
                </div>

                {orders.map((order, index) => (
                  <Card key={index} className="shadow-0 border mb-4">
                    <Card.Body>
                      <Row>
                        <Col md={2}>
                          <img
                            src={order.image}
                            className="img-fluid"
                            alt={order.productName}
                          />
                        </Col>
                        <Col md={4} className="d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0">{order.productName}</p>
                        </Col>
                        <Col md={3} className="d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">Qty: {order.quantity}</p>
                        </Col>
                        <Col md={3} className="d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">${order.price * order.quantity}</p>
                        </Col>
                      </Row>
                      <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                      <Row className="d-flex align-items-center">
                        <Col md={2}>
                          <p className="text-muted mb-0 small">Track Order</p>
                        </Col>
                        <Col md={10}>
                          <ProgressBar
                            now={order.progress}
                            style={{ height: '6px', borderRadius: '16px', backgroundColor: '#a8729a' }}
                          />
                          <div className="d-flex justify-content-around mb-1">
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}

                <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">Order Details</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Total</span> ${orders.reduce((total, order) => total + (order.price * order.quantity), 0)}
                  </p>
                </div>

                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">Invoice Number : 788152</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Discount</span> $19.00
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">Invoice Date : 22 Dec, 2019</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">GST 18%</span> 123
                  </p>
                </div>

                <div className="d-flex justify-content-between mb-5">
                  <p className="text-muted mb-0">Receipts Voucher : 18KU-62IIK</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Delivery Charges</span> Free
                  </p>
                </div>
              </Card.Body>
              <Card.Footer
                className="border-0 px-4 py-5"
                style={{
                  backgroundColor: '#a8729a',
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px'
                }}
              >
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                  Total paid: <span className="h2 mb-0 ms-2">${orders.reduce((total, order) => total + (order.price * order.quantity), 0)}</span>
                </h5>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { Order };
