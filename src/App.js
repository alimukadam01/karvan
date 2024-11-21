import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about-us' element={<AboutUs/>}/>
          <Route path='/products' element={<ProductListing/>}>
            <Route path='products/:id' element={<ProductDetail/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
