// import { Col, Row, Divider } from "antd";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
// import { getProductById } from "../redux-toolkit/createAsyncThunk/productThunk";
// import { bookProduct } from "../redux-toolkit/createAsyncThunk/bookingThunk";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import AOS from "aos";
// import 'aos/dist/aos.css';
// import { message } from "antd";
// import axios from "../config/axios"

// function BookingProduct() {
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
  
//   const { id } = useParams();
//   const { currentProduct, user } = useSelector(state => state.products);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   useEffect(() => {
//     if (id) {
//       dispatch(getProductById(id));
//     }
//   }, [dispatch, id]);

//   // Handle query params for payment success/failure
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const sessionId = queryParams.get('session_id');
    
//     if (sessionId) {
//       handlePaymentSuccess(sessionId);
//     }
//   }, [location]);

//   const handlePaymentSuccess = async (sessionId) => {
//     try {
//       // Get the pending booking data
//       const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking'));
      
//       if (pendingBooking) {
//         await dispatch(bookProduct({...pendingBooking,transactionId: sessionId})).unwrap();
        
//         message.success("Payment successful! Your booking is confirmed.");
//         localStorage.removeItem('pendingBooking');
//       }
//     } catch (error) {
//       console.error('Error processing successful payment:', error);
//       message.error("Failed to confirm booking after payment");
//     }
//   };

//   const makePayment = async (product) => {
//     setLoading(true);
//     try {
//       // Structure payment data to match schema exactly
//       const paymentData = {
//         productId: product._id,
//         productName: product.title,
//         rentalPriceForTime: [{
//           period: product.rentalPriceForTime[0].period,
//           price: product.rentalPriceForTime[0].price
//         }]
//       };

//       // Store booking data for after payment success
//       localStorage.setItem('pendingBooking', JSON.stringify({
//         productId: product._id,
//         productName: product.title,
//         amount: product.rentalPriceForTime[0].price
//       }));

//       // Create checkout session
//       const response = await axios.post('/api/create-checkout-session', paymentData,{headers:{'Authorization':localStorage.getItem('token')}});
//       localStorage.setItem('stripeId', response.data.id);
//       if (response.data.url) {
//         window.location.href = response.data.url;
//       } else {
//         throw new Error('No payment URL received');
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       message.error(error.response?.data?.message || "Payment failed. Please try again.");
//       localStorage.removeItem('pendingBooking');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DefaultLayout>
//       <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>
//         <Col lg={10} sm={24} xs={24} className='p-3'>
//           <img 
//             src={`http://localhost:8020${currentProduct?.file}`} 
//             alt={currentProduct?.title}
//             className="product-img2 bs1 w-100" 
//             data-aos="flip-left" 
//             data-aos-duration="1500" 
//           />
//         </Col>

//         <Col lg={10} sm={24} xs={24} className="text-right">
//           <Divider type="horizontal" dashed>Product Details</Divider>
//           <div style={{ textAlign: "right" }}>
//             <p><b>Name:</b> {currentProduct?.title}</p>
//             <p><b>Specification:</b> {currentProduct?.description}</p>
//             <p>
//               {currentProduct?.rentalPriceForTime?.length > 0 ? (
//                 <>
//                   <b>Rent Price: </b> 
//                   Time: {currentProduct.rentalPriceForTime[0].period} - ₹{currentProduct.rentalPriceForTime[0].price} /-
//                 </>
//               ) : (
//                 'Rental Price information not available'
//               )}
//             </p>
//             <p><b>Category:</b> {currentProduct?.category}</p>
//             <p><b>Owner's Name:</b> {currentProduct?.owner?.username}</p>
//             <p><b>Owner's Email:</b> {currentProduct?.owner?.email}</p>
//             <p><b>Owner's Phone:</b> {currentProduct?.owner?.phone}</p>
//           </div>
//           <br />
//           <button 
//             className="btn1" 
//             onClick={() => makePayment(currentProduct)}
//             disabled={loading || !currentProduct}
//           >
//             {loading ? 'Processing...' : 'Book Now'}
//           </button>
//         </Col>
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default BookingProduct;