import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStoredJSON, setStoredJSON } from '../utils/storage';

const REMINDERS = STORAGE_KEYS.REMINDERS; // Key to access reminders array in localStorage - Rajat

// Function to get all reminders from localStorage (synchronous)
// If no reminders exist, returns an empty array
export const getReminders = () => {
  try {
    // Read reminders list from localStorage with safe JSON parsing
    const data = getStoredJSON(REMINDERS, []);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return [];
  }
};

// Function to save reminders to localStorage - Rajat (synchronous)
// This ensures reminders persist across page refreshes
export const setReminders = (reminders) => {
  try {
    // Persist reminders list to localStorage
    setStoredJSON(REMINDERS, reminders);
  } catch (error) {
    console.error('Error setting reminders:', error);
  }
};

// Function to add a new reminder and save to localStorage - Rajat (synchronous)
export const addReminder = (reminder) => {
  const normalizedStatus = reminder?.status === 'done' ? 'done' : 'pending';
  const newReminder = { ...reminder, id: Date.now(), status: normalizedStatus };
  const reminders = getReminders();
  const updatedReminders = [...reminders, newReminder];
  setReminders(updatedReminders);
  return newReminder;
};

// Function to delete a reminder and save updated list to localStorage - Rajat (synchronous)
export const deleteReminder = (id) => {
  const reminders = getReminders();
  const filteredReminders = reminders.filter(r => r.id !== id);
  setReminders(filteredReminders);
  return id;
};

// Toggle reminder completion state between pending and done.
export const toggleReminderStatus = (id) => {
  const reminders = getReminders();
  const updatedReminders = reminders.map((item) => {
    if (item.id !== id) return item;
    const nextStatus = item?.status === 'done' ? 'pending' : 'done';
    return { ...item, status: nextStatus };
  });

  setReminders(updatedReminders);
  return updatedReminders.find((item) => item.id === id) ?? null;
};
