import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import StarField from '../Components/StarField'
import Clouds from '../Components/Clouds'
import Hero from '../Components/Hero'
import VisionSection from '../Components/VisionSection'
import VisualartsSection from '../Components/VisualartsSection'
import Footer from '../Components/Footer'
const Index = () => {
  return (
    <div className='bg-black min-h-screen'>
      <NavBar />
      <StarField />
      <Hero />
      <VisionSection />
      <VisualartsSection />
      <Footer />
    </div>
  )
}

export default Index