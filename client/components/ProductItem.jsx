import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ProductItem({
  name,
  price,
  url,
  details,
  type,
  _id,
  handleOpen,
}) {
  return (
    <Card onClick={handleOpen} sx={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia component='img' height='194' image={url} alt={name} />
      <CardContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={0}
        >
          <Typography variant='subtitle1' color='text.primary'>
            {name}
          </Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            ${price}
          </Typography>
        </Stack>
        <Chip
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 1,
            backgroundColor: type ? '#d9ed92' : '#caf0f8',
          }}
          size='small'
          label={type ? 'Product' : 'Service'}
        />
      </CardContent>
    </Card>
  );
}
