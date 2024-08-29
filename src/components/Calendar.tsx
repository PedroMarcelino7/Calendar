import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { EventClickArg } from '@fullcalendar/core'
import { useState } from 'react'

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
    const [showChangeStatus, setShowChangeStatus] = useState<{ top: number, left: number } | null>(null)

    const handleEditStatus = (activityId: string, x: number, y: number) => {
        setShowChangeStatus({ top: x, left: y })
        console.log(activityId)
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={activities.map((activity) => ({
                    title: activity.ACTIVITY_TITLE,
                    date: activity.ACTIVITY_DATE,
                    color: `${activity.ACTIVITY_STATUS === 1 ? 'orange' : (activity.ACTIVITY_STATUS === 2 ? 'blue' : 'green')}`,
                    id: activity.ACTIVITY_ID.toString()
                }))}
                eventClick={(event: EventClickArg) => handleEditStatus(event.event.id, event.jsEvent.clientX, event.jsEvent.clientY)}
                dateClick={handleDateClick}
            />

            {showChangeStatus &&
                <div style={{
                    position: 'absolute',
                    top: showChangeStatus.top,
                    left: showChangeStatus.left,
                    backgroundColor: 'red'
                }}>
                    teste
                </div>
            }
        </>
    )
}