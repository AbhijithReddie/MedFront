import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Col, Row, Card, ListGroup, Pagination, Placeholder } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const navigate=useNavigate();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const response = await axios.post('http://localhost:5632/home', {
        headers: {
          Authorization: `Bearer ${token}`,
          Role: role,
        },
      });

      setProds(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };
  const handleCardClick = (productId) => {
    localStorage.setItem("pid",productId);
    navigate('/prodPage');
  };

  if (loading) {
    const placeholders = Array.from({ length: 4 }).map((_, index) => (
      <Col key={index} md={3} className="mb-4">
        <Card style={{ height: '100%' }} >
          <div style={{ height: '150px', objectFit: 'contain', backgroundColor: '#e9ecef' }}></div>
          <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
            </Placeholder>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
              <Placeholder.Button variant="primary" xs={6} />
              <Placeholder.Button variant="success" xs={6} />
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <Placeholder as={ListGroup.Item} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </ListGroup>
        </Card>
      </Col>
    ));

    return <Row>{placeholders}</Row>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredProducts = prods.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const productCards = currentProducts.map((product, index) => (
    <Col key={index} md={3} className="mb-4">
      <Card style={{ height: '100%' }} onClick={() => handleCardClick(product._id)}>
        <Card.Img variant="top" src={product.imageUrl} style={{ height: '150px', objectFit: 'contain' }} />
        <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text style={product.quantity > 0 ? {color:'green'} :{color:'red'}}>
            {product.quantity > 0 ? 'Available' : 'Out of Stock'}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Price: ₹{product.price.toFixed(2)}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  ));

  const rows = [];
  for (let i = 0; i < productCards.length; i += 4) {
    const row = (
      <Row key={i}>
        {productCards.slice(i, i + 4)}
      </Row>
    );
    rows.push(row);
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      <ToastContainer />
      <div className="text-center my-4">
        <Form inline>
          <Col md={6} className="mx-auto d-flex">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2 flex-grow-1"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Button variant="danger">Search</Button>
          </Col>
        </Form>
      </div>
      {rows}
      <Pagination className="justify-content-center mt-4">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map(number => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export { Products };
