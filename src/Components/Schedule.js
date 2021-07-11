import React from 'react';

export function Schedule(props) {
  const { schedule, unit, removeSchedule, editSchedule } = props;

  const handleRemoveClick = () => {
    removeSchedule(schedule.id);
  };

  const handleEditClick = () => {
    document.getElementById(schedule.id).parentNode.style.background = "yellow"
    editSchedule(schedule);
  }

  return (
    <li className="Schedule">
      <button
        aria-label="Remove schedule"
        className="remove-button"
        onClick={handleRemoveClick}
      >
        &times;
      </button>
      <button
        id={schedule.id}
        toolTip='test'
        aria-label="Edit schedule"
        className="remove-button"
        onClick={handleEditClick}
      >
        &there4;
      </button>
      <div className="text">{`${unit === '°​C' ? schedule.celsius : schedule.fahrenheit } ${unit} ----- ${schedule.fromTime} - ${schedule.tillTime} ----- ${schedule.zones.length - 1}Z`}</div>
    </li>
  );
}
