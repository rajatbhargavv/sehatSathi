import { useState, useEffect } from 'react';
import { getDoctors, addDoctor } from '../../services/doctorService';
import { filterDoctors } from '../../utils/filterDoctors';

export const useDoctors = () => {
  const [allDoctors, setAllDoctors] = useState(() => getDoctors());
  const [filter, setFilter] = useState('');
  const [doctors, setDoctors] = useState(() => getDoctors());

  useEffect(() => {
    const refresh = async () => {
      const filtered = await filterDoctors(allDoctors, { specialty: filter });
      setDoctors(filtered);
    };
    refresh();
  }, [allDoctors, filter]);

  // Add doctor with optional geocoding (address/city/area). Returns the saved doctor.
  const handleAddDoctor = async (doctorInput) => {
    const saved = await addDoctor(doctorInput);
    const latestDoctors = getDoctors();
    setAllDoctors(latestDoctors);
    return saved;
  };

  return { doctors, setFilter, handleAddDoctor };
};
