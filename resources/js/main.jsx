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
import Donate from './pages/Donate';
import SupportSites from './pages/SupportSites';
import Contact from './pages/Contact';
import GoogleAuthRedirect from './components/GoogleAuthRedirect';
import { AuthLayout } from './layouts/AuthLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">        
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/donate' element={<Donate />} />
        <Route path='/sites' element={<SupportSites />} />
        <Route path='/contact' element={<Contact />} /> 
        <Route path="/auth/google/callback" element={<GoogleAuthRedirect />} />
      </Route>
      <Route element={<AuthLayout />}>
        
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