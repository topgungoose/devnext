import React, { useState } from 'react';
import ProductContainer from './ProductContainer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../styles/Home.css';
import Dialog from '@mui/material/Dialog';
import Post from './Post';

export default function Home() {
  const [ open, setOpen ] = useState(false);
  const handleClose = () => setOpen(false)
  return (
    <div className='home'>
      <div className='container'>
        <ProductContainer />
      </div>
      <Fab
        color='primary'
        sx={{ position: 'absolute', top: 0, right: 0 }}
        aria-label='add'
        onClick = {() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog 
      fullWidth 
      open={open}
      maxWidth="sm"
      >
        <Post handleClose={handleClose}/>
      </Dialog>
    </div>
  );
}
