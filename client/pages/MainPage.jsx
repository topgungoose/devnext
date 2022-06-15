import React, { useState, useEffect } from 'react';

/** Returns the location object that represents the current URL */
import { useLocation } from 'react-router-dom';

/** Components */
import { Home, Navbar, Favs, Anchor } from '../components';

/** MUI Components */
import {
  Box,
  Drawer,
  Typography,
  Divider,
  Avatar,
  Stack,
  IconButton,
  CssBaseline,
} from '@mui/material';

/** MUI Icons */
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

/** MUI Styles */
import { styled, useTheme } from '@mui/material/styles';

const drawerWidth = 240;

/** MUI Styled Components */
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

  const [openDrawer, setOpenDrawer] = useState(false); // determines drawer to open or not

  const [searchInput, setSearchInput] = useState(''); //search bar input
  // item data is the result of fetching database items
  const [itemData, setItemData] = useState([]); // all items displayed in main, potentially rename

  const [current, setCurrent] = useState('home'); // determines current area by endpoint

  /**
   * Filters itemData from name
   * @type {Array}
   */
  const filteredItemData = itemData.filter(({ name }) =>
    name.toLowerCase().includes(searchInput.toLocaleLowerCase())
  );

  /**
   * @typedef userData
   * @type {object}
   * @property {string} _id - user's ID.
   * @property {string} username - user's username.
   * @property {string} password - user's password.
   * @property {Array} products - Array of posted products items.
   * @property {Array} favs -  Array of favorite items.
   *
   */
  /**
   * @type {userData} userData
   */
  const userData = useLocation().state.data;

  /**
   * Opens Drawer Component
   */
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  /**
   * Closes Drawer Component
   */
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  /**
   * Fetches all Item Data from server and sets it to 'itemData' state
   */
  const getItems = () => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setItemData(data);
      })
      .catch((err) => console.log(err.message));
  };

  /**
   * Sets the 'itemData' state when the MainPage gets mounted
   */
  useEffect(() => {
    getItems();
  }, []);

  /**
   * @type {React.Component}
   */
  let currentElement;
  // Sets currentElement to the component to be rendered depending of the value of the variable "current"
  if (current === 'home') {
    currentElement = (
      <Home
        itemData={filteredItemData}
        reset={getItems}
        userId={userData._id}
        username={userData.username}
      />
    );
  } else if (current === 'favs') {
    currentElement = <Favs favs={userData.favs} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar
        {...{
          openDrawer,
          handleDrawerOpen,
          drawerWidth,
          theme,
          setCurrent,
          searchInput,
          setSearchInput,
        }}
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
        open={openDrawer}
      >
        <DrawerHeader>
          <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
            <Avatar sx={{ backgroundColor: '#9FAEE5' }}>
              {userData.username[0]}
            </Avatar>
            <Typography variant='h5' component='p'>
              {userData.username}
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
      <MainContainer open={openDrawer}>
        <DrawerHeader />
        {/* Current element changes depending on the value of "current" -- Either render home, favs, or other | refer to line 91 */}
        {currentElement}
      </MainContainer>
    </Box>
  );
}
