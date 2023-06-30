import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFoundBlock from './components/NotFoundBlock/index';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

// eslint-disable-next-line space-before-function-paren
function App (): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
}

export default App;
