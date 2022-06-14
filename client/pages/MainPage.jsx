// TODO: Group imports based on source
import Navbar from '../components/Navbar';
import Anchor from '../components/Anchor';
import Home from '../components/Home';
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Favs from '../components/Favs';
import MOCK_DATA from '../../MOCK_DATA';

import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const MainContainer = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function MainPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  // const [itemData, setItemData] = useState(MOCK_DATA);

  const [current, setCurrent] = useState('home');

  const itemData = MOCK_DATA.filter(({ name }) =>
    name.toLowerCase().includes(searchInput)
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let currentElement;

  if (current === 'home') {
    currentElement = <Home itemData={itemData} />;
  } else if (current === 'favs') {
    currentElement = <Favs />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
        theme={theme}
        setCurrent={setCurrent}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          justifyContent: 'space-between',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#9FAEE5',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
            <Avatar sx={{ backgroundColor: '#9FAEE5' }}>S</Avatar>
            <Typography variant='h5' component='p'>
              Satty
            </Typography>
          </Stack>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Anchor setCurrent={setCurrent} />
      </Drawer>
      <MainContainer open={open}>
        <DrawerHeader />
        {currentElement}
      </MainContainer>
    </Box>
  );
}
