import { useMemo, useState } from 'react';
import { getHospitals } from '../../services/hospitalService';

export const useHospitals = () => {
  const [allHospitals] = useState(() => getHospitals());
  const [selectedType, setSelectedType] = useState('All Hospitals');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [selectedSpecialtyTag, setSelectedSpecialtyTag] = useState('');

  const typeOptions = ['All Hospitals', 'Government', 'Private'];

  const hospitals = useMemo(() => {
    return allHospitals.filter((hospital) => {
      const normalizedSector = String(hospital.sector ?? '').trim().toLowerCase();

      const matchesType =
        selectedType === 'All Hospitals' ||
        (selectedType === 'Government' && (normalizedSector === 'govt' || normalizedSector === 'semigov' || normalizedSector === 'goc')) ||
        (selectedType === 'Private' && normalizedSector === 'private');

      const matchesEmergency = !emergencyOnly || Boolean(hospital.emergencyAvailable);

      const specialtyList = Array.isArray(hospital.specialization)
        ? hospital.specialization.map((item) => String(item).toLowerCase())
        : [];

      const matchesSpecialty =
        !selectedSpecialtyTag || specialtyList.includes(selectedSpecialtyTag.toLowerCase());

      return matchesType && matchesEmergency && matchesSpecialty;
    });
  }, [allHospitals, selectedType, emergencyOnly, selectedSpecialtyTag]);

  return {
    hospitals,
    selectedType,
    setSelectedType,
    typeOptions,
    emergencyOnly,
    setEmergencyOnly,
    selectedSpecialtyTag,
    setSelectedSpecialtyTag,
  };
};
