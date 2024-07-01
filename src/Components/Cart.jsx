import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import './cssfiles/cartPage.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () =>{
    const [cartItems, setCartItems] = useState([]);
    const fetchProd=async ()=>{
      try{
          const token = localStorage.getItem('token');
          const role = localStorage.getItem('role');
          const userId=localStorage.getItem('userId');
          const response = await axios.post('http://localhost:5632/cart',
            {
              userId:userId
            } ,
            {
            headers: {
              Authorization: `Bearer ${token}`,
              Role: role,
            },
          
          });
          // console.log(response.data);
          setCartItems(response.data)
      }
      catch(e){
        console.log("Error in Fetching cart items ",e);
        toast.error('Error!!')
      }
    }
    useEffect(()=>{
      fetchProd();
    },[])
    const handleIncrement = async (id) => {
        try{
          const token = localStorage.getItem('token');
          const role = localStorage.getItem('role');
          const userId=localStorage.getItem('userId');
          const res=await axios.post(`http://localhost:5632/cart/increment/${id}`,{userId:userId},
            {
              headers:{
                Authorization: `Bearer ${token}`,
                Role: role,
              }  
            }
          )
          console.log(res.data);
        }
        catch(e){
          console.log(e);
        }
        fetchProd()
    };
    
    const handleDecrement = async (id) => {
      try{
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userId=localStorage.getItem('userId');
        const res=await axios.post(`http://localhost:5632/cart/decrement/${id}`,{userId:userId},
          {
            headers:{
              Authorization: `Bearer ${token}`,
              Role: role,
            }  
          }
        )
      }
      catch(e){
        console.log(e);
      }
      fetchProd()
  };
    const handleRemoveItem = async (id) => {
      try{
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userId=localStorage.getItem('userId');
        const res=await axios.post(`http://localhost:5632/cart/delete/${id}`,
          {userId:userId},
          {
            headers:{
            Authorization: `Bearer ${token}`,
            Role: role,
          }
        }
        )  
      }
      catch(e){
        console.log("ERROR !!",e);
      }
    };

    const handleFileChange = (id, event) => {
        console.log(`File selected for item ${id}:`, event.target.files[0]);
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Shopping Cart</h2>
            {cartItems.map(item => (
                <Row key={item.cartItemID} className="cart-item mb-3">
                    {/* <Col md={2}>
                        <Image src={item.imageUrl} thumbnail />
                    </Col> */}
                    <Col md={4}>
                        <h5>{item.productName}</h5>
                        <p>${item.pricePerUnit}</p>
                        <div className="quantity-control">
                            <Button variant="outline-secondary" onClick={() => handleDecrement(item.cartItemID)}>-</Button>
                            <h5>{item.quantity}</h5>
                            <Button variant="outline-secondary" onClick={() => handleIncrement(item.cartItemID)}>+</Button>
                        </div>
                    </Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center">
                        <p>Total: $ {item.price}</p>
                    </Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center">
                        <Button variant="danger" onClick={() => handleRemoveItem(item.cartItemID)}>Remove</Button>
                    </Col>
                </Row>
            ))}
            <Row className="justify-content-end mt-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total: ${getTotal()}</Card.Title>
                            <Button variant="success" block>Checkout</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default Cart;