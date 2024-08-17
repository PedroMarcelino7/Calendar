import './App.css'

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
  const [isReversed, setIsReversed] = useState<boolean>(false)

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const getActivies = async (filter: string) => {
    try {
      const response = await fetch(`http://localhost:3001/activities/filter/${filter}`, {
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

      console.log('Get Activities:', result);
    } catch (err: any) {
      console.log('Error', err)
    }
  }

  const increasingOrder = () => {
    const reversedActivities = [...activities].reverse();
    isReversed ? setActivities(reversedActivities) : ''
    setIsReversed(false)
  }
  
  const decreasingOrder = () => {
    const reversedActivities = [...activities].reverse();
    isReversed ? '' : setActivities(reversedActivities)
    setIsReversed(true)
  }

  useEffect(() => {
    getActivies('priority')
  }, [])

  return (
    <>
      <div className='viewport'>
        <div className='calendar_container'>
          <Calendar handleDateClick={handleDateClick} />
        </div>

        <div className="activities_container">
          <div className="activity_box">
            <div className="utilities">
              <div className='ordering'>
                <KeyboardArrowUpIcon onClick={increasingOrder} />
                <KeyboardArrowDownIcon onClick={decreasingOrder} />
              </div>

              <div className="filters">
                <div className="filter_box" onClick={() => getActivies('priority')}>
                  <FlagRoundedIcon />
                  <h3>Priority</h3>
                </div>

                <div className="filter_box" onClick={() => getActivies('date')}>
                  <CalendarMonthRoundedIcon />
                  <h3>Date</h3>
                </div>

                <div className="filter_box" onClick={() => getActivies('status')}>
                  <ChecklistRoundedIcon />
                  <h3>Status</h3>
                </div>
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
