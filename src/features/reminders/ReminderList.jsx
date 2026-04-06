import React from "react";
import ReminderCard from "../../components/cards/ReminderCard";

const ReminderList = ({
  reminders = [],
  readOnly = true,
  handleDeleteReminder,
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
    <div className="space-y-3">
      {displayReminders.map((r) => (
        <ReminderCard
          key={r.id}
          data={r}
          readOnly={readOnly}
          handleDeleteReminder={handleDeleteReminder}
        />
      ))}
    </div>
  );
};

export default ReminderList;
