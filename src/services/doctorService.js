// this file will only contain two functions, for getting data from localStorage, and setting it back to localStorage.

// importing the key to access doctors array from localStorage
import { STORAGE_KEYS } from "../constants/storageKeys";

const DOCTORS = STORAGE_KEYS.DOCTORS; // key we are using to access doctors array.


// function to get all doctors - Returns a Promise for consistency - Rajat
export const getDoctors = async () => {
    try {
        const doctors = localStorage.getItem(DOCTORS);
        if (!doctors) return [];

        const data = JSON.parse(doctors);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
};

export const setDoctors = async (doctors) => {
    try {
        localStorage.setItem(DOCTORS, JSON.stringify(doctors));
    } catch (error) {
        console.error("Error setting doctors:", error);
    }
};