// ProductTable.js
import React, { useContext, useState } from 'react';
import { ProductContext } from './ProductContext';
import { Table, Button, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../../config/axios';
import EditProduct from './EditProduct';

const ProductTable = () => {
  const { state, removeProduct } = useContext(ProductContext);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleRemoveProduct = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to remove this product?',
      onOk: async () => {
        try {
          await axios.delete(`/api/users/product/${id}`, {
            headers: {'Authorization': localStorage.getItem('token')}
          });
          removeProduct(id);
          message.success('Product removed successfully');
        } catch (error) {
          console.error("Error removing product:", error);
          message.error('Failed to remove product');
        }
      }
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Rental Price and Time',
      dataIndex: 'rentalPriceForTime',
      key: 'rentalPrice',
      render: (rentalPriceForTime) => `₹${rentalPriceForTime[0].price}, Time:(${rentalPriceForTime[0].period})`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(), 
    },
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      render: (file, record) => <img src={file} alt={record.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setProductToEdit(record);
              setEditModalVisible(true);
            }}
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleRemoveProduct(record._id)}
            style={{ marginLeft: '8px' }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={state.products} rowKey="_id" pagination={{ pageSize: 10 }} />
      {productToEdit && (
        <EditProduct
          product={productToEdit}
          isVisible={editModalVisible}
          onClose={() => {
            setEditModalVisible(false);
            setProductToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default ProductTable