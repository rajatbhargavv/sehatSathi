import React from 'react';
import HospitalCard from '../../components/cards/HospitalCard';

const HospitalList = ({ hospitals = [] }) => {
  if (!hospitals.length) return <p>No hospitals found.</p>;
  return (
    // Arranged HospitalCard in grid form - rishabh
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {hospitals.map((h) => <HospitalCard key={h.id} data={h} />)}
    </div>
  );
};

export default HospitalList;
