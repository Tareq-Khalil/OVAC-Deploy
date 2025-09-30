import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import StarField from '../Components/StarField'
import GallaryHero from '../Components/GallaryHero'

const Gallery = () => {
  return (
    <div className='bg-black min-h-screen'>
      <NavBar />
      <StarField />
      <GallaryHero />
      <Footer />
    </div>
  )
}

export default Gallery