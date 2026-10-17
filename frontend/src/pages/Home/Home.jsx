import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTarget } from '../../lib/lenis'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import About from '../../components/About/About'
import Contact from '../../components/Contact/Contact'

const Home = () => {
    const { hash } = useLocation()

    useEffect(() => {
        if (!hash) return
        const id = hash.replace('#', '')
        const timer = window.setTimeout(() => {
            scrollToTarget(id)
        }, 80)
        return () => window.clearTimeout(timer)
    }, [hash])

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
