import { useEffect } from 'react';
import { Table, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../redux-toolkit/createAsyncThunk/bookingThunk';
import DefaultLayout from '../components/DefaultLayout';

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('User is not authenticated');
        return;
      }

      dispatch(getAllBookings());
    };

    fetchBookings();
  }, [dispatch]);

  if (loading) {
    return <Spin tip="Loading bookings..." />;
  }

  if (error) {
    message.error(error);
  }

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
      title: 'Booking ID',
      dataIndex: '_id',
      key: 'bookingId',
    },
    {
      title: 'Booking Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <DefaultLayout>
    <div>
      <h2>Your Bookings</h2>
      <Table
        dataSource={bookings}  // Ensure bookings is an array
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
    </DefaultLayout>
  );
};

export default UserBookings;
