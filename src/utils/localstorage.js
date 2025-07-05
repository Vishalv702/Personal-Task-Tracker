// src/utils/localStorage.js

export const saveToLocalStorage = (key, value) => {
  try {
    const data = JSON.stringify(value);
    console.log("Storing key:", key, data);
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage`, error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage`, error);
  }
};
