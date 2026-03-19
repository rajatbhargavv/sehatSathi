import { useState, useEffect } from 'react';
import { getHospitals } from '../../services/hospitalService';

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => { getHospitals().then(setHospitals); }, []);
  return { hospitals };
};
