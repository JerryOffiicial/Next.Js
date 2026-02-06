import React from 'react'
import Hello from '../../components/Hello'


const Home = () => {
  console.log('What type of a component am I?')
  return (
    <main>
      <div>Welcome to Next.js!</div>
      <Hello/>
    </main>
  )
}

export default Home