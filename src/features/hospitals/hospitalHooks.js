import { useState, useEffect } from 'react';
import { getHospitals } from '../../services/hospitalService';

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => { setHospitals(getHospitals()); }, []);
  return { hospitals };
};
