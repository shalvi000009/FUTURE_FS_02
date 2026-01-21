import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/home'
import Collection from './pages/collection'
import About from './pages/about'
import Contact from './pages/contact'
import Product from './pages/product'
import Cart from './pages/cart'
import Login from './pages/login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import SearchBar from './components/SearchBar'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Safe route wrapper component
const SafeRoute = ({ element: Component }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        {Component ? <Component /> : <div>Page not found</div>}
      </Suspense>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ErrorBoundary>
        <ToastContainer />
        <Navbar />
        <SearchBar />
      </ErrorBoundary>
      <Routes>
        <Route path='/' element={<SafeRoute element={Home} />} />
        <Route path='/collection' element={<SafeRoute element={Collection} />} />
        <Route path='/about' element={<SafeRoute element={About} />} />
        <Route path='/contact' element={<SafeRoute element={Contact} />} />
        <Route path='/product/:productId' element={<SafeRoute element={Product} />} />
        <Route path='/cart' element={<SafeRoute element={Cart} />} />
        <Route path='/login' element={<SafeRoute element={Login} />} />
        <Route path='/place-order' element={<SafeRoute element={PlaceOrder} />} />
        <Route path='/orders' element={<SafeRoute element={Orders} />} />
      </Routes>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}

export default App
