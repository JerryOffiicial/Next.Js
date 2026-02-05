'use client'

import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { EventContext } from '../context/EventContext'

const Stats = () => {
    const { events } = useContext(EventContext);

    const total = events.length;
    const completed = events.filter((e) => e.done).length

    return (
        <div>
            <Navbar />

            <div className='pt-24 px-10'>
                <h1 className='text-3xl font-bold mb-4'>Stats</h1>

                <p>Total Events: {total}</p>
                <p>Completed Events: {completed}</p>
                <p>Pendig Events: {total - completed}</p>
            </div>
        </div>
    )
}

export default Stats