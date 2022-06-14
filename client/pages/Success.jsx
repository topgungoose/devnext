import React from 'react';
import checkoutImg from '../assets/CheckOutSwatty.png';
export default function Success() {
  return (
    <img
      src={checkoutImg}
      style={{ height: '100vh', width: '100%' }}
      alt='checkout complete'
    />
  );
}
