// Role-aware page
import React from 'react';
import { useApp } from '../../app/providers/AppProvider';
import { ROLES } from '../../constants/config';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
import { useReminders } from './reminderHooks';

const ReminderPage = () => {
  const { role } = useApp();
  const { reminders } = useReminders();

  return (
    <div className="reminder-page">
      <h2>Reminders</h2>
      {role === ROLES.ELDER && <ReminderForm />}
      <ReminderList reminders={reminders} readOnly={role === ROLES.FAMILY} />
    </div>
  );
};

export default ReminderPage;
