export const isValidTime = (time) => /^\d{2}:\d{2}$/.test(time);
export const isNonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;
