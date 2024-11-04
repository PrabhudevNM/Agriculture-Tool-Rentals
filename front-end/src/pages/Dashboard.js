// import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { products, category } = location.state || {}; // Get products and category from state

  return (
    <div>
      <h1>{category} Dashboard</h1>
      <div>
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <img src={product.image} alt={product.name} width="150" />
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
