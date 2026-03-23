// Role-aware page
import React from 'react';
import { useApp } from '../../app/providers/AppProvider';
import { ROLES } from '../../constants/config';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
import { useReminders } from './reminderHooks';

const ReminderPage = () => {
  const { role } = useApp();
  // Updated to include handleAddReminder for form submission - Rajat
  const { reminders, handleAddReminder, handleDeleteReminder } = useReminders();

  return (
    <div className="reminder-page">
      <h2>Reminders</h2>
      {/* Pass handleAddReminder to form so reminders are saved to localStorage when added - Rajat */}
      {role === ROLES.ELDER && <ReminderForm onSubmit={handleAddReminder} />}
      {/* Pass handleDeleteReminder to list for deletion functionality - Rajat */}
      <ReminderList reminders={reminders} readOnly={role === ROLES.FAMILY} onDelete={handleDeleteReminder} />
    </div>
  );
};

export default ReminderPage;
