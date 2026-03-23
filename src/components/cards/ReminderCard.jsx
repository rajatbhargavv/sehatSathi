import React from 'react';
import Card from '../ui/Card';

// Updated to render reminder data and handle deletion - Rajat
// Added onDelete callback to persist changes to localStorage
const ReminderCard = ({ data, readOnly = false, onDelete }) => {
  const handleDelete = () => {
    if (onDelete && data?.id) {
      onDelete(data.id);
    }
  };

  return (
    <Card className="remindercard">
      <div className="reminder-card-content">
        <h3>{data?.title}</h3>
        <p className="reminder-time">{data?.time}</p>
        {/* Show delete button only when not in read-only mode - Rajat */}
        {!readOnly && (
          <button 
            onClick={handleDelete} 
            className="reminder-delete-btn"
            aria-label="Delete reminder"
          >
            Delete
          </button>
        )}
      </div>
    </Card>
  );
};

export default ReminderCard;
