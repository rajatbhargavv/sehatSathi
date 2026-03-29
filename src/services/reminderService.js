import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStoredJSON, setStoredJSON } from '../utils/storage';

const REMINDERS = STORAGE_KEYS.REMINDERS; // Key to access reminders array in localStorage - Rajat

// Function to get all reminders from localStorage
// If no reminders exist, returns an empty array
export const getReminders = async () => {
  try {
    // Read reminders list from localStorage with safe JSON parsing
    const data = getStoredJSON(REMINDERS, []);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return [];
  }
};

// Function to save reminders to localStorage - Rajat
// This ensures reminders persist across page refreshes
export const setReminders = (reminders) => {
  try {
    // Persist reminders list to localStorage
    setStoredJSON(REMINDERS, reminders);
  } catch (error) {
    console.error('Error setting reminders:', error);
  }
};

// Function to add a new reminder and save to localStorage - Rajat
export const addReminder = async (reminder) => {
  const newReminder = { ...reminder, id: Date.now() };
  const reminders = await getReminders();
  const updatedReminders = [...reminders, newReminder];
  setReminders(updatedReminders);
  return newReminder;
};

// Function to delete a reminder and save updated list to localStorage - Rajat
export const deleteReminder = async (id) => {
  const reminders = await getReminders();
  const filteredReminders = reminders.filter(r => r.id !== id);
  setReminders(filteredReminders);
  return id;
};
