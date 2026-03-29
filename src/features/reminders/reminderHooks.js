import { useState, useEffect } from 'react';
import { getReminders, addReminder, deleteReminder } from '../../services/reminderService';

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);

  // Load reminders from localStorage on component mount - Rajat
  useEffect(() => {
    setReminders(getReminders());
  }, []);

  // Function to handle adding a new reminder - Rajat
  // Updates localStorage and refreshes the reminder list
  const handleAddReminder = (reminder) => {
    addReminder(reminder);
    const updatedReminders = getReminders();
    setReminders(updatedReminders);
  };

  // Function to handle deleting a reminder - Rajat
  // Updates localStorage and refreshes the reminder list
  const handleDeleteReminder = (id) => {
    deleteReminder(id);
    const updatedReminders = getReminders();
    setReminders(updatedReminders);
  };

  return { reminders, handleAddReminder, handleDeleteReminder };
};
