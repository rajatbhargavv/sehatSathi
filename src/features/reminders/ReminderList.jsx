// Shared (read-only mode support)
import React from 'react';
import ReminderCard from '../../components/cards/ReminderCard';

// Updated to pass onDelete callback to ReminderCard - Rajat
// This allows reminders to be deleted and persisted to localStorage
const ReminderList = ({ reminders = [], readOnly = false, onDelete }) => {
  if (!reminders.length) return <p>No reminders yet.</p>;
  return (
    <div className="reminder-list">
      {reminders.map((r) => (
        <ReminderCard 
          key={r.id} 
          data={r} 
          readOnly={readOnly} 
          onDelete={onDelete} // Pass delete handler - Rajat
        />
      ))}
    </div>
  );
};

export default ReminderList;
