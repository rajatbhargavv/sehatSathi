import { useState, useEffect, useMemo } from 'react';
import { getDoctors, addDoctor } from '../../services/doctorService';
import { isEqual, getDistance } from '../../utils/validation';
import { geocodePlace } from '../../services/geocodeService';

const isAllSelection = (value) =>
  typeof value === 'string' && value.trim().toLowerCase() === 'all';

export const useDoctors = () => {
  const [allDoctors, setAllDoctors] = useState(() => getDoctors());
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [areaLocation, setAreaLocation] = useState(null);

  const effectiveArea = isAllSelection(selectedArea) ? '' : selectedArea;
  const effectiveSpecialty = isAllSelection(selectedSpecialty) ? '' : selectedSpecialty;

  useEffect(() => {
    let mounted = true;

    const resolveAreaLocation = async () => {
      if (!effectiveArea) {
        setAreaLocation(null);
        return;
      }

      setAreaLocation(null);
      const loc = await geocodePlace(effectiveArea);
      if (mounted) {
        setAreaLocation(loc ?? null);
      }
    };

    resolveAreaLocation();

    return () => {
      mounted = false;
    };
  }, [effectiveArea]);

  const doctors = useMemo(() => {
    let filtered = [...allDoctors];

    if (effectiveSpecialty) {
      filtered = filtered.filter((doctor) => isEqual(effectiveSpecialty, doctor.specialty));
    }

    if (!effectiveArea) {
      return filtered;
    }

    if (areaLocation) {
      return filtered
        .filter((doctor) => isEqual(effectiveArea, doctor.area))
        .filter((doctor) => typeof doctor.lat === 'number' && typeof doctor.lng === 'number')
        .sort(
          (a, b) =>
            getDistance(a.lat, a.lng, areaLocation.lat, areaLocation.lng) -
            getDistance(b.lat, b.lng, areaLocation.lat, areaLocation.lng)
        );
    }

    return filtered.filter((doctor) => isEqual(effectiveArea, doctor.area));
  }, [allDoctors, effectiveSpecialty, effectiveArea, areaLocation]);

  // Add doctor with optional geocoding (address/city/area). Returns the saved doctor.
  const handleAddDoctor = async (doctorInput) => {
    const saved = await addDoctor(doctorInput);
    setAllDoctors(getDoctors());
    return saved;
  };

  return {
    doctors,
    handleAddDoctor,
    selectedArea,
    selectedSpecialty,
    setSelectedArea,
    setSelectedSpecialty,
  };
};