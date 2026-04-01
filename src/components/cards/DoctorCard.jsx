import React from 'react';
import Card from '../ui/Card';

const DoctorCard = ({ data }) => {
  if (!data) return null;

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
