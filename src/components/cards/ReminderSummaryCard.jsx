import React, { useMemo } from "react";
import Card from "../ui/Card";

const isTimePast = (time) => {
  if (!time) return false;
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return false;

  const now = new Date();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const minutesTime = h * 60 + m;
  return minutesTime < minutesNow;
};

export default function ReminderSummaryCard({
  reminders = [],
  patientName = "Arjun Kumar",
  monitoringAs = "Rahul Kumar (Son)",
}) {
  const summary = useMemo(() => {
    const total = reminders.length;
    const done = reminders.filter((r) => r?.status === "done").length;
    const pending = reminders.filter((r) => r?.status !== "done").length;

    const bpOverdue = reminders.some((r) => {
      const name = (r?.medicineName || "").toString().toLowerCase();
      const looksLikeBp = name.includes("bp") || name.includes("blood pressure");
      return looksLikeBp && r?.status !== "done" && isTimePast(r?.time);
    });

    return {
      total,
      done,
      pending,
      doneText: total > 0 ? `${done}/${total} Done` : "0/0 Done",
      pendingText: `${pending} Pending`,
      bpOverdue,
    };
  }, [reminders]);

  const initials = (patientName || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

  return (
    <Card
      padding="p-5"
      className="bg-gradient-to-r from-[var(--family-dk)] to-[var(--family)] text-white border-transparent rounded-2xl shadow"
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-white/20 grid place-items-center font-semibold">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-lg truncate">
            {patientName} — Today
          </div>
          <div className="text-sm text-white/80 truncate">
            Monitoring as: {monitoringAs}
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="inline-flex items-center rounded-full bg-[var(--green-50)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
              {summary.doneText}
            </span>

            {summary.bpOverdue && (
              <span className="inline-flex items-center rounded-full bg-[var(--warn-lt)] px-3 py-1 text-xs font-semibold text-[var(--danger)]">
                ⚠ BP Overdue
              </span>
            )}

            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
              {summary.pendingText}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
