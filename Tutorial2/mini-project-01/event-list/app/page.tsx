"use client"
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { EventContext } from './context/EventContext';
import EventForm from './components/EventForm';
import EventItemRow from './components/EventItemRow';

const EventPage = () => {

  const { events, addEvent, toggleEvent, deleteEvent, clearAll } = useContext(EventContext);

  return (
    <div className='h-screen flex gap-10 flex-col justify-start items-center bg-red-50 pt-6'>

      <Navbar />

      <h1 className='text-3xl mt-[70px]'>Add event</h1>

      <EventForm onAdd={addEvent} />

      <div>
        {events.length > 0 && <h1 className='text-xl'>Events List</h1>}
        <table className='mt-5 max-w-3xl border border-gray-400'>
          <tbody>
            {events.map((event) => (
              <EventItemRow key={event.id} event={event} onToggle={toggleEvent} onDelete={deleteEvent} />
            ))}
          </tbody>
        </table>

        {events.length > 0 && <button onClick={clearAll} className='cursor-pointer rounded-2xl bg-red-400 px-2.5 py-1.5 text-center mt-5'>Clear All</button>}
      </div>
    </div>
  )
}

export default EventPage