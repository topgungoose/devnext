// TODO: STRETCH Feature: Modularize the code to work for Sign up and Login Component

// TODO: Group imports based on source
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cover from '../assets/cover.png';

export default function Login() {
  const [state, setState] = useState({ username: '', password: '' });
  // navigate is used whenever we want to navigate to another route, provided by react-router-dom
  const navigate = useNavigate();
  //******************* MUI **************************
  //Paperstyle injected into components "style" in return
  // MUI TODO: Make an single Object called stylesMUI and have these objects as the properties {}
  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 600,
    margin: '20px auto',
  };
  const avatarStyle = { backgroundColor: '#FF6F61' };
  const btnStyle = { margin: '8px 0' };
  // ***********************************************

  // submitHandler -> invoked when 'Sign In' button is clicked, When login form is submitted, perform fetch request, update state.
  const submitHandler = (event) => {
    event.preventDefault(); // prevents page from refreshing
    console.log(state);
    if (!state.username) alert('Please enter the Username');
    else if (!state.password) alert('Please enter the Password');
    else {
      //url where post request will be made to
      // Good place for login tests -> Check if username & password are truthy given an input
      const url = 'api/user/login';
      //in body we are sending object containing state which will get stringified and sent as JSON
      const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state), // stringified to JSON {username: , password: }
      };
      // fetching url to make POST request
      fetch(url, option)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            //if data is correct username/password -> pass fetched data as state
            navigate('/home', { state: data.data }); // on successful login, re-route user to home route (MainPage.jsx) <- inject the state into the component
          } else {
            alert(data.message);
            setState({ ...state, password: '' }); // on unsuccessful login attempt, alert user and reset password field
          }
        });
    }
  };
  // This is the changeHandler used in textfield component to change / update state
  const changeHandler = (event) => {
    // This setState is taking the previous state and only updating the name (username/password) with the value entered into input field
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
              <LockOpenIcon />
            </Avatar>
            <img style={{ width: '500px' }} src={cover} />
            <h1>Sign In</h1>
          </Grid>
          <TextField
            label='Username'
            name='username'
            placeholder='Username'
            variant='standard'
            fullWidth
            required
            onChange={changeHandler}
          />
          <TextField
            label='Password'
            name='password'
            placeholder='Password'
            type='password'
            variant='standard'
            fullWidth
            required
            onChange={changeHandler}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label='Remember me'
            />
          </FormGroup>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            fullWidth
            style={btnStyle}
            onClick={submitHandler}
          >
            Sign In
          </Button>
          <Typography>
            {/* nothing happening here with link, # is a default value */}
            <Link href='#'>Forgot Password?</Link>
          </Typography>
          <Typography>
            Don't have an account?
            <Link href='#'>Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}
