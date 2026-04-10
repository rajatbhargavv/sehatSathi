import { useState } from 'react';
import {
  getReminders,
  addReminder,
  deleteReminder,
  toggleReminderStatus,
  updateReminder,
} from '../../services/reminderService';

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

  const handleToggleReminderStatus = (id) => {
    toggleReminderStatus(id);
    const updatedReminders = getReminders();
    setReminders(updatedReminders);
  };

  const handleUpdateReminder = (id, updates) => {
    updateReminder(id, updates);
    const updatedReminders = getReminders();
    setReminders(updatedReminders);
  };

  return {
    reminders,
    handleAddReminder,
    handleDeleteReminder,
    handleToggleReminderStatus,
    handleUpdateReminder,
  };
};
