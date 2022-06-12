import React from 'react';
import ProductContainer from './ProductContainer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className='home'>
      <div className='container'>
        <ProductContainer />
      </div>
      <Fab
        color='primary'
        sx={{ position: 'absolute', top: 0, right: 0 }}
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
