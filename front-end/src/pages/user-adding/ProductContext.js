import  { createContext, useReducer } from 'react';

export const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
      };
    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        )
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });

  const setProducts = (products) => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  };

  const removeProduct = (id) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: id });
  };

  const editProduct = (updatedProduct) => {
    dispatch({ type: 'EDIT_PRODUCT', payload: updatedProduct });
  };

  return (
    <ProductContext.Provider value={{ state, setProducts, removeProduct, editProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
