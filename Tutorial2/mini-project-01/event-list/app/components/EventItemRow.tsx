import React from 'react'
import { EventItem } from '../context/EventContext'

type Props = {
    event: EventItem;
    onToggle: (id: number) => void
    onDelete: (id: number) => void

}

const EventItemRow = ({ event, onToggle, onDelete }: Props) => {
    return (
        <tr className="border-b">
            <td className="px-4 py-2">
                {event.title} – {event.date}
            </td>
            <td
                onClick={() => onToggle(event.id)}
                className={`cursor-pointer px-3 py-1 rounded-xl ${event.done ? "bg-green-400" : "bg-gray-200"
                    }`}
            >
                {event.done ? "Done" : "Pending"}
            </td>
            <td
                onClick={() => onDelete(event.id)}
                className="cursor-pointer bg-red-400 px-3 py-1 rounded-xl"
            >
                Delete
            </td>
        </tr>
    )
}

export default EventItemRow