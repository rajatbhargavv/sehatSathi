import React from 'react';
import DoctorFilter from './DoctorFilter';
import DoctorList from './DoctorList';
import { useDoctors } from './doctorHooks';

const DoctorPage = () => {
  const { doctors, setFilter } = useDoctors();
  return (
    <div className="doctor-page">
      <h2>Find a Doctor</h2>
      <DoctorFilter onFilter={setFilter} />
      <DoctorList doctors={doctors} />
    </div>
  );
};

export default DoctorPage;
