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

export const getRemindersByRelation = (relationId) => {
  const all = getReminders();
  const normalized = String(relationId ?? '').trim().toLowerCase();
  if (!normalized) return all;

  return all.filter((item) => String(item?.relationId ?? '').trim().toLowerCase() === normalized);
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
  // ensure new fields have sensible defaults
  const newReminder = {
    id: Date.now(),
    status: normalizedStatus,
    medicineName: reminder.medicineName || "",
    time: reminder.time || "",
    dosage: reminder.dosage || "",
    frequency: reminder.frequency || "Daily",
    category: reminder.category || "Medicine",
    alert: reminder.alert || "At time",
    notes: reminder.notes || "",
    relationId: reminder.relationId || '',
    ...reminder,
  };
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

export const deleteReminderByRelation = (id, relationId) => {
  const normalized = String(relationId ?? '').trim().toLowerCase();
  const reminders = getReminders();
  const filteredReminders = reminders.filter((item) => {
    if (item.id !== id) return true;
    if (!normalized) return false;
    return String(item?.relationId ?? '').trim().toLowerCase() !== normalized;
  });

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

export const toggleReminderStatusByRelation = (id, relationId) => {
  const normalized = String(relationId ?? '').trim().toLowerCase();
  const reminders = getReminders();
  const updatedReminders = reminders.map((item) => {
    const sameRelation =
      !normalized || String(item?.relationId ?? '').trim().toLowerCase() === normalized;
    if (item.id !== id || !sameRelation) return item;
    const nextStatus = item?.status === 'done' ? 'pending' : 'done';
    return { ...item, status: nextStatus };
  });

  setReminders(updatedReminders);
  return updatedReminders.find((item) => item.id === id) ?? null;
};

// Update a reminder by id (e.g., editing name/time/frequency/notes)
export const updateReminder = (id, updates = {}) => {
  const reminders = getReminders();
  const updatedReminders = reminders.map((item) => {
    if (item.id !== id) return item;
    return { ...item, ...updates, id: item.id };
  });

  setReminders(updatedReminders);
  return updatedReminders.find((item) => item.id === id) ?? null;
};

export const updateReminderByRelation = (id, relationId, updates = {}) => {
  const normalized = String(relationId ?? '').trim().toLowerCase();
  const reminders = getReminders();
  const updatedReminders = reminders.map((item) => {
    const sameRelation =
      !normalized || String(item?.relationId ?? '').trim().toLowerCase() === normalized;
    if (item.id !== id || !sameRelation) return item;
    return { ...item, ...updates, id: item.id, relationId: item.relationId };
  });

  setReminders(updatedReminders);
  return updatedReminders.find((item) => item.id === id) ?? null;
};
