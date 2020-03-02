import React, { useReducer } from 'react';
import MobileContext from './mobileContext';
import MobileReducer from './mobileReducer';
import { SEARCH_MOBILES, SET_LOADING, CLEAR_MOBILES } from '../types';

const MobileState = props => {
  const initialState = {
    mobiles: [],
    loading: false
  };

  const [state, dispatch] = useReducer(MobileReducer, initialState);

  // Search Mobiles
  const searchMobiles = async text => {
    setLoading();
    let mobs;
    const res = await fetch('http://localhost:5000/Manufacturers');
    const manufacturers = await res.json();
    for (let el of manufacturers) {
      if (el.Manufacturer === text) {
        mobs = el.Models;
      }
    }
    dispatch({
      type: SEARCH_MOBILES,
      payload: mobs
    });
  };

  // update CartItem

  const updateCartItem = async cartItem => {
    try {
      const res = await fetch(`http://localhost:5000/CartItems/1`, {
        method: 'PUT',
        body: JSON.stringify(cartItem),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  // Clear Mobiles
  const clearMobiles = () => dispatch({ type: CLEAR_MOBILES });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Add Mobile to Cart
  const addTocart = () => {};

  return (
    <MobileContext.Provider
      value={{
        mobiles: state.mobiles,
        manufacturer: state.manufacturer,
        loading: state.loading,
        searchMobiles,
        clearMobiles,
        addTocart,
        updateCartItem
      }}
    >
      {props.children}
    </MobileContext.Provider>
  );
};

export default MobileState;
