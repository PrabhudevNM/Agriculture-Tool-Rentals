// App.js (or ProductsPage.js)
import  { useEffect, useContext, useState } from 'react';
import { ProductProvider, ProductContext } from './Product-Context';
import ProductTable from './Product-Table';
import axios from '../../config/axios';
import { message } from 'antd';

const ProductsPage = () => {
  const { setProducts,state } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/users/product', {
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
      <h2>Products List-{state.products.length}</h2>
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
