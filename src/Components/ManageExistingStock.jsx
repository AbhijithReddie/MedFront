import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Col, Row, Card, InputGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link component

// Placeholder card component
const CardExample = () => (
    <Card style={{ marginTop: '40px', width: '18rem', marginLeft: 'auto' }}>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            <FontAwesomeIcon icon={faImage} size="6x" />
            <Card.Title className="mt-3">Product Name</Card.Title>
            <Card.Text>
                <center>The Details of the product selected will appear here.</center>
            </Card.Text>
            <Button variant="danger" disabled>Delete Product</Button>
        </Card.Body>
    </Card>
);

const ManageExistingStock = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedProductName, setEditedProductName] = useState('');
    const [editedQuantity, setEditedQuantity] = useState(0);
    const [editedPricePerUnit, setEditedPricePerUnit] = useState(0);
    const [suggestions, setSuggestions] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.post('http://localhost:5632/home', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Role: `${localStorage.getItem('role')}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Perform search suggestion logic here (example: filter products)
        const matchedProducts = products.filter(product =>
            product.productName.toLowerCase().includes(query.toLowerCase())
        );

        // Limit suggestions to maximum 6 items
        setSuggestions(matchedProducts.slice(0, 6));
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setSearchQuery(product.productName); // Update the search query to reflect selected product
        setEditMode(false);
        setSuggestions([]); // Clear suggestions when a product is selected
        // Set the default price per unit when product is selected
        setEditedPricePerUnit(product.price);
    };

    const handleEditData = () => {
        setEditMode(true);
        setEditedProductName(selectedProduct.productName);
        setEditedQuantity(selectedProduct.quantity);
        setEditedPricePerUnit(selectedProduct.price);
    };

    const handleSubmit = async () => {
        const updatedProduct = {
            imageUrl: selectedProduct.imageUrl,
            productName: editedProductName,
            price: editedPricePerUnit,
            description: selectedProduct.description,
            quantity: editedQuantity,
            prescriptionRequired: selectedProduct.prescriptionRequired,
            checkAvailable: selectedProduct.checkAvailable
        };

        try {
            const response = await axios.post(`http://localhost:5632/admin/productEdit/${selectedProduct.productId}`, 
                {updatedProduct:updatedProduct},
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Role: `${localStorage.getItem('role')}`
                }
            });
            toast.success('Product updated successfully!');
            setSelectedProduct(response.data);
            setEditMode(false);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product. Please try again.');
        }
    };

    return (
        <div style={{ marginBottom: '100px' }}>
            <ToastContainer />
            <Row className="mt-4">
                <Col md={6} className="mx-auto">
                    <InputGroup style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <FormControl
                            type="text"
                            placeholder="Search products"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <Button variant="primary">Search</Button> {/* Changed to fully colored */}
                    </InputGroup>
                    {suggestions.length > 0 && (
                        <ListGroup className="mt-2">
                            {suggestions.map((product, index) => (
                                <ListGroup.Item
                                    key={index}
                                    action
                                    onClick={() => handleSelectProduct(product)}
                                >
                                    {product.productName}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <Button variant="warning" style={{ marginTop: '40px' }} disabled={Object.keys(selectedProduct).length === 0} onClick={handleEditData}>Edit Data</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6}>
                    {selectedProduct.productId ? (
                        <Card style={{ marginTop: '40px', width: '18rem', marginLeft: 'auto' }}> {/* Adjusted card width and added marginLeft */}
                            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                {selectedProduct.imageUrl ? (
                                    <img src={selectedProduct.imageUrl} alt={selectedProduct.productName} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                                ) : (
                                    <FontAwesomeIcon icon={faImage} size="6x" />
                                )}
                                <Card.Title className="mt-3">{selectedProduct.productName}</Card.Title>
                                <Card.Text>The Details of the product selected will appear here.</Card.Text>
                            </Card.Body>
                        </Card>
                    ) : (
                        <CardExample />
                    )}
                </Col>
                <Col md={6}>
                    <div style={{ marginTop: '50px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editMode ? editedProductName : selectedProduct.productName}
                                    onChange={(e) => setEditedProductName(e.target.value)}
                                    disabled={!editMode}
                                    style={{ boxShadow: editMode ? '0 0 10px #9ecaed' : 'none' }} // Add box shadow when in edit mode
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price per unit</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editMode ? editedPricePerUnit : selectedProduct.price}
                                    onChange={(e) => setEditedPricePerUnit(Number(e.target.value))}
                                    disabled={!editMode}
                                    style={{ boxShadow: editMode ? '0 0 10px #9ecaed' : 'none' }} // Add box shadow when in edit mode
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editMode ? editedQuantity : selectedProduct.quantity}
                                    onChange={(e) => setEditedQuantity(Number(e.target.value))}
                                    disabled={!editMode}
                                    style={{ boxShadow: editMode ? '0 0 10px #9ecaed' : 'none' }} // Add box shadow when in edit mode
                                />
                            </Form.Group>
                            {editMode && (
                                <Button variant="primary" onClick={()=>handleSubmit()}>Submit</Button>
                            )}
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="text-center" style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <p style={{ fontWeight: 'bold' }}>
                        Didn't find the product? To add a new one, <Link to="/addProduct" style={{color:"red",fontWeight:"600"}}>Click Here!!</Link>
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export { ManageExistingStock };
