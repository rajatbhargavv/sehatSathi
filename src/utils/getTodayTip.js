import { healthTips } from '../data/healthTipsData';

export const getTodayTip = () => {
  if (!healthTips.length) return null;
  const index = new Date().getDate() % healthTips.length;
  return healthTips[index] ?? null;
};
