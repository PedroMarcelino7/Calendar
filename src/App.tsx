import './App.css'

import TuneIcon from '@mui/icons-material/Tune';

import Activity from './components/ActivityCard/Activity';
import Calendar from './components/Calendar'
import CreateActivity from './components/Modal/CreateActivity';

function App() {
  return (
    <>
      <div className='viewport'>
        <div className='calendar_container'>
          <Calendar />
        </div>

        <div className="activities_container">
          <div className="activity_box">
            <div className="utilities">
              <div className="utility_box">
                <TuneIcon sx={{ fontSize: '2rem' }} />
              </div>
            </div>

            <div className="activities">
              <Activity />
              <Activity />
              <Activity />
            </div>
          </div>
        </div>
      </div>

      <CreateActivity />
    </>
  )
}

export default App
