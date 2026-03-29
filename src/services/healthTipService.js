import { healthTips } from '../data/healthTipsData';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStoredJSON, setStoredJSON } from '../utils/storage';

const HEALTH_TIPS = STORAGE_KEYS.HEALTH_TIPS; // Namespace for persisted health tips

// Fetch health tips from localStorage synchronously; fall back to bundled seed data when storage is empty
// so the UI always has something to render. Swapping to an API later only requires edits here.
export const getHealthTips = () => {
	const data = getStoredJSON(HEALTH_TIPS, healthTips);
	return Array.isArray(data) ? data : healthTips;
};

// Persist the provided tips array to localStorage (synchronous). Callers can decide when to save (e.g. after add/edit).
export const setHealthTips = (tips) => {
	setStoredJSON(HEALTH_TIPS, tips);
};
