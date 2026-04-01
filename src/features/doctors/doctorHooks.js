import { useState, useEffect } from 'react';
import { getDoctors, addDoctor } from '../../services/doctorService';
import { filterDoctors } from '../../utils/filterDoctors';

export const useDoctors = () => {
  const [allDoctors, setAllDoctors] = useState(() => getDoctors());
  const [filter, setFilter] = useState('');
  const [doctors, setDoctors] = useState(() => getDoctors());

  useEffect(() => {
    let mounted = true;

    const refresh = async () => {
      const filtered = await filterDoctors(allDoctors, { specialty: filter });
      if (mounted) setDoctors(filtered);
    };

    refresh();

    return () => {
      mounted = false;
    };
  }, [allDoctors, filter]);

  const handleAddDoctor = async (doctorInput) => {
    const saved = await addDoctor(doctorInput);
    const latestDoctors = getDoctors();
    setAllDoctors(latestDoctors);
    return saved;
  };

  return { doctors, setFilter, handleAddDoctor };
};
