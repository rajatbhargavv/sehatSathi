import { useState } from 'react';
import { getTodayTip } from '../../utils/getTodayTip';

export const useHealthTips = () => {
  const [todayTip] = useState(() => getTodayTip());
  return { todayTip };
};
