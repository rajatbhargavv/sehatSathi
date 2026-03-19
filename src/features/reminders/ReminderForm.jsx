// Elder only
import React, { useState } from 'react';

const ReminderForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ title, time });
    setTitle(''); setTime('');
  };

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Reminder title" />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button type="submit">Add Reminder</button>
    </form>
  );
};

export default ReminderForm;
