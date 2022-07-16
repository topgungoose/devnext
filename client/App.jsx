import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import MainPage from './pages/MainPage';
import Success from './pages/Success';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='signup' element={<Signup />} />
        <Route path='home' element={<MainPage />} />
        <Route path='success' element={<Success />} />
      </Routes>
    </>
  );
}
