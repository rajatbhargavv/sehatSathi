import { useState } from 'react';
import { getHospitals } from '../../services/hospitalService';

export const useHospitals = () => {
  const [hospitals] = useState(() => getHospitals());
  return { hospitals };
};
