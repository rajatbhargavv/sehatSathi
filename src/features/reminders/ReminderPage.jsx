import React from 'react';
import { useApp } from '../../app/providers/useApp';
import { ROLES } from '../../constants/config';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
import { useReminders } from './reminderHooks';
const ReminderPage = () => {
  const { role } = useApp();
  // Updated to include handleAddReminder for form submission - Rajat
  const { reminders, handleAddReminder, handleDeleteReminder } = useReminders();
  return (
    <div className="p-4">
      {role==="family" && (
        <ReminderForm  handleAddReminder={handleAddReminder}/>
      )}
      <ReminderList reminders={reminders} handleDeleteReminder={handleDeleteReminder} readOnly={role==="elder"}/>
    </div>
  );
};

export default ReminderPage;
