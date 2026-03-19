import React from 'react';
import HospitalCard from '../../components/cards/HospitalCard';

const HospitalList = ({ hospitals = [] }) => {
  if (!hospitals.length) return <p>No hospitals found.</p>;
  return (
    <div className="hospital-list">
      {hospitals.map((h) => <HospitalCard key={h.id} data={h} />)}
    </div>
  );
};

export default HospitalList;
