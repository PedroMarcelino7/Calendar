import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { EventClickArg } from '@fullcalendar/core'

interface Activity {
    ACTIVITY_CREATE_AT: string,
    ACTIVITY_DATE: string,
    ACTIVITY_DATE_END: string,
    ACTIVITY_DESCRIPTION: string,
    ACTIVITY_ID: number,
    ACTIVITY_PRIORITY: number,
    ACTIVITY_STATUS: number,
    ACTIVITY_TITLE: string,
    ACTIVITY_ACTIVE: boolean
}

interface Props {
    activities: Activity[]
    handleDateClick: (arg: any) => void,
}

export default function Calendar({ activities, handleDateClick }: Props) {

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={activities.map((activity) => ({
                title: activity.ACTIVITY_TITLE,
                date: activity.ACTIVITY_DATE,
                color: `${activity.ACTIVITY_STATUS === 1 ? 'orange' : (activity.ACTIVITY_STATUS === 2 ? 'blue' : 'green')}`,
                id: activity.ACTIVITY_ID.toString()
            }))}
            eventClick={(event: EventClickArg) => console.log(event.event.id)}
            dateClick={handleDateClick}
        />
    )
}