import React from 'react';
import DoctorCard from '../../components/cards/DoctorCard';

const DoctorList = ({ doctors = [] }) => {
  if (!doctors.length) return <p>No doctors found.</p>;
  return (
    <div className="space-y-3">
      {doctors.map((d) => <DoctorCard key={d.id} data={d} />)}
    </div>
  );
};

export default DoctorList;
