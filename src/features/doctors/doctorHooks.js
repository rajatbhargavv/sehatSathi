import { useState, useEffect } from 'react';
import { getDoctors } from '../../services/doctorService';
import { filterDoctors } from '../../utils/filterDoctors';

export const useDoctors = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setAllDoctors(getDoctors());
  }, []);

  const doctors = filterDoctors(allDoctors, { specialty: filter });
  return { doctors, setFilter };
};
