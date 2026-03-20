import React, { useState } from 'react';

const DoctorFilter = ({ onFilter }) => {
  const [specialty, setSpecialty] = useState('');
  return (
    <div className="doctor-filter">
      <input
        placeholder="Filter by specialty..."
        value={specialty}
        onChange={(e) => { setSpecialty(e.target.value); onFilter?.(e.target.value); }}
      />
    </div>
  );
};

export default DoctorFilter;
