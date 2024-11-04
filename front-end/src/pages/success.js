import { useEffect } from "react";
import axios from "../config/axios";

export default function Success() {
 

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const stripeId = localStorage.getItem('stripeId');
        console.log(stripeId.data)
        
         await axios.put(`/api/payments/${stripeId}`, { paymentStatus: 'Successful' });

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
