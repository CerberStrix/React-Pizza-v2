import React from 'react';

import { Header } from './components/Header';
// import Home from './pages/Home';

import './scss/app.scss';
import NotFoundBlock from './components/NotFoundBlock';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';

// eslint-disable-next-line space-before-function-paren
function App() {
  const [searchvalue, setSearchValue] = React.useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <Header searchvalue={searchvalue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchvalue={searchvalue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
