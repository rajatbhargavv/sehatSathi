import React from 'react';
import HospitalList from './HospitalList';
import HospitalFilter from './HospitalFilter';
import { useHospitals } from './hospitalHooks';

const HospitalPage = () => {
  const {
    hospitals,
    selectedType,
    setSelectedType,
    typeOptions,
    emergencyOnly,
    setEmergencyOnly,
    selectedSpecialtyTag,
    setSelectedSpecialtyTag,
  } = useHospitals();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Nearby Hospitals</h2>
      <HospitalFilter
        resultCount={hospitals.length}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        typeOptions={typeOptions}
        emergencyOnly={emergencyOnly}
        setEmergencyOnly={setEmergencyOnly}
        selectedSpecialtyTag={selectedSpecialtyTag}
        setSelectedSpecialtyTag={setSelectedSpecialtyTag}
      />
      <HospitalList hospitals={hospitals} />
    </div>
  );
};

export default HospitalPage;
