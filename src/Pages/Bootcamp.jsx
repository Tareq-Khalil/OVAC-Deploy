import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import StarField from '../Components/StarField'
import BootcampHero from '../Components/BootcampHero'
import BootcampStats from '../Components/BootcampStats'
import BootcampEligibility from '../Components/BootcampEligibility'
import BootcampProgramContent from '../Components/BootcampProgramContent'
import BootcampCTA from '../Components/BootcampCTA'

const Bootcamp = () => {
  return (
    <div className='bg-black min-h-screen w-full overflow-x-hidden'>
      <div className='relative z-50'>
        <NavBar />
      </div>
      <div className='fixed inset-0 z-0'>
        <StarField />
      </div>
      <main className='relative z-10 w-full'>
        <section className='w-full px-4 sm:px-6 lg:px-8'>
          <div className='container mx-auto'>
            <BootcampHero />
          </div>
        </section>
        <section className='w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16'>
          <div className='container mx-auto'>
            <BootcampStats />
          </div>
        </section>
        <section className='w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16'>
          <div className='container mx-auto'>
            <BootcampEligibility />
          </div>
        </section>
        <section className='w-full'>
          <BootcampProgramContent />
        </section>
        <section className='w-full'>
          <BootcampCTA />
        </section>
      </main>
      <footer className='relative z-10 w-full'>
        <Footer />
      </footer>
    </div>
  )
}
export default Bootcamp