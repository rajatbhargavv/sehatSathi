import React from 'react';
import Card from '../ui/Card';

const HospitalCard = ({ data }) => {
  if (!data) return null;

  return (
    <Card className="hospitalcard">
      <h3>{data.name}</h3>
      <p><strong>Address:</strong> {data.address}</p>
      <p><strong>City:</strong> {data.city}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      <p><strong>Rating:</strong> {data.rating?.toFixed ? data.rating.toFixed(1) : data.rating}</p>
    </Card>
  );
};

export default HospitalCard;
