// Main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { MainLayout } from './layouts/MainLayout';
import { History } from './pages/History';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">        
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
        {/* 
        <Route path='/blog/:title' element={<BlogDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} /> 
        */}
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);


function Main() {
 
  return(
    <RouterProvider router={router} />
    // <div className='dark:bg-black'>
    //     <Navbar />
    //     <Home />
    // </div>
  ) 
}

export default Main;

if (document.getElementById('root')) {
  const Index = ReactDOM.createRoot(document.getElementById("root"));

  Index.render(
    <React.StrictMode>
      <Main/>
    </React.StrictMode>
  );
}