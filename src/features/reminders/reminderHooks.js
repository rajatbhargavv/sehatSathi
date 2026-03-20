import { useState, useEffect } from 'react';
import { getReminders } from '../../services/reminderService';

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    getReminders().then(setReminders);
  }, []);

  return { reminders, setReminders };
};
