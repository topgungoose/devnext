import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import '../styles/Post.css';

export default function Post({ handleClose }) {
  const [productType, setProductType] = useState('');
  const [postState, setPostState] = useState({
    type: '',
    name: '',
    price: 0,
    details: '',
    url: '',
  });

  // const handleChange = (event) => {
  //   setProductType(event.target.value);
  // };

  //<DropDownList data={categories} onChange={e => setCategory(e.value)} />

  function handlePriceChange(event) {
    event.persist();
    setPostState((prevPostData) => {
      if (!event.target.value) {
        return {
          ...prevPostData,
          price: 0,
        };
      } else
        return {
          ...prevPostData,
          price: parseInt(event.target.value),
        };
    });
  }
  console.log(postState);

  function handleNameChange(event) {
    event.persist();
    setPostState((prevPostData) => {
      return {
        ...prevPostData,
        name: event.target.value,
      };
    });
  }
  function handleUrlChange(event) {
    event.persist();
    setPostState((prevPostData) => {
      return {
        ...prevPostData,
        url: event.target.value,
      };
    });
  }
  function handleDetailsChange(event) {
    event.persist();
    setPostState((prevPostData) => {
      return {
        ...prevPostData,
        details: event.target.value,
      };
    });
  }
  function handleTypeChange(event) {
    setPostState((prevPostData) => {
      return {
        ...prevPostData,
        type: event.target.value,
      };
    });
  }

  // MAKE SEPARATE HANDLE CHANGE FOR SELECT TYPE

  function handleSubmit(event) {
    // This preventDefault wont re-render our page with default values before we submit
    // event.preventDefault();
    fetch('http://localhost:8080/api/user/sell/:userId', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(postState),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success', data);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
    setPostState({
      type: '',
      name: '',
      price: 0,
      details: '',
      url: '',
    });
    handleClose();
  }

  return (
    <div className='post'>
      <h1 style={{ textAlign: 'center' }}>Post your product!</h1>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 3, width: '50ch' },
          '& .MuiFormControl-root': { m: 3, width: '50ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div className='post'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Select type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='type'
              value={postState.type}
              label='Product type'
              // onChange={(e) => setProductType(e.value)}
              onChange={handleTypeChange}
            >
              <MenuItem value={'Product'}>Product</MenuItem>
              <MenuItem value={'Service'}>Services</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label='Title'
            placeholder='Tell us the name of your product or service'
            onChange={handleNameChange}
            name='name'
            value={postState.name}
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor='outlined-adornment-amount'>Price</InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              // value={values.amount}
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
              label='Amount'
              name='price'
              value={postState.price}
              onChange={handlePriceChange}
            />
          </FormControl>
          <TextField
            label='Description'
            multiline
            rows={3}
            variant='outlined'
            placeholder="Tell us more about about what you're selling"
            onChange={handleDetailsChange}
            name='details'
            value={postState.details}
          />
          <TextField
            label='Image URL'
            placeholder='Enter image URL'
            onChange={handleUrlChange}
            name='url'
            value={postState.url}
          />
        </div>
        <Stack
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          direction='row'
          spacing={2}
        >
          <Button
            sx={{ backgroundColor: '#80ed99' }}
            variant='contained'
            onClick={handleSubmit}
          >
            Post!
          </Button>
          <Button variant='outlined' color='error' onClick={handleClose}>
            CANCEL
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
