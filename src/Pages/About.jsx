import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import StarField from '../Components/StarField'
import AboutHero from '../Components/AboutHero'
import WhoweAre from '../Components/WhoweAre'
import Workers from '../Components/Workers'
const About = () => {
  return (
    <div className='bg-black min-h-screen'>
      <NavBar />
      <StarField />
      {/* <AboutHero /> */}
      <WhoweAre />
      <Workers />
      <Footer />
    </div>
  )
}

export default About