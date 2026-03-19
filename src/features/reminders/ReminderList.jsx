// Shared (read-only mode support)
import React from 'react';
import ReminderCard from '../../components/cards/ReminderCard';

const ReminderList = ({ reminders = [], readOnly = false }) => {
  if (!reminders.length) return <p>No reminders yet.</p>;
  return (
    <div className="reminder-list">
      {reminders.map((r) => <ReminderCard key={r.id} data={r} readOnly={readOnly} />)}
    </div>
  );
};

export default ReminderList;
