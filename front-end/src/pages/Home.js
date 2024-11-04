import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllProducts } from '../redux-toolkit/createAsyncThunk/productThunk';// Adjust the import path
import { Col, Row, Divider, DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom'
const { RangePicker } = DatePicker;

function Home() {
    const { products } = useSelector(state => state.products); // Selecting products from Redux state
    // const { loading } = useSelector(state => state.alerts); // Uncomment if using alerts

    const [totalProducts, setTotalProducts] = useState([]);  // Replace 'totalCars' with 'totalProducts'
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts()); // Dispatch the RTK thunk action for products
    }, [dispatch]);

    useEffect(() => {
        setTotalProducts(products); // Update totalProducts whenever products changes
    }, [products]);

    function setFilter(values) {
        const selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm');
        const selectedTo = moment(values[1], 'MMM DD yyyy HH:mm');
        const temp = [];

        for (let product of products) {
            if (product.bookedTimeSlots.length === 0) {
                temp.push(product);
            } else {
                for (let booking of product.bookedTimeSlots) {
                    if (
                        selectedFrom.isBetween(booking.from, booking.to) ||
                        selectedTo.isBetween(booking.from, booking.to) ||
                        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
                        moment(booking.to).isBetween(selectedFrom, selectedTo)
                    ) {
                        // Do nothing, this product is already booked
                    } else {
                        temp.push(product); // Add product if it's not booked
                    }
                }
            }
        }

        setTotalProducts(temp);
    }

    return (
        <DefaultLayout>

            <Row justify='center' gutter={16} className='mt-2'>
                
                {totalProducts.map(product => (
                    <Col lg={5} sm={24} xs={24}>
                        <div className="product p-2 bs1">
                            <img src={`http://localhost:8020${product.file}`} className="productimg" />

                            <div className="product-content d-flex align-items-center justify-content-between">
                                <div className='text-left pl-2'>

                                    <p>{product.title}</p>
                                    <p>{product.rentalPriceForTime && product.rentalPriceForTime.length > 0 ? 
                                        `Rent Price:- Time: ${product.rentalPriceForTime[0].period} - ₹${product.rentalPriceForTime[0].price} /-` 
                                            : 
                                        'Rental Price information not available'}</p>
                                </div>

                                <div>
                                    <button className="btn1 mr-2">
                                        <Link to={`/booking/${product._id}`}>Book Now</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

        </DefaultLayout>
    );
}

export default Home;
