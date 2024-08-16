import './App.css'

import TuneIcon from '@mui/icons-material/Tune';

import Activity from './components/ActivityCard/Activity';
import Calendar from './components/Calendar'
import CreateActivity from './components/Modal/CreateActivity';
import { useEffect, useState } from 'react';

interface Activity {
  ACTIVITY_CREATE_AT: string,
  ACTIVITY_DATE: string,
  ACTIVITY_DATE_END: string,
  ACTIVITY_DESCRIPTION: string,
  ACTIVITY_ID: number,
  ACTIVITY_PRIORITY: number,
  ACTIVITY_STATUS: number,
  ACTIVITY_TITLE: string,
}

function App() {
  const [openModal, setOpenModal] = useState<Boolean>(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const getActivies = async () => {
    try {
      const response = await fetch('http://localhost:3001/activities', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setActivities(result)

      console.log('Activities:', result);
    } catch (err: any) {
      console.log('Error', err)
    }
  }

  const getActiviesByPriority = async () => {
    try {
      const response = await fetch('http://localhost:3001/activities/filter/priority', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setActivities(result)

      console.log('Activities:', result);
    } catch (err: any) {
      console.log('Error', err)
    }
  }

  const getActiviesByStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/activities/filter/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setActivities(result)

      console.log('Activities:', result);
    } catch (err: any) {
      console.log('Error', err)
    }
  }

  const getActiviesByDate = async () => {
    try {
      const response = await fetch('http://localhost:3001/activities/filter/date', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setActivities(result)

      console.log('Activities:', result);
    } catch (err: any) {
      console.log('Error', err)
    }
  }

  useEffect(() => {
    getActivies()
  }, [])

  const handleFilter = (filter: number) => {
    if (filter === 1) {
      getActiviesByPriority()
    } else if (filter === 2) {
      getActiviesByStatus()
    } else if (filter === 3) {
      getActiviesByDate()
    }
  }

  return (
    <>
      <div className='viewport'>
        <div className='calendar_container'>
          <Calendar handleDateClick={handleDateClick} />
        </div>

        <div className="activities_container">
          <div className="activity_box">
            <div className="utilities">
              <div
                className="utility_box"
                onClick={() => handleFilter(3)}
              >
                <TuneIcon sx={{ fontSize: '2rem' }} />
              </div>
            </div>

            <div className="activities">
              {
                activities.map((activity, index) => (
                  <Activity key={index} activity={activity} />
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {openModal && <CreateActivity handleCloseModal={handleCloseModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
    </>
  )
}

export default App
