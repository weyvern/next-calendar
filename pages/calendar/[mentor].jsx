import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGrid from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const Calendar = () => {
  const {
    query: { mentor },
  } = useRouter()
  const { data, error } = useSWR(`/api/events/${mentor}`, async (url) => {
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    } else {
      const error = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
  })
  if (!data) return <div>Loading...</div>
  if (error) return <div>Error: {error.info}</div>
  return (
    <div>
      <h1>Calendar for mentor with id: {mentor}</h1>
      <FullCalendar
        plugins={[interactionPlugin, dayGrid, timeGridPlugin]}
        initialView='timeGridWeek'
        nowIndicator={true}
        editable={true}
        initialEvents={data}
        selectable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />
    </div>
  )
}
export default Calendar
