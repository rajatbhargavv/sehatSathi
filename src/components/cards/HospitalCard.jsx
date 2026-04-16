import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Chip from "../ui/Chip";

const HospitalCard = ({ data }) => {
  if (!data) return null;

  const normalizedSector = String(data.sector ?? "").trim().toLowerCase();
  const isGovt = normalizedSector === "govt" || normalizedSector === "semigov";

  // ✅ TEMP STATUS LOGIC (inside component) for ui similiar to Wireframe - rishabh
  let status = "closed";
  let statusLabel = "Closed";

  if (data.emergencyAvailable) {
    status = "emergency";
    statusLabel = "24/7 Emergency";
  } else if (data.openClose) {
    status = "open";
    statusLabel = `Open ${data.openClose.open} - ${data.openClose.close}`;
  }

  // ✅ TAGS (temporary)
  const tags = [...(data.specialization || [])];

  if (data.emergencyAvailable) {
    tags.push("Emergency");
  }

  return (
    <Card
      variant="interactive"
      className="p-0 overflow-hidden flex flex-col h-full"
    >
      {/* HEADER */}
      <div
        className={`
          h-20 flex items-center justify-center relative text-2xl
          ${isGovt ? "bg-[var(--green-50)]" : "bg-[var(--family-lt)]"}
        `}
      >
        🏥

        {/* SECTOR BADGE */}
        <Chip
          as="span"
          customTone
          label={String(data.sector || "").toUpperCase()}
          className={`absolute top-2 right-2 text-xs px-2 py-0.5 font-semibold border-transparent shadow-sm ${
            isGovt ? "bg-[var(--primary)] text-white" : "bg-[var(--accent)] text-white"
          }`}
        />
      </div>

      {/* BODY */}
      <div className="p-4 flex-1">
        
        {/* NAME */}
        <p className="text-sm mt-1">
          <span className="font-semibold text-[var(--text)]">
            {data.name}
          </span>
        </p>

        {/* 📍 LOCATION + RATING  abhi distance nhi pta isseliye "--" laga rkha hai - rishabh*/}
        <p className="text-sm text-[var(--muted)] mt-1">
          📍 {data.distance || data.city} · ⭐ {data.rating}
        </p>

        {/* 📞 PHONE */}
        <p className="text-sm text-[var(--muted)] mt-1">
          📞 {data.phone}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          {tags.map((tag, i) => (
            <Chip
              key={i}
              as="span"
              customTone
              label={tag}
              className="bg-[var(--bg)] border-[var(--bg)] text-[var(--muted)] px-2 py-0.5 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
        
        {/* STATUS */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <Chip
            as="span"
            customTone
            label={`${status === "closed" ? "🔴" : "🟢"} ${statusLabel}`}
            className={`text-xs px-3 py-1 border-transparent ${
              status === "closed"
                ? "bg-[var(--danger-lt)] text-[var(--danger)]"
                : "bg-[var(--green-50)] text-[var(--primary)]"
            }`}
          />
        </div>

        {/* BUTTON */}
        <Button className="text-xs px-3 py-1.5">
          📍 Directions
        </Button>
      </div>
    </Card>
  );
};

export default HospitalCard;