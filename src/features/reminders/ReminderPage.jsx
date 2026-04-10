import React, { useState } from 'react';
import { useApp } from '../../app/providers/useApp';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
import { useReminders } from './reminderHooks';
import ReminderSummaryCard from '../../components/cards/ReminderSummaryCard';

const ReminderPage = () => {
  const { role } = useApp();
  const [editingReminder, setEditingReminder] = useState(null);
  const {
    reminders,
    handleAddReminder,
    handleDeleteReminder,
    handleToggleReminderStatus,
    handleUpdateReminder,
  } = useReminders();

  const isFamily = role === 'family';

  const handleEdit = (reminder) => {
    if (!reminder?.id) return;
    setEditingReminder(reminder);
  };

  const handleCancelEdit = () => {
    setEditingReminder(null);
  };

  return (
    <div className="p-4 space-y-6">
      {isFamily && (
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: Add / Edit reminder (family-only) */}
          <div className="col-span-8">
            <ReminderForm
              key={editingReminder?.id ?? 'new'}
              handleAddReminder={handleAddReminder}
              handleUpdateReminder={handleUpdateReminder}
              editingReminder={editingReminder}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* RIGHT: Family monitoring summary */}
          <div className="col-span-4">
            <ReminderSummaryCard reminders={reminders} />
          </div>
        </div>
      )}

      {/* Reminder list (both roles can toggle done/pending) */}
      <ReminderList
        reminders={reminders}
        handleDeleteReminder={handleDeleteReminder}
        handleToggleReminderStatus={handleToggleReminderStatus}
        canToggle={true}
        canManage={isFamily}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ReminderPage;
