import React, { useState } from 'react'

type EventFormProps = {
    onAdd: (title: string, date: string) => void;
}

const EventForm = ({ onAdd }: EventFormProps) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAdd(title, date);
        setTitle("");
        setDate("");
    };


    return (
        <form onSubmit={handleSubmit} className="bg-gray-300 p-5 flex gap-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                required
                className="border rounded-2xl px-3 py-1.5 outline-none"
            />
            <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                required
                className='outline-none'
            />
            <button type='submit' className="bg-black text-white rounded-full px-4 cursor-pointer">Add</button>
        </form>
    )
}

export default EventForm