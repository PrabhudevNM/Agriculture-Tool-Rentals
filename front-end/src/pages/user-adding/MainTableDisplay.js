// App.js (or ProductsPage.js)
import  { useEffect, useContext, useState } from 'react';
import { ProductProvider, ProductContext } from './ProductContext';
import ProductTable from './ProductTable';
import axios from '../../config/axios';
import { message } from 'antd';

const ProductsPage = () => {
  const { setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/users/myproduct', {
          headers: {'Authorization': localStorage.getItem('token')}
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setProducts]);

  return (
    <div style={{ padding: '24px' }}>
      <h2>Product List</h2>
      {loading ? <div>Loading...</div> : <ProductTable />}
    </div>
  );
};

const MainTableDisplay = () => (
  <ProductProvider>
    <ProductsPage />
  </ProductProvider>
);

export default MainTableDisplay;
