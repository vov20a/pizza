
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    //используем Outlet - шаблон в MainLayout

    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
