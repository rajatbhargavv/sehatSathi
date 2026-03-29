// this file will only contain two functions, for getting data from localStorage, and setting it back to localStorage.

// importing the key to access doctors array from localStorage
import { STORAGE_KEYS } from "../constants/storageKeys";
import { getStoredJSON, setStoredJSON } from "../utils/storage";

const DOCTORS = STORAGE_KEYS.DOCTORS; // key we are using to access doctors array.


// function to get all doctors - Returns a Promise for consistency - Rajat
export const getDoctors = async () => {
    try {
        // Read doctors list from localStorage with safe JSON parsing
        const data = getStoredJSON(DOCTORS, []);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
};

export const setDoctors = async (doctors) => {
    try {
        // Persist doctors list back to localStorage
        setStoredJSON(DOCTORS, doctors);
    } catch (error) {
        console.error("Error setting doctors:", error);
    }
};