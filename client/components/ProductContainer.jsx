import * as React from 'react';
import ProductItem from './ProductItem';
import Grid from '@mui/material/Grid';

export default function ProductContainer() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {Array.from(Array(20)).map((_, index) => (
        <Grid item xs={4} sm={4} md={4} key={index}>
          <ProductItem />
        </Grid>
      ))}
    </Grid>
  );
}
