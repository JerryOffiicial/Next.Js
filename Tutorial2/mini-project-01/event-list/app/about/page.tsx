import React from 'react'
import Navbar from '../components/Navbar'

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className='pt-24 px-10'>
                <h1 className='text-3xl font-bold mb-4'>About</h1>
                <p>This is a simple Event Tracker with Next,js App Router, React Context, and TypeScript</p>
            </div>
        </>
    )
}

export default AboutPage