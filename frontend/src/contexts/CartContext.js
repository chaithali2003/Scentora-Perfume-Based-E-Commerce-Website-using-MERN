import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Helper function to calculate size multiplier
const getSizeMultiplier = (size) => {
  if (size === '100ml') return 1.75;
  return 1;
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.product._id === action.payload.product._id && item.size === action.payload.size);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product._id === action.payload.product._id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => !(item.product._id === action.payload.productId && item.size === action.payload.size))
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product._id === action.payload.productId && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: []
};

// Context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      cartItems.forEach(item => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Actions
  const addToCart = (product, size, quantity = 1) => {
    const priceForSize = product.price * getSizeMultiplier(size);
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, quantity, priceForSize } });
  };

  const removeFromCart = (productId, size) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, size } });
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calculate total
  const getTotal = () => {
    return state.items.reduce((total, item) => total + (item.priceForSize * item.quantity), 0);
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};