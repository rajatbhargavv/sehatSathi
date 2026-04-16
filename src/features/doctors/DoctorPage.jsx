import React from 'react';
import DoctorFilter from './DoctorFilter';
import DoctorList from './DoctorList';
import { useDoctors } from './doctorHooks';
const DoctorPage = () => {
  const {
    doctors,
    selectedArea,
    selectedSpecialty,
    setSelectedArea,
    setSelectedSpecialty,
    specialtyOptions,
    areaOptions,
    searchTerm,
    setSearchTerm,
    availableOnly,
    setAvailableOnly,
    rating45Plus,
    setRating45Plus,
    within2Km,
    setWithin2Km,
  } = useDoctors();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Find a Doctor</h2>
      <DoctorFilter
        selectedArea={selectedArea}
        selectedSpecialty={selectedSpecialty}
        setSelectedArea={setSelectedArea}
        setSelectedSpecialty={setSelectedSpecialty}
        specialtyOptions={specialtyOptions}
        areaOptions={areaOptions}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        availableOnly={availableOnly}
        setAvailableOnly={setAvailableOnly}
        rating45Plus={rating45Plus}
        setRating45Plus={setRating45Plus}
        within2Km={within2Km}
        setWithin2Km={setWithin2Km}
        resultCount={doctors.length}
      />
      <DoctorList doctors={doctors} />
    </div>
  );
};

export default DoctorPage;
