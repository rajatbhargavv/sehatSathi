import React from 'react';
import HospitalList from './HospitalList';
import { useHospitals } from './hospitalHooks';

const HospitalPage = () => {
  const { hospitals } = useHospitals();
  return (
    <div className="hospital-page">
      <h2>Nearby Hospitals</h2>
      <HospitalList hospitals={hospitals} />
    </div>
  );
};

export default HospitalPage;
