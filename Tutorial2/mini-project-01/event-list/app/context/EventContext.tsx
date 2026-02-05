"use client"
import React, { createContext, useEffect, useState } from "react"

export type EventItem = {
    id: number;
    title: string;
    date: string;
    done?: boolean;
};

type EventContextType = {
    events: EventItem[];
    addEvent: (title: string, date: string) => void;
    toggleEvent: (id: number) => void;
    deleteEvent: (id: number) => void;
    clearAll: () => void;
}

export const EventContext = createContext<EventContextType>({} as EventContextType)

export const EventProvider = ({ children }: { children: React.ReactNode }) => {

    const [events, setEvents] = useState<EventItem[]>([]);

    //Load once on client
    useEffect(() => {
        const stored = localStorage.getItem("events");
        if (stored) {
            setEvents(JSON.parse(stored));
        }
    }, []);
    //Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events))
        console.log("local storage updated")
    }, [events])

    //add
    const addEvent = (title: string, date: string) => {
        setEvents((prev) => [...prev, { id: Date.now(), title, date, done: false }])
    }

    //toggle
    const toggleEvent = (id: number) => {
        setEvents((prev) =>
            prev.map((e) => (e.id === id ? { ...e, done: !e.done } : e)))
    }

    //const delete
    const deleteEvent = (id: number) => {
        setEvents((prev) => prev.filter((e) => e.id !== id))
    }

    const clearAll = () => {
        setEvents([]);
    }

    return (
        <EventContext.Provider value={{ events, addEvent, toggleEvent, deleteEvent, clearAll }}>
            {children}
        </EventContext.Provider>
    )
}