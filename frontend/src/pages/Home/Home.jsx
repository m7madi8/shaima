import React from 'react'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import About from '../../components/About/About'
import Contact from '../../components/Contact/Contact'

const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <Services />
            <Contact />
        </div >
    )
}

export default Home
