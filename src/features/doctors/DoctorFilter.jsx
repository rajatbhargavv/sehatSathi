import Chip from '../../components/ui/Chip';

const DoctorFilter = ({
  selectedSpecialty,
  setSelectedSpecialty,
  selectedArea,
  setSelectedArea,
  specialtyOptions = [],
  areaOptions = [],
  searchTerm,
  setSearchTerm,
  availableOnly,
  setAvailableOnly,
  rating45Plus,
  setRating45Plus,
  within2Km,
  setWithin2Km,
  resultCount = 0,
}) => {
  return (
    <div className="space-y-3 rounded-2xl border border-dashed border-emerald-300 bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[var(--muted)]">🔍</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, specialty, area..."
              className="w-full bg-transparent text-[var(--text)] placeholder:text-[var(--muted2)] outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Chip
            label={`📍 ${selectedArea === 'All' ? 'All Areas' : selectedArea}`}
            selected={selectedArea !== 'All'}
            className="text-xs"
          />
          <Chip label="↑↓ Sort by Distance" className="text-xs" />
          <Chip label="⚙ Filter" selected className="text-xs" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {specialtyOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selectedSpecialty === option}
            onClick={() => setSelectedSpecialty(option)}
            className="text-xs"
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-[var(--muted)]">Quick filter:</span>
        <Chip
          label="✓ Available Now"
          selected={availableOnly}
          onClick={() => setAvailableOnly((prev) => !prev)}
          className="text-xs"
        />
        <Chip
          label="Within 2km"
          selected={within2Km}
          onClick={() => setWithin2Km((prev) => !prev)}
          className="text-xs"
        />
        <Chip
          label="Rating 4.5+"
          selected={rating45Plus}
          onClick={() => setRating45Plus((prev) => !prev)}
          className="text-xs"
        />

        <div className="ml-auto text-sm font-semibold text-[var(--primary)]">{resultCount} doctors found</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {areaOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selectedArea === option}
            onClick={() => setSelectedArea(option)}
            className="text-xs"
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorFilter;
