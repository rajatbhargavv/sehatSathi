import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { formatTime } from "../../utils/formatTime";

const ReminderCard = ({
  data,
  readOnly = false,
  canToggle = true,
  canDelete = false,
  handleDeleteReminder,
  handleToggleReminderStatus,
  preview = false,
}) => {
  if (!data) return null;

  const effectiveCanToggle = readOnly ? false : canToggle;
  const effectiveCanDelete = readOnly ? false : canDelete;

  const isDone = data.status === "done";
  const timeLabel = formatTime(data.time) || data.time || "--";
  const frequency = data.frequency || data.dosage || "Daily";
  const dosageLabel = data.dosage || "";
  const categoryLabel = data.category || "";

  const handleDelete = () => {
    if (handleDeleteReminder && data?.id) {
      handleDeleteReminder(data.id);
    }
  };

  const handleToggle = () => {
    if (handleToggleReminderStatus && data?.id) {
      handleToggleReminderStatus(data.id);
    }
  };

  // ✅ PREVIEW (Dashboard Table Row)
  if (preview) {
    return (
      <div className="grid grid-cols-[90px_1fr_90px_56px] gap-2 items-center px-4 py-3 border-b border-[var(--border)] last:border-b-0 bg-white">
        
        {/* Time */}
        <span className="inline-flex items-center rounded-full bg-[var(--green-50)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
          {timeLabel}
        </span>

        {/* Info */}
        <div className="min-w-0">
          <p className="font-semibold text-[var(--text)] truncate">
            {data.medicineName}
          </p>
          <p className="text-sm text-[var(--muted)] truncate">
            {dosageLabel || categoryLabel}
          </p>
        </div>

        {/* Frequency */}
        <span className="inline-flex items-center rounded-md bg-[var(--bg)] px-2 py-1 text-xs font-medium text-[var(--muted)]">
          {frequency}
        </span>

        {/* Toggle */}
        <button
          onClick={handleToggle}
          disabled={!effectiveCanToggle}
          className={`
            h-7 w-7 rounded-full border-2 grid place-items-center transition
            ${
              isDone
                ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                : "bg-white border-[var(--muted2)] text-transparent"
            }
            ${!effectiveCanToggle ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          ✓
        </button>
      </div>
    );
  }

  // ✅ FULL CARD (List view)
  return (
    <Card
      variant="default"
      className="flex items-center justify-between gap-4 p-4"
    >
      {/* LEFT */}
      <div className="flex-1">
        
        {/* Time */}
        <p className="text-sm font-semibold text-[var(--primary)]">
          {timeLabel}
        </p>

        {/* Medicine */}
        <h3 className="font-semibold text-[var(--text)]">
          {data.medicineName}
        </h3>

        {/* Details */}
        <p className="text-xs text-[var(--muted)]">
          {dosageLabel && `${dosageLabel} · `}{frequency}
        </p>

        {/* Notes */}
        {data.notes && (
          <p className="text-xs text-[var(--muted)] mt-1 truncate">{data.notes}</p>
        )}

        {/* Status */}
        <p
          className={`text-xs mt-1 font-medium ${
            isDone
              ? "text-[var(--primary)]"
              : "text-[var(--warn)]"
          }`}
        >
          {isDone ? "Done" : "Pending"}
        </p>
      </div>

      {/* RIGHT */}
      <div className="text-right flex flex-col gap-2">
        
        {effectiveCanToggle && (
          <Button
            variant="secondary"
            onClick={handleToggle}
            className="text-xs px-3 py-1.5"
          >
            {isDone ? "Mark Pending" : "Mark Done"}
          </Button>
        )}

        {effectiveCanDelete && (
          <Button
            variant="danger"
            onClick={handleDelete}
            className="text-xs px-3 py-1.5"
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ReminderCard;