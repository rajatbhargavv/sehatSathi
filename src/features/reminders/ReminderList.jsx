import React, { useState } from "react";
import ReminderCard from "../../components/cards/ReminderCard";
import { formatTime } from "../../utils/formatTime";
import Button from "../../components/ui/Button";

const ReminderList = ({
  reminders = [],
  readOnly,
  canToggle = true,
  canManage = false,
  onEdit,
  handleDeleteReminder,
  handleToggleReminderStatus,
  preview = false, // ⭐ NEW PROP
}) => {
  const effectiveCanToggle = readOnly === true ? false : canToggle;
  const effectiveCanManage = readOnly === true ? false : canManage;

  // FULL TABLE VIEW filter state (safe even when preview=true)
  const [filter, setFilter] = useState("All");

  // Limit to 3 items if preview mode
  const displayReminders = preview ? reminders.slice(0, 3) : reminders;

  if (!reminders || reminders.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl border text-sm text-gray-500">
        No reminders yet
      </div>
    );
  }

  // PREVIEW MODE: reuse ReminderCard preview
  if (preview) {
    return (
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="grid grid-cols-[90px_1fr_90px_56px] gap-2 px-4 py-2 bg-[var(--bg)] border-b border-[var(--border)] text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--muted2)]">
          <span>Time</span>
          <span>Medication</span>
          <span>Frequency</span>
          <span>Done</span>
        </div>

        {displayReminders.map((r) => (
          <ReminderCard
            key={r.id}
            data={r}
            canToggle={effectiveCanToggle}
            handleDeleteReminder={handleDeleteReminder}
            handleToggleReminderStatus={handleToggleReminderStatus}
            preview={preview}
          />
        ))}
      </div>
    );
  }

  const filtered = displayReminders.filter((r) => {
    if (filter === "All") return true;
    if (filter === "Pending") return r.status !== "done";
    if (filter === "Done") return r.status === "done";
    return true;
  });

  return (
    <div className="rounded-2xl border border-[var(--border)] overflow-hidden bg-white">
      <div className="p-4 flex items-center justify-between">
        <h4 className="font-semibold">All Reminders — Today</h4>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "All" ? "primary" : "secondary"}
            className="text-xs px-3 py-1.5"
            onClick={() => setFilter("All")}
          >
            All
          </Button>
          <Button
            variant={filter === "Pending" ? "primary" : "secondary"}
            className="text-xs px-3 py-1.5"
            onClick={() => setFilter("Pending")}
          >
            Pending
          </Button>
          <Button
            variant={filter === "Done" ? "primary" : "secondary"}
            className="text-xs px-3 py-1.5"
            onClick={() => setFilter("Done")}
          >
            Done
          </Button>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-[90px_1fr_140px_120px_1fr_96px] gap-2 px-4 py-2 bg-[var(--bg)] border-t border-b border-[var(--border)] text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--muted2)]">
        <span>Time</span>
        <span>Medication / Task</span>
        <span>Category</span>
        <span>Frequency</span>
        <span>Notes</span>
        <span className="text-right">Action</span>
      </div>

      {/* ROWS */}
      {filtered.map((r) => {
        const timeLabel = formatTime(r.time) || r.time || "--";
        return (
          <div key={r.id} className="grid grid-cols-[90px_1fr_140px_120px_1fr_96px] gap-2 items-center px-4 py-3 border-b border-[var(--border)] bg-white">
            {/* Time */}
            <div>
              <span className="inline-flex items-center rounded-full bg-[var(--green-50)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                {timeLabel}
              </span>
            </div>

            {/* Medication / Task */}
            <div className="min-w-0">
              <p className="font-semibold text-[var(--text)] truncate">{r.medicineName}</p>
              <p className="text-sm text-[var(--muted)] truncate">{r.dosage || r.category}</p>
            </div>

            {/* Category */}
            <div>
              <span className="inline-flex items-center rounded-md bg-[var(--bg)] px-2 py-1 text-xs font-medium text-[var(--muted)]">
                {r.category || '—'}
              </span>
            </div>

            {/* Frequency */}
            <div>
              <span className="inline-flex items-center rounded-md bg-[var(--bg)] px-2 py-1 text-xs font-medium text-[var(--muted)]">
                {r.frequency || 'Daily'}
              </span>
            </div>

            {/* Notes */}
            <div>
              <p className="text-sm text-[var(--muted)] truncate">{r.notes || ''}</p>
            </div>

            {/* Actions */}
            <div className="text-right flex items-center justify-end gap-2">
              <button
                onClick={() => handleToggleReminderStatus && handleToggleReminderStatus(r.id)}
                disabled={!effectiveCanToggle}
                className={`h-7 w-7 rounded-full border-2 grid place-items-center transition ${r.status === 'done' ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'bg-white border-[var(--muted2)] text-transparent'} ${!effectiveCanToggle ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                ✓
              </button>

              {effectiveCanManage && onEdit && (
                <Button variant="secondary" className="text-xs px-3 py-1.5" onClick={() => onEdit(r)}>
                  Edit
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReminderList;
