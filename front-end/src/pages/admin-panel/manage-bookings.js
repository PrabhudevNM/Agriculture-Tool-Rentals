import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from '../../config/axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('User is not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/admin-listBookings',{headers:{'Authorization':localStorage.getItem('token')}});
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch bookings');
        message.error(err.response?.data?.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Rental Period',
      dataIndex: 'rentalPriceForTime',
      key: 'rentalPeriod',
      render: (rentalPriceForTime) => rentalPriceForTime?.[0]?.period || 'N/A',
    },
    {
      title: 'Rental Price',
      dataIndex: 'rentalPriceForTime',
      key: 'rentalPrice',
      render: (rentalPriceForTime) => `₹${rentalPriceForTime?.[0]?.price || 0}`,
    },
    {
      title: 'Booking Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
      <div className="container mt-4">
        <h2>Bookings List-{bookings.length}</h2>
        <Table
          dataSource={bookings}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          loading={loading} // Show loading spinner while fetching data
        />
      </div>
  );
};

export default UserBookings;
