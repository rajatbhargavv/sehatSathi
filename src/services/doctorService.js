// this file will only contain two functions, for getting data from localStorage, and setting it back to localStorage.

// importing the key to access doctors array from localStorage
import { STORAGE_KEYS } from "../constants/storageKeys";
import { getStoredJSON, setStoredJSON } from "../utils/storage";
import { geocodePlace } from "./geocodeService";

const DOCTORS = STORAGE_KEYS.DOCTORS; // key we are using to access doctors array.


// function to get all doctors (synchronous)
export const getDoctors = () => {
    try {
        // Read doctors list from localStorage with safe JSON parsing
        const data = getStoredJSON(DOCTORS, []);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
};

export const setDoctors = (doctors) => {
    try {
        // Persist doctors list back to localStorage
        setStoredJSON(DOCTORS, doctors);
    } catch (error) {
        console.error("Error setting doctors:", error);
    }
};

// Add a doctor and auto-derive coordinates from address/city/area when lat/lng are missing.
// Uses geocoding API; falls back silently if geocoding fails.
export const addDoctor = async (doctor) => {
    const current = getDoctors();
    const nextId = doctor?.id ?? (current.length ? Math.max(...current.map((d) => d.id ?? 0)) + 1 : 1);

    let enriched = { ...doctor, id: nextId };
    if (enriched.lat == null || enriched.lng == null) {
        const query = enriched.address || enriched.city || enriched.area;
        if (query) {
            const coords = await geocodePlace(query);
            if (coords) {
                enriched = { ...enriched, ...coords };
            }
        }
    }

    const updated = [...current, enriched];
    setDoctors(updated);
    return enriched;
};