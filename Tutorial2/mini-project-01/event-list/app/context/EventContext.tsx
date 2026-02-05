"use client"
import React, { createContext, useEffect, useReducer, useState } from "react"

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

type Action =
    | { type: "INIT"; payload: EventItem[] }
    | { type: "ADD_EVENT"; payload: { title: string; date: string } }
    | { type: "TOGGLE_EVENT"; payload: { id: number } }
    | { type: "DELETE_EVENT"; payload: { id: number } }
    | { type: "CLEAR_ALL" }

const eventReducer = (state: EventItem[], action: Action): EventItem[] => {
    switch (action.type) {
        case "INIT":
            return action.payload
        case "ADD_EVENT":
            return [
                ...state,
                { id: Date.now(), title: action.payload.title, date: action.payload.date }
            ]
        case "TOGGLE_EVENT":
            return state.map((e) =>
                e.id === action.payload.id ? { ...e, done: !e.done } : e
            )
        case "DELETE_EVENT":
            return state.filter((e) => e.id !== action.payload.id);
        case "CLEAR_ALL":
            return [];
        default:
            return state;
    }
}
export const EventContext = createContext<EventContextType>({} as EventContextType)

export const EventProvider = ({ children }: { children: React.ReactNode }) => {

    const [events, dispatch] = useReducer(eventReducer, []);

    //Load once on client
    useEffect(() => {
        const stored = localStorage.getItem("events");
        if (stored) {
            dispatch({
                type: "INIT",
                payload: JSON.parse(stored)
            })
        }
    }, []);

    //Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events))
        console.log("local storage updated")
    }, [events])

    //add
    const addEvent = (title: string, date: string) => {
        dispatch({ type: "ADD_EVENT", payload: { title, date } })
    }

    //toggle
    const toggleEvent = (id: number) => {
        dispatch({ type: "TOGGLE_EVENT", payload: { id } })
    }

    //const delete
    const deleteEvent = (id: number) => {
        dispatch({ type: "DELETE_EVENT", payload: { id } })
    }

    const clearAll = () => {
        dispatch({ type: "CLEAR_ALL" })
    }

    return (
        <EventContext.Provider value={{ events, addEvent, toggleEvent, deleteEvent, clearAll }}>
            {children}
        </EventContext.Provider>
    )
}