import React from 'react';
import DoctorFilter from './DoctorFilter';
import DoctorList from './DoctorList';
import { useDoctors } from './doctorHooks';
const DoctorPage = () => {
  const { doctors, selectedArea,selectedSpecialty,setSelectedArea,setSelectedSpecialty} = useDoctors();
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Find a Doctor</h2>
      <DoctorFilter selectedArea={selectedArea} selectedSpecialty={ selectedSpecialty} setSelectedArea={setSelectedArea} setSelectedSpecialty={setSelectedSpecialty} />
      <DoctorList doctors={doctors} />
    </div>
  );
};

export default DoctorPage;
