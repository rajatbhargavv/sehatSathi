import React from "react";
import ReminderCard from "../../components/cards/ReminderCard";

const ReminderList = ({
  reminders = [],
  readOnly = true,
  handleDeleteReminder,
  handleToggleReminderStatus,
  preview = false, // ⭐ NEW PROP
}) => {
  // Limit to 3 items if preview mode
  const displayReminders = preview ? reminders.slice(0, 3) : reminders;

  if (!reminders || reminders.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl border text-sm text-gray-500">
        No reminders yet
      </div>
    );
  }

  return (
    <div className={preview ? "rounded-2xl border border-[var(--border)] overflow-hidden" : "space-y-3"}>
      {preview ? (
        <div className="grid grid-cols-[90px_1fr_90px_56px] gap-2 px-4 py-2 bg-[var(--bg)] border-b border-[var(--border)] text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--muted2)]">
          <span>Time</span>
          <span>Medication</span>
          <span>Frequency</span>
          <span>Done</span>
        </div>
      ) : null}

      {displayReminders.map((r) => (
        <ReminderCard
          key={r.id}
          data={r}
          readOnly={readOnly}
          handleDeleteReminder={handleDeleteReminder}
          handleToggleReminderStatus={handleToggleReminderStatus}
          preview={preview}
        />
      ))}
    </div>
  );
};

export default ReminderList;
