import { useState, useEffect } from 'react';
import { getDoctors, addDoctor } from '../../services/doctorService';
import { filterDoctors } from '../../utils/filterDoctors';

export const useDoctors = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [selectedArea,setSelectedArea]=useState("");
  const [selectedSpecialty,setSelectedSpecialty]=useState("");

  useEffect(() => {
    setAllDoctors(getDoctors());
  }, []);

  // Add doctor with optional geocoding (address/city/area). Returns the saved doctor.
  const handleAddDoctor = async (doctorInput) => {
    const saved = await addDoctor(doctorInput);
    setAllDoctors(getDoctors());
    return saved;
  };

  const doctors = filterDoctors(allDoctors, selectedArea,selectedSpecialty);
  return { doctors, handleAddDoctor,selectedArea,selectedSpecialty,setSelectedArea,setSelectedSpecialty };
};
