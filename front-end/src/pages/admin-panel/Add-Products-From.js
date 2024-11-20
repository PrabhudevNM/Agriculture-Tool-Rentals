import React, { useState } from 'react';
import axios from '../../config/axios'
import { Form, Input, Select, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../../css/Add_Product_Form.css'

const { Option } = Select;

const ProductForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const handleSubmit = async (values) => {
    const price = values.price;
    const period = values.period;

    if (price <= 0) {
      message.error('Product price must be greater than 0.');
      return;
    }

    const formDataToSend = new FormData();
    

    Object.keys(values).forEach(key => {
      if (key === 'file') {
      } else if (key === 'price' || key === 'period') {
      } else {
        formDataToSend.append(key, values[key]);
      }
    });

    // Append file if it's selected
    if (values.file && values.file.fileList[0]) {
      formDataToSend.append('file', values.file.fileList[0].originFileObj);
    }

    // Append rentalPriceForTime as a JSON string (handled by backend)
    const rentalPriceForTime = JSON.stringify([{ price, period }]);
    formDataToSend.append('rentalPriceForTime', rentalPriceForTime);

    try {
      const response = await axios.post('/api/users/product', formDataToSend, {
        headers: { 'Authorization': localStorage.getItem('token') },
      });
      console.log(response.data)

      message.success('Product created successfully!');
      setIsFormVisible(false) // Hide the form after submission
    } catch (error) {
      console.error('Error creating product:', error);
      message.error('Error creating product.');
    }
  };

  return (
    <div className="form-container">
    <p>Click Below Button To Add Product</p>
      <Button type="primary" size="large" onClick={() => setIsFormVisible(true)}>
        Add Your Product
      </Button>

      {isFormVisible && (
        <Form onFinish={handleSubmit} style={{ marginTop: '20px', maxWidth: '400px' }}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the product title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the product description' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="File"
            name="file"
            rules={[{ required: true, message: 'Please upload a file' }]}
          >
            <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Rental Price" required>
            <Input.Group compact>
              <Form.Item
                name="period"
                noStyle
                rules={[{ required: true, message: 'Please select a period' }]}
              >
                <Select placeholder="Select" style={{ width: '50%' }}>
                  <Option value="day">Day</Option>
                  <Option value="week">Week</Option>
                  <Option value="month">Month</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="price"
                noStyle
                rules={[{ required: true, message: 'Please enter a price' }]}
              >
                <Input type="number" placeholder="Price" style={{ width: '50%' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select Tool">
              <Option value="tractor">Tractor</Option>
              <Option value="tractor tool">Tractor Tool</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block>
            Create Product
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ProductForm
