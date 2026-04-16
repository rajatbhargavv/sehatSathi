import { useMemo, useState } from 'react';
import { getHospitals } from '../../services/hospitalService';

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const matchesSpecialtyTag = (specialtyList, selectedTag) => {
  const tag = normalize(selectedTag);
  if (!tag) return true;

  if (tag === 'multi-specialty') {
    return specialtyList.length >= 2;
  }

  if (tag === 'cardiology') {
    return specialtyList.includes('cardiologist') || specialtyList.includes('cardiology');
  }

  return specialtyList.includes(tag);
};

export const useHospitals = () => {
  const [allHospitals] = useState(() => getHospitals());
  const [selectedType, setSelectedType] = useState('All Hospitals');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [selectedSpecialtyTag, setSelectedSpecialtyTag] = useState('');

  const typeOptions = ['All Hospitals', 'Government', 'Private'];

  const hospitals = useMemo(() => {
    return allHospitals.filter((hospital) => {
      const normalizedSector = normalize(hospital.sector);

      const matchesType =
        selectedType === 'All Hospitals' ||
        (selectedType === 'Government' && (normalizedSector === 'govt' || normalizedSector === 'semigov' || normalizedSector === 'goc')) ||
        (selectedType === 'Private' && normalizedSector === 'private');

      const matchesEmergency = !emergencyOnly || Boolean(hospital.emergencyAvailable);

      const specialtyList = Array.isArray(hospital.specialization)
        ? hospital.specialization.map((item) => normalize(item))
        : [];

      const matchesSpecialty = matchesSpecialtyTag(specialtyList, selectedSpecialtyTag);

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
