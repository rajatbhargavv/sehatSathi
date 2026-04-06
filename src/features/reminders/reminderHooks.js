import { useState } from 'react';
import { getReminders, addReminder, deleteReminder } from '../../services/reminderService';

export const useReminders = () => {
  const [reminders, setReminders] = useState(() => getReminders());

  const handleAddReminder = (reminder) => {
    addReminder(reminder);
    const updatedReminders = getReminders();
    setReminders(updatedReminders);
  };

  const handleDeleteReminder = (id) => {
    deleteReminder(id);
    const updatedReminders = getReminders();
    setReminders(updatedReminders);
  };

  return { reminders, handleAddReminder, handleDeleteReminder };
};
