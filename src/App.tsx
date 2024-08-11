import './App.css'
import Calendar from './components/Calendar'
import TuneIcon from '@mui/icons-material/Tune';

function App() {
  return (
    <div className='viewport'>
      <div className='calendar_container'>
        <Calendar />
      </div>

      <div className="activities_container">
        <div className="utilities">
          <TuneIcon />
        </div>
      </div>
    </div>
  )
}

export default App
