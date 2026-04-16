import { useEffect, useState } from 'react';
import {
  getRemindersByRelation,
  addReminder,
  deleteReminderByRelation,
  toggleReminderStatusByRelation,
  updateReminderByRelation,
} from '../../services/reminderService';
import { useApp } from '../../app/providers/useApp';

export const useReminders = () => {
  const { relationId } = useApp();
  const [reminders, setReminders] = useState(() => getRemindersByRelation(relationId));

  const refreshReminders = () => {
    setReminders(getRemindersByRelation(relationId));
  };

  useEffect(() => {
    refreshReminders();
  }, [relationId]);

  const handleAddReminder = (reminder) => {
    addReminder({ ...reminder, relationId });
    refreshReminders();
  };

  const handleDeleteReminder = (id) => {
    deleteReminderByRelation(id, relationId);
    refreshReminders();
  };

  const handleToggleReminderStatus = (id) => {
    toggleReminderStatusByRelation(id, relationId);
    refreshReminders();
  };

  const handleUpdateReminder = (id, updates) => {
    updateReminderByRelation(id, relationId, updates);
    refreshReminders();
  };

  return {
    reminders,
    handleAddReminder,
    handleDeleteReminder,
    handleToggleReminderStatus,
    handleUpdateReminder,
  };
};
