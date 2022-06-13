import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ProductItem({ handleOpen }) {
  return (
    <Card onClick={handleOpen} sx={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia
        component='img'
        height='194'
        image='https://ithemes.com/wp-content/uploads/2019/08/What-is-Your-Website-Design-Process-Blog-Post-Feature-Image-36119-01.png'
        alt='Paella dish'
      />
      <CardContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={0}
        >
          <Typography variant='subtitle1' color='text.primary'>
            Product Name
          </Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            $20
          </Typography>
        </Stack>
        <Chip
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 1,
            backgroundColor: '#d9ed92',
          }}
          size='small'
          label='Product'
        />
      </CardContent>
    </Card>
  );
}
