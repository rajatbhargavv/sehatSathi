import { useState, useEffect } from 'react';
import { getTodayTip } from '../../utils/getTodayTip';

export const useHealthTips = () => {
  const [todayTip, setTodayTip] = useState(null);
  useEffect(() => { setTodayTip(getTodayTip()); }, []);
  return { todayTip };
};
