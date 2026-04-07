import React from 'react';
import Card from '../ui/Card';
import { formatTime } from '../../utils/formatTime';
// Updated to render reminder data and handle deletion - Rajat
// Added onDelete callback to persist changes to localStorage
const ReminderCard = ({
  data,
  readOnly = false,
  handleDeleteReminder,
  handleToggleReminderStatus,
  preview = false,
}) => {
  const handleDelete = () => {
    if (handleDeleteReminder && data?.id) {
      handleDeleteReminder(data.id);
    }
  };

  const handleToggle = () => {
    if (handleToggleReminderStatus && data?.id) {
      handleToggleReminderStatus(data.id);
    }
  };

  const isDone = data?.status === 'done';
  const timeLabel = formatTime(data?.time) || data?.time || '--';
  const frequency = data?.dosage || 'Daily';

  if (preview) {
    return (
      <div className="grid grid-cols-[90px_1fr_90px_56px] gap-2 items-center px-4 py-3 border-b border-[var(--border)] last:border-b-0 bg-white">
        <div>
          <span className="inline-flex items-center rounded-full bg-[var(--green-50)] px-3 py-1 text-xs font-bold text-[var(--primary)]">
            {timeLabel}
          </span>
        </div>

        <div className="min-w-0">
          <p className="font-bold text-[var(--text)] leading-tight truncate">{data?.medicineName || 'Medicine'}</p>
          <p className="text-sm text-[var(--muted)] leading-tight truncate">{data?.dosage || 'Reminder'}</p>
        </div>

        <div>
          <span className="inline-flex items-center rounded-md bg-[var(--bg)] px-2 py-1 text-xs font-bold text-[var(--muted)]">
            {frequency}
          </span>
        </div>

        <button
          type="button"
          disabled={readOnly}
          onClick={handleToggle}
          className={`h-7 w-7 rounded-full border-2 grid place-items-center transition-colors ${
            isDone
              ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
              : 'bg-white border-[var(--muted2)] text-transparent'
          } ${readOnly ? 'cursor-not-allowed opacity-60' : ''}`}
          aria-label={isDone ? 'Mark reminder as pending' : 'Mark reminder as complete'}
          title={isDone ? 'Mark as pending' : 'Mark as complete'}
        >
          ✓
        </button>
      </div>
    );
  }

  return (
    <Card className="remindercard">
      <div className="reminder-card-content">
        <h3>{data?.medicineName}</h3>
        <p className="reminder-time">{data?.time}</p>
        <p className="reminder-status">Status: {isDone ? 'Done' : 'Pending'}</p>
        {!readOnly && (
          <button
            type="button"
            onClick={handleToggle}
            className="rounded-md border border-[var(--border)] px-3 py-1 text-sm font-semibold text-[var(--primary)]"
            aria-label={isDone ? 'Mark reminder as pending' : 'Mark reminder as complete'}
          >
            {isDone ? 'Mark Pending' : 'Mark Complete'}
          </button>
        )}
        {/* Show delete button only when not in read-only mode - Rajat */}
         <p className="reminder-dosage">{data?.dosage}</p>
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
