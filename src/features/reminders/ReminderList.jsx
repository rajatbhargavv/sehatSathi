// Shared (read-only mode support)
import React from 'react';
import ReminderCard from '../../components/cards/ReminderCard';

// Updated to pass onDelete callback to ReminderCard - Rajat
// This allows reminders to be deleted and persisted to localStorage
const ReminderList = ({ reminderList, readOnly = true}) => {
  if (reminderList.length===0) return <p>No reminders yet.</p>;
  return (
    <div className="space-y-3">
      {reminderList.map((r) => (
        <ReminderCard 
          key={r.id} 
          data={r} 
          readOnly={readOnly} 

        />
      ))}
    </div>
  );
};

export default ReminderList;
