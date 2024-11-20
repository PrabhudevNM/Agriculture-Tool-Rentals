import { Col, Row, Divider } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getProductById } from "../redux-toolkit/createAsyncThunk/productThunk";
import { bookProduct } from "../redux-toolkit/createAsyncThunk/bookingThunk";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import 'aos/dist/aos.css';
import { message } from "antd";
import axios from "../config/axios";

function BookingProduct() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const { currentProduct, user } = useSelector(state => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init();
  }, []);

  // Fetch product details based on ID in the URL
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  // Detect successful payment by checking URL parameters for session ID
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    
    if (sessionId) {
      handlePaymentSuccess(sessionId);
    }
  }, [location]);

  // Handle successful payment: create booking and clear pending state
  const handlePaymentSuccess = async (sessionId) => {
    try {
      if (currentProduct && user) {
        const bookingData = {
          productName: currentProduct.title,
          productId: currentProduct._id,
          rentalPriceForTime: [{
            period: currentProduct.rentalPriceForTime[0].period,
            price: currentProduct.rentalPriceForTime[0].price
          }],
          user: user._id,
          paymentStatus: "completed",
          transactionId: sessionId
        };

        // Dispatch booking creation
        await dispatch(bookProduct(bookingData)).unwrap();
        message.success("Payment successful! Your booking is confirmed.");
        navigate('/user-bookings');
      }
    } catch (error) {
      console.error('Error processing successful payment:', error);
      message.error("Failed to confirm booking after payment");
    }
  };

  // Function to book the product now without payment
  const BookNow = async () => {
    const reqObj = {
      productName: currentProduct.title,
      user: user?._id,
      productId: currentProduct._id,
      rentalPriceForTime: [{
        period: currentProduct.rentalPriceForTime[0].period,
        price: currentProduct.rentalPriceForTime[0].price
      }],
      // transactionId: sessionId,  // Simulated transaction ID
    };

    try {
      await dispatch(bookProduct(reqObj)).unwrap();
      message.success("Product booked successfully!");
      navigate('/user-bookings');
      console.log(reqObj);
    } catch (error) {
      message.error("Failed to book the product.");
      console.error("Booking error:", error);
    }
  };

  // Initiate payment process for the selected product
  const makePayment = async (product) => {
    setLoading(true);
    try {
      const paymentData = {
        productId: product._id,
        productName: product.title,
        rentalPriceForTime: [{
          period: product.rentalPriceForTime[0].period,
          price: product.rentalPriceForTime[0].price
        }]
      };

      // Directly proceed to payment API and handle redirection
      const response = await axios.post('/api/create-checkout-session', paymentData,{ headers: { 'Authorization': localStorage.getItem('token') } });

      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to the payment page
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      message.error("It should be above 45.rs then you can book. Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
    <div className="container mt-4">
      
      <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img 
            src={currentProduct?.file} 
            alt={currentProduct?.title}
            className="product-img2 bs1 w-100" 
            data-aos="flip-left" 
            data-aos-duration="1500" 
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>Product Details</Divider>
          <div style={{ textAlign: "right" }}>
            <p><b>Name:</b> {currentProduct?.title}</p>
            <p><b>Specification:</b> {currentProduct?.description}</p>
            <p>
              {currentProduct?.rentalPriceForTime?.length > 0 ? (
                <>
                  <b>Rent Price: </b> 
                  Time: {currentProduct.rentalPriceForTime[0].period} - ₹{currentProduct.rentalPriceForTime[0].price} /-
                </>
              ) : (
                'Rental Price information not available'
              )}
            </p>
            <p><b>Category:</b> {currentProduct?.category}</p>
            <p><b>Owner's Name:</b> {currentProduct?.owner?.username}</p>
            <p><b>Owner's Email:</b> {currentProduct?.owner?.email}</p>
            <p><b>Owner's Phone:</b> {currentProduct?.owner?.phone}</p>
          </div>
          <br />
          <button 
            className="btn1" 
            onClick={() => makePayment(currentProduct)}
            disabled={loading || !currentProduct}
          >
            {loading ? 'Processing...' : 'Book Now'}
          </button>

          {/* Alternative booking option without payment */}
          <button 
            className="btn5" 
            onClick={BookNow} 
            disabled={loading || !currentProduct}
          >
            Book Now (Without Payment)
          </button>
        </Col>
      </Row>
      </div>
    </DefaultLayout>
  );
}

export default BookingProduct;
