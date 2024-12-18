import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about-us' element={<AboutUs/>}/>
          <Route path='/products' element={<ProductDetailPage/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
