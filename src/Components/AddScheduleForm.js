import React, { useState, useEffect } from 'react';
import { generateId } from './utilities';

export function AddScheduleForm(props) {
  const [formObj, setFormObj] = useState({unit: '°​C'})
  
  const { update, updateSchedule } = props

  useEffect(() => {
    if (update.update) {
      setFormObj(update)
    }
  }, [update])

  const handleChange = ({target}) => {
    
    if (props.unit === '°​C' && target.id === 'temp') {
      setFormObj((prev) => {
        return {...prev, celsius: target.value, fahrenheit: ((target.value / 5) * 9) + 32}
      })
    }
    
    if (props.unit === '°F' && target.id === 'temp') {
      setFormObj((prev) => {
        return {...prev, celsius: ((target.value - 32) * 5) / 9, fahrenheit: target.value}
      })
    }
    
    setFormObj((prev) => {
      return {...prev, [target.id]: target.value}
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const schedule = {
      id: generateId(),
      temp: formObj.temp,
      unit: formObj.unit,
      celsius: formObj.celsius,
      fahrenheit: formObj.fahrenheit,
      fromTime: formObj.fromTime,
      tillTime: formObj.tillTime,
      zones: ['default']
    }
    formObj.temp &&
    formObj.fromTime &&
    formObj.tillTime &&
    props.addSchedule(schedule)
    
    setFormObj((prev) => {
      return {...prev, temp: '', fromTime: '', tillTime: ''}
    })
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    document.getElementById(formObj.id).parentNode.style.background = ""
    updateSchedule(formObj)
    setFormObj((prev) => {
      return {...prev, temp: '', fromTime: '', tillTime: ''}
    })
  }


  return (
    <form className="AddScheduleForm" onSubmit={update.update ? handleUpdate : handleSubmit}>
      <input
        id='temp'
        type="text"
        aria-label="Temperature"
        placeholder="Temp."
        value={formObj.temp}
        onChange={handleChange}
      />
      <label>From</label>
      <input
        id='fromTime'
        type="time"
        value={formObj.fromTime}
        onChange={handleChange}
      />
      <label>Till</label>
      <input
        id='tillTime'
        type="time"
        value={formObj.tillTime}
        onChange={handleChange}
      />
      <input type="submit" value={update.update ? 'Update' : 'Add'} />
    </form>
  );
}

