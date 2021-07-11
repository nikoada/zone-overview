import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AddScheduleForm } from './AddScheduleForm';
import { Schedule } from './Schedule';
import { generateId } from './utilities';

export function App() {
  const [schedules, setSchedules] = useState([
    {
      id: generateId(),
      temp: 33,
      unit: '°​C',
      fromTime: '11:00',
      tillTime: '13:00',
      celsius: '33',
      fahrenheit: '91.4',
      zones: ['default', 'Kitchen', 'Server', 'Room 4']
    },
    {
      id: generateId(),
      temp: 44,
      unit: '°F',
      fromTime: '11:00',
      tillTime: '13:00',
      celsius: '44',
      fahrenheit: '111.2',
      zones: ['default', 'Room 4', 'Server', 'Conference room']
    },
  ]);

  const [zoneToFilter, setZoneToFilter] = useState('default')
  const [unit, setUnit] = useState('°​C')
  const [update, setUpdate] = useState({update: false})

  const addSchedule = (schedule) => {
    if (zoneToFilter !== 'default') schedule.zones.push(zoneToFilter)
    setSchedules((prev) => [schedule, ...prev])
  }

  const updateSchedule = (schedule) => {
    const scheduleIndexToUpdate = schedules.findIndex(item => item.id == schedule.id)
    schedules[scheduleIndexToUpdate] = schedule
    setSchedules(schedules)
    setUpdate({update : false})
  }

  const removeSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  const editSchedule = (schedule) => {
    schedule.update = true
    setUpdate(schedule)
  }

  return (
    <div className="App">
      <header>
        <h1>{zoneToFilter === 'default' ? 'All Zones' : zoneToFilter}</h1>
      </header>
      <select id='zones' onChange={({target}) => setZoneToFilter(target.value)} >  
        <option value = 'default'> All zones   
        </option>  
        <option value = 'Kitchen'> Kitchen  
        </option>  
        <option value = 'Conference room'> Conference room   
        </option>
      </select>
      <select id='unit' onChange={({target}) => setUnit(target.value)}>  
        <option value = "°​C"> °​C   
        </option>  
        <option value = "°F"> °F   
        </option>  
      </select> 
      <main>
        <AddScheduleForm addSchedule={addSchedule} unit={unit} update={update} updateSchedule={updateSchedule} />
        <ul className="schedules">
          {zoneToFilter ? schedules.filter((schedule) => schedule.zones.includes(zoneToFilter)).map((schedule) => (
            <Schedule key={schedule.id} schedule={schedule} unit={unit} removeSchedule={removeSchedule} editSchedule={editSchedule} update={update} />
          )) : schedules.map((schedule) => (
            <Schedule key={schedule.id} schedule={schedule} unit={unit} removeSchedule={removeSchedule} editSchedule={editSchedule} update={update} />))}
        </ul>
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
