import { useState } from 'react';
import { getStoredJSON, setStoredJSON } from '../utils/storage';

export const useLocalStorage = (key, initialValue) => {
  // setStoredValue is the React state setter; we mirror state into localStorage for persistence
  const [storedValue, setStoredValue] = useState(() =>
    getStoredJSON(key, initialValue)
  );

  const setValue = (value) => {
    // Update React state immediately, then persist the same value
    setStoredValue(value);
    setStoredJSON(key, value);
  };

  return [storedValue, setValue];
};
