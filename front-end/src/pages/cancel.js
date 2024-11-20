import { useEffect } from "react";
import axios from "../config/axios";

export default function Cancel() {

  useEffect(() => {
    const handleCancel = async () => {
      try {
        const stripeId = localStorage.getItem('stripeId');
        await axios.put(`/api/payments/${stripeId}`, { paymentStatus: 'Failed' });
      } catch (error) {
        console.error(error);
    }
  }
    handleCancel();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Payment Canceled</h1>
    </div>
  );
}
