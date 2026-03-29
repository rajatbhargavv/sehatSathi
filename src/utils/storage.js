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

// One-time migration helper to copy values from legacy keys to new keys.
// Only writes when the new key is absent; removes the legacy key after copying.
export const migrateLegacyKeys = (keyMap) => {
  try {
    Object.entries(keyMap).forEach(([oldKey, newKey]) => {
      const legacyValue = localStorage.getItem(oldKey);
      const newValue = localStorage.getItem(newKey);
      if (legacyValue !== null && newValue === null) {
        localStorage.setItem(newKey, legacyValue);
        localStorage.removeItem(oldKey);
      }
    });
  } catch (err) {
    console.error('storage migration error:', err);
  }
};
