import React from 'react';
import Card from '../ui/Card';

const DoctorCard = ({ data, compact = false }) => {
  if (!data) return null;

  if (compact) {
    const initials = data.name
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();

    return (
      <Card style={{ borderRadius: '14px', padding: '0.75rem 0.85rem' }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 shrink-0 rounded-xl bg-[var(--green-50)] text-[var(--primary)] font-bold grid place-items-center">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[var(--text)] leading-tight truncate">{data.name}</p>
              <p className="text-sm text-[var(--muted)] leading-tight truncate">{data.specialty}</p>
              <p className="text-xs text-[var(--muted2)] mt-1 truncate">{data.hospital}</p>
            </div>
          </div>

          <button
            type="button"
            disabled={!data.available}
            className={`rounded-lg px-3 py-1 text-sm font-bold ${
              data.available
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--border)] text-[var(--muted2)] cursor-not-allowed'
            }`}
          >
            Book
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="doctorcard">
      <h3>{data.name}</h3>
      <p><strong>Specialty:</strong> {data.specialty}</p>
      <p><strong>Hospital:</strong> {data.hospital}</p>
      <p><strong>Area:</strong> {data.area}</p>
      <p><strong>Rating:</strong> {data.rating?.toFixed ? data.rating.toFixed(1) : data.rating}</p>
      <p><strong>Available:</strong> {data.available ? 'Yes' : 'No'}</p>
    </Card>
  );
};

export default DoctorCard;
