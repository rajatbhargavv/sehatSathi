import React from 'react';
import Chip from '../../components/ui/Chip';

const HospitalFilter = ({
  resultCount,
  selectedType,
  setSelectedType,
  typeOptions,
  emergencyOnly,
  setEmergencyOnly,
  selectedSpecialtyTag,
  setSelectedSpecialtyTag,
}) => {
  const specialtyTags = ['Multi-specialty', 'Cardiology'];

  return (
    <div className="space-y-3 rounded-2xl border border-dashed border-emerald-300 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        {typeOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selectedType === option}
            onClick={() => setSelectedType(option)}
            className="text-xs"
          />
        ))}

        <Chip
          label="🚨 24/7 Emergency"
          selected={emergencyOnly}
          onClick={() => setEmergencyOnly((prev) => !prev)}
          className="text-xs"
        />

        {specialtyTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            selected={selectedSpecialtyTag === tag}
            onClick={() => setSelectedSpecialtyTag((prev) => (prev === tag ? '' : tag))}
            className="text-xs"
          />
        ))}

        <div className="ml-auto text-sm font-semibold text-[var(--primary)]">
          {resultCount} hospitals found
        </div>
      </div>
    </div>
  );
};

export default HospitalFilter;
