import React from 'react'
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

import "../styles/Post.css";

export default function Post({handleClose}) {
  const [productType, setProductType] = React.useState('');

  const handleChange = (event) => {
    setProductType(event.target.value);
  };


  return (
    <div className="post">
      <h1 style={{textAlign:"center"}}>Post your product!</h1>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: '50ch' },
          '& .MuiFormControl-root': { m: 3, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <div className="post">
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productType}
              label="Product type"
              onChange={handleChange}
            >
              <MenuItem value={"Product"}>Product</MenuItem>
              <MenuItem value={"Services"}>Services</MenuItem>
            </Select>
          </FormControl>
        
          <TextField
            label="Title"
            placeholder="Tell us the name of your product or service"
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              // value={values.amount}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
          />
        </FormControl>
          <TextField 
            label="Description"
            multiline
            rowsMax={10}
            variant="outlined"
            placeholder="Tell us more about about what you're selling"
          />
          <TextField
            label="Image URL"
            placeholder="Enter image URL"
          />
        </div>
      <Stack sx={{display:"flex", justifyContent: "flex-end"}} direction="row" spacing={2}>
        <Button sx={{backgroundColor:"#80ed99"}} variant="contained">Post!</Button>
        <Button variant="outlined" color="error" onClick={handleClose}>CANCEL</Button>
      </Stack>
    </Box>
    </div>
  )
}

