import React from 'react';
import { Grid } from '@mui/material';
import FavsItem from './FavsItem';

export default function Favs() {
  return (
    <div style={{ height:"100vh", width: '100%', position:'relative'}}>
      <div style={{width:"80%", marginInline: "auto"}}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        sx={{marginInline: 'auto'}}
      >
        {Array.from(Array(20)).map((_, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <FavsItem/>
          </Grid>
        ))}
      </Grid>
      </div>
    </div>
  );
}
