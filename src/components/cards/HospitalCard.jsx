import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const HospitalCard = ({ data }) => {
  if (!data) return null;

  const isGovt =
    data.sector === "govt" || data.sector === "semigov";

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
        <span
          className={`
            absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-semibold
            ${
              isGovt
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--family)] text-white"
            }
          `}
        >
          {data.sector}
        </span>
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
          📍 {data.distance || "--"} · ⭐ {data.rating}
        </p>

        {/* 📞 PHONE */}
        <p className="text-sm text-[var(--muted)] mt-1">
          📞 {data.phone}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[var(--bg)] text-[var(--muted)] px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
        
        {/* STATUS */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <span
            className={`
              h-2 w-2 rounded-full
              ${
                status === "open"
                  ? "bg-green-500"
                  : status === "emergency"
                  ? "bg-[var(--primary)]"
                  : "bg-[var(--danger)]"
              }
            `}
          ></span>

          <span
            className={`
              ${
                status === "open"
                  ? "text-[var(--primary)]"
                  : status === "emergency"
                  ? "text-[var(--primary)]"
                  : "text-[var(--danger)]"
              }
            `}
          >
            {statusLabel}
          </span>
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