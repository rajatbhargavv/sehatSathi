import { reminders } from '../data/reminderData';

export const getReminders = async () => reminders;
export const addReminder = async (reminder) => ({ ...reminder, id: Date.now() });
export const deleteReminder = async (id) => id;
