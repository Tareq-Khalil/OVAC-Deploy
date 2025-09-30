import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import Index from './Pages/index.jsx'
import Gallery from './Pages/gallery.jsx'
import About from './Pages/About.jsx'
import Bootcamp from './Pages/Bootcamp.jsx'
import BootcampRegistration from './Pages/BootcampRegistration.jsx';
import AdminPanel from './Pages/AdminPanel.jsx';
import NavBar from './Components/NavBar.jsx'
import DB from './assets/images/Db.json'
import '../public/fonts/fonts.css';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Example route */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bootcamp" element={<Bootcamp />} />
        <Route path="/bootcamp-registration" element={<BootcampRegistration />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  )
}



export default App
