import { useState, useEffect } from 'react';
import { getReminders, addReminder, deleteReminder } from '../../services/reminderService';

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);

  // Load reminders from localStorage on component mount - Rajat
  useEffect(() => {
    getReminders().then(setReminders);
  }, []);

  // Function to handle adding a new reminder - Rajat
  // Updates localStorage and refreshes the reminder list
  const handleAddReminder = async (reminder) => {
    await addReminder(reminder);
    const updatedReminders = await getReminders();
    setReminders(updatedReminders);
  };

  // Function to handle deleting a reminder - Rajat
  // Updates localStorage and refreshes the reminder list
  const handleDeleteReminder = async (id) => {
    await deleteReminder(id);
    const updatedReminders = await getReminders();
    setReminders(updatedReminders);
  };

  return { reminders, handleAddReminder, handleDeleteReminder };
};
