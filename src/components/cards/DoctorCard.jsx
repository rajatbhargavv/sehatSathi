import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Chip from "../ui/Chip";

const DoctorCard = ({ data }) => {
  if (!data) return null;

  const initials = data.name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      variant="interactive"
      className="flex items-center justify-between gap-3 p-3"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">
        
        {/* Avatar */}
        <div className="h-11 w-11 shrink-0 rounded-xl bg-[var(--green-50)] text-[var(--primary)] font-bold grid place-items-center">
          {initials}
        </div>

        {/* Info */}
        <div className="min-w-0">
          <p className="font-semibold text-[var(--text)] leading-tight truncate">
            {data.name}
          </p>

          <p className="text-sm text-[var(--muted)] leading-tight truncate">
            {data.specialty}
          </p>
          
          <p className="text-xs text-[var(--muted)] mt-1">
            ⭐ {data.rating?.toFixed ? data.rating.toFixed(1) : data.rating}
          </p>

          <p className="text-xs text-[var(--muted2)] mt-1 truncate">
            {data.hospital}, {data.city}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-2">
        <Chip
          as="span"
          customTone
          label={data.available ? "Available Now" : "Busy"}
          className={`min-w-[126px] justify-center text-xs px-3 py-1 font-semibold ${
            data.available
              ? "bg-white border-[var(--green-300)] text-[var(--primary)]"
              : "bg-white border-[#f2c7c2] text-[var(--danger)]"
          }`}
        />

        {/* Button */}
        <Button
          variant="primary"
          disabled={!data.available}
          className="text-xs px-3 py-1.5"
        >
          Book
        </Button>
      </div>
    </Card>
  );
};

export default DoctorCard;