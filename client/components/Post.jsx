import React, { useState } from 'react';

/** MUI Components */
import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Button,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

/** Styles */
import '../styles/Post.css';

export default function Post({ handleClose, id, username, reset }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [details, setDetails] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');

  /** - Posts the products or services to the database  */
  function handleSubmit() {
    const postState = { name, price, details, url, type, username };
    fetch(`api/user/sell/:${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(postState),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success', data);
        reset();
      })
      .catch((err) => {
        console.error('Error:', err);
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
              value={type}
              label='Product type'
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={'Product'}>Product</MenuItem>
              <MenuItem value={'Service'}>Services</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label='Title'
            placeholder='Tell us the name of your product or service'
            onChange={(e) => setName(e.target.value)}
            name='name'
            value={name}
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor='outlined-adornment-amount'>Price</InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
              label='Amount'
              name='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </FormControl>
          <TextField
            label='Description'
            multiline
            rows={3}
            variant='outlined'
            placeholder="Tell us more about about what you're selling"
            onChange={(e) => setDetails(e.target.value)}
            name='details'
            value={details}
          />
          <TextField
            label='Image URL'
            placeholder='Enter image URL'
            onChange={(e) => setUrl(e.target.value)}
            name='url'
            value={url}
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
