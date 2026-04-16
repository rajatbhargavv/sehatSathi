import { useState, useEffect, useMemo } from 'react';
import { getDoctors, addDoctor } from '../../services/doctorService';
import { isEqual, getDistance } from '../../utils/validation';
import { geocodePlace } from '../../services/geocodeService';

const isAllSelection = (value) =>
  typeof value === 'string' && value.trim().toLowerCase() === 'all';

export const useDoctors = () => {
  const [allDoctors, setAllDoctors] = useState(() => getDoctors());
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [rating45Plus, setRating45Plus] = useState(false);
  const [within2Km, setWithin2Km] = useState(false);
  const [areaLocation, setAreaLocation] = useState(null);

  const effectiveArea = isAllSelection(selectedArea) ? '' : selectedArea;
  const effectiveSpecialty = isAllSelection(selectedSpecialty) ? '' : selectedSpecialty;

  const specialtyOptions = useMemo(() => {
    const specialties = [...new Set(allDoctors.map((doctor) => doctor.specialty).filter(Boolean))];
    return ['All', ...specialties];
  }, [allDoctors]);

  const areaOptions = useMemo(() => {
    const areas = [...new Set(allDoctors.map((doctor) => doctor.area).filter(Boolean))];
    return ['All', ...areas];
  }, [allDoctors]);

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

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter((doctor) =>
        [doctor.name, doctor.specialty, doctor.hospital, doctor.area]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query))
      );
    }

    if (effectiveSpecialty) {
      filtered = filtered.filter((doctor) => isEqual(effectiveSpecialty, doctor.specialty));
    }

    if (availableOnly) {
      filtered = filtered.filter((doctor) => Boolean(doctor.available));
    }

    if (rating45Plus) {
      filtered = filtered.filter((doctor) => Number(doctor.rating) >= 4.5);
    }

    if (!effectiveArea) {
      if (within2Km) {
        return filtered;
      }
      return filtered;
    }

    if (areaLocation) {
      const withDistance = filtered
        .filter((doctor) => isEqual(effectiveArea, doctor.area))
        .filter((doctor) => typeof doctor.lat === 'number' && typeof doctor.lng === 'number')
        .map((doctor) => ({
          ...doctor,
          distanceKm: getDistance(doctor.lat, doctor.lng, areaLocation.lat, areaLocation.lng),
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm);

      if (within2Km) {
        return withDistance.filter((doctor) => doctor.distanceKm <= 2);
      }

      return withDistance;
    }

    return filtered.filter((doctor) => isEqual(effectiveArea, doctor.area));
  }, [
    allDoctors,
    searchTerm,
    effectiveSpecialty,
    effectiveArea,
    availableOnly,
    rating45Plus,
    within2Km,
    areaLocation,
  ]);

  // Add doctor with optional geocoding (address/city/area). Returns the saved doctor.
  const handleAddDoctor = async (doctorInput) => {
    const saved = await addDoctor(doctorInput);
    setAllDoctors(getDoctors());
    return saved;
  };

  return {
    doctors,
    handleAddDoctor,
    specialtyOptions,
    areaOptions,
    selectedArea,
    selectedSpecialty,
    searchTerm,
    availableOnly,
    rating45Plus,
    within2Km,
    setSelectedArea,
    setSelectedSpecialty,
    setSearchTerm,
    setAvailableOnly,
    setRating45Plus,
    setWithin2Km,
  };
};