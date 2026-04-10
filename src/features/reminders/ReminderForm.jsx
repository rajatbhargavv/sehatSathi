// Family only
import React, { useMemo, useState } from "react";
import { validateReminder } from "../../utils/validation";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import Card from "../../components/ui/Card";

const FREQUENCY_OPTIONS = [
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Custom", label: "Custom" },
];

const CATEGORY_OPTIONS = [
  { value: "Medicine", label: "💊 Medicine" },
  { value: "Task", label: "📝 Task" },
  { value: "Appointment", label: "📅 Appointment" },
  { value: "Exercise", label: "🏃 Exercise" },
  { value: "Other", label: "Other" },
];

const ALERT_OPTIONS = [
  { value: "At time", label: "At time" },
  { value: "5 minutes before", label: "5 minutes before" },
  { value: "15 minutes before", label: "15 minutes before" },
  { value: "30 minutes before", label: "30 minutes before" },
  { value: "1 hour before", label: "1 hour before" },
];

export default function ReminderForm({
  handleAddReminder,
  handleUpdateReminder,
  editingReminder = null,
  onCancelEdit,
}) {
  const baseInitial = useMemo(() => ({
    medicineName: "",
    time: "",
    dosage: "",
    frequency: "Daily",
    category: "Medicine",
    alert: "15 minutes before",
    notes: "",
  }), []);

  const initial = useMemo(() => {
    if (editingReminder?.id) {
      return { ...baseInitial, ...editingReminder };
    }
    return baseInitial;
  }, [editingReminder, baseInitial]);

  const [formData, setFormData] = useState(() => initial);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = validateReminder(formData);
    if (!check.isValid) {
      setErrors(check.errors);
      return;
    }

    if (editingReminder?.id && handleUpdateReminder) {
      handleUpdateReminder(editingReminder.id, { ...formData });
    } else {
      handleAddReminder({ ...formData });
    }
    setFormData(baseInitial);
    setErrors({});

    if (editingReminder?.id && onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleCancel = () => {
    setFormData(baseInitial);
    setErrors({});
    if (editingReminder?.id && onCancelEdit) {
      onCancelEdit();
    }
  };

  const aggregatedErrors = Object.values(errors).filter(Boolean);

  return (
    <Card className="mb-4 p-4">
      <h3 className="font-semibold text-lg mb-2">
        {editingReminder?.id ? "Edit Reminder" : "Add New Reminder"}
      </h3>

      {aggregatedErrors.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-sm text-[var(--muted)] p-3 rounded-md mb-3">
          <strong className="text-[var(--warn)]">Validation:</strong>
          <div className="mt-2">
            {aggregatedErrors.map((err, idx) => (
              <div key={idx} className="text-xs">
                - {err}
              </div>
            ))}
          </div>
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input
          name="medicineName"
          label="MEDICATION / TASK NAME *"
          placeholder="e.g. Metformin 500mg"
          onChange={handleChange}
          value={formData.medicineName}
          error={errors.medicineName}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            name="time"
            type="time"
            label="TIME *"
            onChange={handleChange}
            value={formData.time}
            error={errors.time}
          />

          <Select
            name="frequency"
            label="FREQUENCY *"
            options={FREQUENCY_OPTIONS}
            value={formData.frequency}
            onChange={handleChange}
            error={errors.frequency}
            placeholder="Select frequency"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            name="category"
            label="CATEGORY"
            options={CATEGORY_OPTIONS}
            value={formData.category}
            onChange={handleChange}
            placeholder="Select category"
          />

          <Select
            name="alert"
            label="ALERT"
            options={ALERT_OPTIONS}
            value={formData.alert}
            onChange={handleChange}
            placeholder="Select alert"
          />
        </div>

        <Input
          name="notes"
          label="NOTES (OPTIONAL)"
          placeholder="e.g. Take after breakfast with water"
          onChange={handleChange}
          value={formData.notes}
          multiline
          rows={3}
          error={errors.notes}
        />

        <div className="flex flex-col gap-2">
          <Button type="submit" fullWidth variant="primary">
            ✓ {editingReminder?.id ? "Update Reminder" : "Save Reminder"}
          </Button>
          <Button type="button" fullWidth variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}