import { useEffect } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate=useNavigate()
 

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const stripeId = localStorage.getItem('stripeId');
        console.log(stripeId.data)
        
         await axios.put(`/api/payments/${stripeId}`, { paymentStatus: 'Successful' });
         navigate('/user-bookings')
      } catch (error) {
        console.error(error);
        
    }
  }

    verifyPayment();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
        <h1>Payment Successful</h1>
    </div>
  );
}
