import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Col, Row, Card, ListGroup, Pagination, Placeholder, Dropdown, DropdownButton, ButtonGroup, FormCheck } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [prescriptionFilter, setPrescriptionFilter] = useState(false);

  const navigate = useNavigate();

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
      setError('Error fetching product data. Please try again later.'); // Set a meaningful error message
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
    localStorage.setItem("pid", productId);
    navigate('/prodPage');
  };

  const handleSort = (sortType) => {
    let sortedProds = [];
    switch (sortType) {
      case 'lowToHigh':
        sortedProds = [...prods].sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        sortedProds = [...prods].sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        sortedProds = [...prods].sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }
    setProds(sortedProds);
  };

  const handleCategorySelect = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    setCurrentPage(1);
  };

  const handlePrescriptionFilter = (event) => {
    setPrescriptionFilter(event.target.checked);
  };

  if (loading) {
    const placeholders = Array.from({ length: 4 }).map((_, index) => (
      <Col key={index} md={3} className="mb-4">
        <Card style={{ height: '100%' }}>
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
    return <div>Error: {error}</div>;
  }

  const filteredProducts = prods
    .filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.some((cat) => product.categories.includes(cat))) &&
      (!prescriptionFilter || !product.requiresPrescription)
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
          <Card.Text style={product.quantity > 0 ? { color: 'green' } : { color: 'red' }}>
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
      <div className="navbar p-4" style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        <DropdownButton id="dropdown-sort" title="Sort by" className="mr-2" style={{ border: 'none', fontWeight: 'bold' }}>
          <Dropdown.Item onClick={() => handleSort('lowToHigh')}>Cost - Low to High</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('highToLow')}>Cost - High to Low</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('popularity')}>Popularity</Dropdown.Item>
        </DropdownButton>
        <ButtonGroup className="mr-2">
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('Pain Relief')}>Pain Relief</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('Cold & Flu')}>Cold & Flu</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('Skin Care')}>Skin Care</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('Digestive Health')}>Digestive Health</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('Vitamins & Supplements')}>Vitamins & Supplements</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('First Aid')}>First Aid</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('Dental Care')}>Dental Care</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('Eye Care')}>Eye Care</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect("Women's Health")}>Women's Health</Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none', fontWeight: 'bold' }} onClick={() => handleCategorySelect('General Wellness')}>General Wellness</Button>
        </ButtonGroup>
        <FormCheck
          type="checkbox"
          label={<span style={{ fontWeight: 'bold' }}>Prescription not required</span>}
          checked={prescriptionFilter}
          onChange={handlePrescriptionFilter}
        />
      </div>
      <div className="content p-4">
        <div className="text-center my-4">
          <Form className="d-flex justify-content-center">
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
          <Pagination.Prev onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} />
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)} />
        </Pagination>
      </div>
    </div>
  );
};

export {Products};
