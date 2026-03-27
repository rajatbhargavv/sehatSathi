import React from 'react';
import { useState } from 'react';
import { useApp } from '../../app/providers/AppProvider';
import { ROLES } from '../../constants/config';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
//import { useReminders } from './reminderHooks';

const ReminderPage = () => {
  const { role } = useApp();
  // Updated to include handleAddReminder for form submission - Rajat
  //const { reminders, handleAddReminder, handleDeleteReminder } = useReminders();
  const [reminderList,setReminderList]=useState([]);
  return (
    <div className="p-4">
      {role==="family" && (
        <ReminderForm setReminderList={setReminderList}/>
      )}
      <ReminderList reminderList={reminderList} readOnly={role==="elder"}/>
    </div>
  );
};

export default ReminderPage;
