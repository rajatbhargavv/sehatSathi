import { hospitals } from '../data/hospitalData';

export const getHospitals = async () => hospitals;
export const getHospitalById = async (id) => hospitals.find((h) => h.id === id) ?? null;
