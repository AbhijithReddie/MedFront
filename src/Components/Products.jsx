import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Products =()=> {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProds(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  const productCards = prods.map((product, index) => (
    <Col key={index} md={4}>
      <Card style={{ marginBottom: '20px' }}>
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.quantity>0}?Available:Out of Stock
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Price: {product.price}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  ));

  const rows = [];
  for (let i = 0; i < productCards.length; i += 3) {
    const row = (
      <Row key={i}>
        {productCards.slice(i, i + 3)}
      </Row>
    );
    rows.push(row);
  }

  return (
    <div>
      {rows}
    </div>
  );
}

export {Products};
