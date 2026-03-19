// BACKEND-READY LAYER
import { doctors } from '../data/doctorData';

export const getDoctors = async () => doctors;
export const getDoctorById = async (id) => doctors.find((d) => d.id === id) ?? null;
