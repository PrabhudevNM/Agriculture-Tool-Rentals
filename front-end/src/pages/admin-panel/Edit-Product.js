import React, { useContext,useState } from 'react';
import { ProductContext } from './Product-Context';
import { Modal, Form, Input, Button, message, Upload } from 'antd';
import axios from '../../config/axios';
import { UploadOutlined } from '@ant-design/icons';

const EditProduct = ({ product, isVisible, onClose }) => {
  const { editProduct } = useContext(ProductContext);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('description', values.description);

      // Handle rentalPriceForTime
      const rentalPriceForTime = [{
        period: values.period,
        price: values.price
      }];
      formData.append('rentalPriceForTime', JSON.stringify(rentalPriceForTime));

      // Handle file upload
      if (fileList.length > 0) {
        formData.append('file', fileList[0].originFileObj);
      }

      const response = await axios.put(`/api/users/edit-product-admin/${product._id}`, formData, {headers: {'Authorization': localStorage.getItem('token')}});

      editProduct(response.data);
      message.success('Product updated successfully');
      onClose();
    } catch (error) {
      console.error("Error editing product:", error);
      message.error('Failed to update product');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="Edit Product"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{
          title: product.title,
          description:product.description,
          category: product.category,
          period: product.rentalPriceForTime[0].period,
          price: product.rentalPriceForTime[0].price,
        }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="description" rules={[{ required: true, message: 'Please enter a description' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter a category' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="period" label="Rental Period" rules={[{ required: true, message: 'Please enter a rental period' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Rental Price" rules={[{ required: true, message: 'Please enter a rental price' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="file"
          label="File"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload 
            beforeUpload={() => false} 
            maxCount={1}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;