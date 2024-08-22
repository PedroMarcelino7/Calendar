import './App.css'

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Activity from './components/ActivityCard/Activity';
import Calendar from './components/Calendar'
import CreateActivity from './components/Modal/CreateActivity/CreateActivity';
import { useEffect, useState } from 'react';
import EditActivity from './components/Modal/EditActivity/EditActivity';
import Loading from './components/Loading/Loading';
import Toast from './components/Toast/Toast';

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

function App() {
  const [openToast, setOpenToast] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [activities, setActivities] = useState<Activity[]>([])
  const [openCreateActivityModal, setOpenCreateActivityModal] = useState<Boolean>(false)
  const [openEditActivityModal, setOpenEditActivityModal] = useState<Boolean>(false)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [idToEdit, setIdToEdit] = useState<number>(0)
  const [isReversed, setIsReversed] = useState<boolean>(false)

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr)
    setOpenCreateActivityModal(true)
  }

  const handleCloseCreateActivityModal = () => {
    setOpenCreateActivityModal(false)
  }

  const handleOpenEditActivityModal = (id: number) => {
    setIdToEdit(id);
    setOpenEditActivityModal(true);
  };

  const handleCloseEditActivityModal = () => {
    setOpenEditActivityModal(false);
  };

  const handleOpenToast = () => {
    setOpenToast(true)
  }

  const handleCloseToast = () => {
    setOpenToast(false)
  }

  const getActivityById = (id: number) => {
    return activities.find(activity => activity.ACTIVITY_ID === id);
  };

  const getActivities = async (filter: string) => {
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
      setLoading(false)
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
    getActivities('priority')
  }, [])

  return (
    <>
      <div className='viewport'>
        <div className='calendar_container'>
          <Calendar activities={activities} handleDateClick={handleDateClick} />
        </div>

        <div className="activities_container">
          <div className="activity_box">
            <div className="utilities">
              <div className='ordering'>
                <KeyboardArrowUpIcon onClick={increasingOrder} />
                <KeyboardArrowDownIcon onClick={decreasingOrder} />
              </div>

              <div className="filters">
                <div className="filter_box" onClick={() => getActivities('priority')}>
                  <FlagRoundedIcon />
                  <h3>Priority</h3>
                </div>

                <div className="filter_box" onClick={() => getActivities('date')}>
                  <CalendarMonthRoundedIcon />
                  <h3>Date</h3>
                </div>

                <div className="filter_box" onClick={() => getActivities('status')}>
                  <ChecklistRoundedIcon />
                  <h3>Status</h3>
                </div>
              </div>
            </div>

            <div className="activities">
              {
                activities.map((activity, index) => (
                  <Activity key={index} activity={activity} handleOpenEditActivityModal={handleOpenEditActivityModal} getActivities={getActivities} handleOpenToast={handleOpenToast} />
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}

      {openCreateActivityModal && <CreateActivity handleCloseModal={handleCloseCreateActivityModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} getActivities={getActivities} />}
      {openEditActivityModal && <EditActivity handleCloseModal={handleCloseEditActivityModal} activity={getActivityById(idToEdit)} getActivities={getActivities} />}
      {openToast && <Toast handleCloseToast={handleCloseToast} />}
    </>
  )
}

export default App
