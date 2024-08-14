import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

interface Props{
    handleDateClick: (arg: any) => void
}

export default function Calendar({ handleDateClick }: Props) {

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[
                { title: 'event 1', date: '2024-08-12' },
                { title: 'event 2', date: '2024-08-20' }
            ]}
            dateClick={handleDateClick}
        />
    )
}