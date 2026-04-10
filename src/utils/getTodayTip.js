import { healthTips } from '../data/healthTipsData';

export const getTodayTip = () => {
  if (!healthTips.length) return null;
  const index = new Date().getDate() % healthTips.length;
  console.log(healthTips[index]);
  return healthTips[index] ?? null;
};
