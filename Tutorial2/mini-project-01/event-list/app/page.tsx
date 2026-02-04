"use client"
import React, { useState } from 'react'

type EventItem = {
  id: number;
  title: string;
  date: string;
  done?: boolean
}
const EventPage = () => {



  const [events, setEvents] = useState<EventItem[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const addEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEvents((prev) => [
      ...prev,
      { id: Date.now(), title, date }
    ]);
    setTitle("")
    setDate("")
  }

  return (
    <div className='h-screen flex gap-10 flex-col justify-start items-center bg-red-50 pt-6'>
      <h1 className='text-3xl'>Add event</h1>

      <form onSubmit={addEvent} className='bg-gray-300 p-5 flex gap-4'>
        <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' className='border border-red-900 rounded-2xl px-2.5 py-1.5 outline-none' required />
        <input value={date} onChange={e => setDate(e.target.value)} type="date" required />

        <button type='submit' className='ml-5 text-md bg-black text-white rounded-full p-2 cursor-pointer'>Add</button>
      </form>

      <div>
        {events.length > 0 && <h1 className='text-xl'>Events List</h1>}
        <table className='mt-5 max-w-3xl border border-gray-400'>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className='border-b border-gray-300'>
                <td className='px-4 py-2'>{event.title} - {event.date}</td>
                <td onClick={() => setEvents(events.map(e =>
                  e.id === event.id ? { ...e, done: !e.done } : e
                ))}

                  className={`cursor-pointer px-2.5 py-1.5 rounded-2xl ${event.done ? 'bg-green-400' : 'bg-gray-200'}`}
                >{event.done ? 'Done' : 'Pending'}</td>
                <td
                  onClick={() =>
                    setEvents(events.filter(e => e.id !== event.id))
                  }
                  className='cursor-pointer rounded-2xl bg-red-400 px-2.5 py-1.5 text-center'
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length > 0 && <button onClick={() => setEvents([])} className='cursor-pointer rounded-2xl bg-red-400 px-2.5 py-1.5 text-center mt-5'>Clear All</button>}
      </div>
    </div>
  )
}

export default EventPage