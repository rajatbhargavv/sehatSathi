// Shared helpers for safe JSON localStorage access
export const getStoredJSON = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return fallback;
    return JSON.parse(value);
  } catch (err) {
    console.error('storage get error:', err);
    return fallback;
  }
};

export const setStoredJSON = (key, value) => {
  try {
    // Persist any serializable value under the given key
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error('storage set error:', err);
    return false;
  }
};
