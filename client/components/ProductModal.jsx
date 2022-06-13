import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import '../styles/ProductModal.css';

export default function ProductModal({ handleClose }) {
  const data = { itemId: '62a686d32af2f50c8f15d894' };

  function handleClick() {
    fetch('http://localhost:8080/api/user/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((err) => {
        console.log(e.error);
      });
  }

  return (
    <div className='product-modal'>
      <div className='img-container'>
        <img
          className='imgModal'
          src='https://ithemes.com/wp-content/uploads/2019/08/What-is-Your-Website-Design-Process-Blog-Post-Feature-Image-36119-01.png'
        />
        <div className='txt-container'>
          <h1>Let me build with you a website with HTML/CSS/Javascript</h1>
          <Avatar
            alt='Howard Stark'
            src='https://dailysuperheroes.com/wp-content/uploads/2020/02/tony-stark.jpg'
            sx={{ width: 56, height: 56 }}
          />
          By Howard Stark
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor
            id eu nisl nunc mi ipsum. Duis at tellus at urna condimentum. Vitae
            tempus quam pellentesque nec nam aliquam sem et tortor. Odio ut sem
            nulla pharetra diam sit. Nisl purus in mollis nunc sed id. At erat
            pellentesque adipiscing commodo elit at. Pharetra massa massa
            ultricies mi. Faucibus ornare suspendisse sed nisi lacus sed viverra
            tellus in. Nunc vel risus commodo viverra maecenas accumsan lacus
            vel. Ac placerat vestibulum lectus mauris ultrices eros in cursus
            turpis. Feugiat in ante metus dictum. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Tempor id eu nisl nunc mi ipsum. Duis
            at tellus at urna condimentum. Vitae tempus quam pellentesque nec
            nam aliquam sem et tortor. Odio ut sem nulla pharetra diam sit. Nisl
            purus in mollis nunc sed id. At erat pellentesque adipiscing commodo
            elit at. Pharetra massa massa ultricies mi. Faucibus ornare
            suspendisse sed nisi lacus sed viverra tellus in. Nunc vel risus
            commodo viverra maecenas accumsan lacus vel.
            <br />
            <br />
            <br />
            Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis.
            Feugiat in ante metus dictum. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Tempor id eu nisl nunc mi ipsum. Duis
            at tellus at urna condimentum. Vitae tempus quam pellentesque nec
            nam aliquam sem et tortor. Odio ut sem nulla pharetra diam sit. Nisl
            purus in mollis nunc sed id. At erat pellentesque adipiscing commodo
            elit at. Pharetra massa massa ultricies mi. Faucibus ornare
            suspendisse sed nisi lacus sed viverra tellus in. Nunc vel risus
            commodo viverra maecenas accumsan lacus vel. Ac placerat vestibulum
            lectus mauris ultrices eros in cursus turpis. Feugiat in ante metus
            dictum.
          </p>
        </div>
      </div>
      <div className='product-modal'>
        <Stack
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          direction='row'
          spacing={2}
        >
          <FavoriteIcon
            sx={{ color: red[500], fontSize: 50 }}
            onClick={handleClose}
          />
          <Button
            onClick={handleClick}
            sx={{ backgroundColor: '#80ed99' }}
            variant='contained'
          >
            Buy!
          </Button>
          <Button variant='outlined' color='error' onClick={handleClose}>
            CANCEL
          </Button>
        </Stack>
      </div>
    </div>
  );
}
