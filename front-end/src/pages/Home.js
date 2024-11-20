import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllProducts } from '../redux-toolkit/createAsyncThunk/productThunk';
import { Col, Row, Input, Select, Alert } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

function Home() {
    const { products } = useSelector(state => state.products);

    const [totalProducts, setTotalProducts] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [noResults, setNoResults] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        setTotalProducts(products);
    }, [products]);

    const handleSearch = () => {
        let filteredProducts = products;

        if (searchTitle) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        }

        if (searchCategory) {
            filteredProducts = filteredProducts.filter(product =>
                product.category.toLowerCase() === searchCategory.toLowerCase()
            );
        }

        setTotalProducts(filteredProducts);
        setNoResults(filteredProducts.length === 0);
    };

    useEffect(() => {
        handleSearch();
    }, [searchTitle, searchCategory, products]);

    return (
        <DefaultLayout>
            <div className="container mt-4">
                  <Row justify="center" gutter={16} className="search-row">
            <Col xs={24} sm={12} md={8}>
                <Search
                    placeholder="Search by Name"
                    value={searchTitle}
                    onChange={e => setSearchTitle(e.target.value)}
                    enterButton
                    allowClear
                />
            </Col>
            <Col xs={24} sm={12} md={8}>
                <Select
                    value={searchCategory}
                    onChange={value => setSearchCategory(value)}
                    style={{ width: '100%' }}
                >
                    <Option value="">All Categories</Option>
                    <Option value="tractor">Tractor</Option>
                    <Option value="tractor tool">Tractor Tool</Option>
                </Select>
            </Col>
        </Row>

            </div>

            {noResults ? (
                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                    <Alert
                        message="No Products Found"
                        description={<b>No products match your search criteria.</b>}
                        showIcon
                        style={{ maxWidth: '500px', margin: '0 auto' }}
                    />
                </div>
            ) : (
                <Row justify="center" gutter={[16, 16]} className="mt-2">
                {totalProducts.map(product => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                        <div className="product p-2 bs1">
                            <img
                                src={product.file}
                                className="productimg"
                                alt={product.title}
                            />
                            <div className="product-content d-flex align-items-center justify-content-between">
                                <div className="text-left pl-2">
                                    <p>{product.title}</p>
                                    <p>
                                        {product.rentalPriceForTime && product.rentalPriceForTime.length > 0
                                            ? `Rent Price:- Time: ${product.rentalPriceForTime[0].period} - ₹${product.rentalPriceForTime[0].price} /-`
                                            : 'Rental Price information not available'}
                                    </p>
                                </div>
                                <button className="btn1 mr-2">
                                    <Link to={`/booking/${product._id}`}>Book Now</Link>
                                </button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            )}
        </DefaultLayout>
    );
}

export default Home;