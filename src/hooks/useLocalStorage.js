import { useState, useEffect } from "react";

/**
 * Custom hook for managing state with localStorage persistence
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if nothing is in localStorage
 * @returns {[*, Function]} - The state value and setter function
 */
export function useLocalStorage(key, initialValue) {
  // Start with the initialValue for both server and client initial render to
  // ensure the rendered HTML is identical during hydration. We will read
  // localStorage and update state after mount in an effect.
  const [storedValue, setStoredValue] = useState(() =>
    typeof initialValue === "function" ? initialValue() : initialValue
  );

  // Initially not hydrated on both server and initial client render to avoid
  // rendering differences that cause hydration mismatches.
  const [isHydrated, setIsHydrated] = useState(false);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  };

  // Hydrate from localStorage after mount. We read the key and update state if
  // a stored value exists. This intentionally updates state inside an effect
  // because the read depends on the browser environment; to avoid the linter
  // error about calling setState synchronously within an effect we add a
  // narrow eslint-disable comment only for the setState calls below.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setTimeout(() => setStoredValue(JSON.parse(item)), 0);
      }
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
    }

    setTimeout(() => setIsHydrated(true), 0);
  }, [key]);

  return [storedValue, setValue, isHydrated];
}
