import { hospitals } from '../data/hospitalData';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStoredJSON, setStoredJSON } from '../utils/storage';

const HOSPITALS = STORAGE_KEYS.HOSPITALS; // Namespace for persisted hospitals list

// Fetch hospitals from localStorage synchronously; fall back to bundled seed data when storage is empty
// so the UI has data on first load. Updating the data source later only touches this module.
export const getHospitals = () => {
	const data = getStoredJSON(HOSPITALS, hospitals);
	return Array.isArray(data) ? data : hospitals;
};

// Persist the provided hospitals array to localStorage (synchronous). Upstream callers decide when to save.
export const setHospitals = (hospitalList) => {
	setStoredJSON(HOSPITALS, hospitalList);
};

// Fetch one hospital by id from the current source (localStorage if present, otherwise seed data).
// Returns null when not found to keep consumers safe. Synchronous access.
export const getHospitalById = (id) => {
	const list = getHospitals();
	return list.find((h) => h.id === id) ?? null;
};
