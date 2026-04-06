import { useState, useEffect, useMemo } from 'react';
import { getDoctors, addDoctor } from '../../services/doctorService';
import { isEqual, getDistance } from '../../utils/validation';
import { geocodePlace } from '../../services/geocodeService';

export const useDoctors = () => {
  const [allDoctors, setAllDoctors] = useState(() => getDoctors());
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [areaLocation, setAreaLocation] = useState(null);

  useEffect(() => {
    let mounted = true;

    const resolveAreaLocation = async () => {
      if (!selectedArea) {
        setAreaLocation(null);
        return;
      }

      setAreaLocation(null);
      const loc = await geocodePlace(selectedArea);
      if (mounted) {
        setAreaLocation(loc ?? null);
      }
    };

    resolveAreaLocation();

    return () => {
      mounted = false;
    };
  }, [selectedArea]);

  const doctors = useMemo(() => {
    let filtered = [...allDoctors];

    if (selectedSpecialty) {
      filtered = filtered.filter((doctor) => isEqual(selectedSpecialty, doctor.specialty));
    }

    if (!selectedArea) {
      return filtered;
    }

    if (areaLocation) {
      return filtered
        .filter((doctor) => typeof doctor.lat === 'number' && typeof doctor.lng === 'number')
        .sort(
          (a, b) =>
            getDistance(a.lat, a.lng, areaLocation.lat, areaLocation.lng) -
            getDistance(b.lat, b.lng, areaLocation.lat, areaLocation.lng)
        );
    }

    return filtered.filter((doctor) => isEqual(selectedArea, doctor.area));
  }, [allDoctors, selectedSpecialty, selectedArea, areaLocation]);

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