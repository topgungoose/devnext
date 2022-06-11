import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Main from './pages/Main';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='signup' element={<Signup />} />
        <Route path='home' element={<Main />} />
      </Routes>
    </>
  );
}
