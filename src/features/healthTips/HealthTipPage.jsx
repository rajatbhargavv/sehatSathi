import React from 'react';
import { useHealthTips } from './healthTipHooks';

const HealthTipPage = () => {
  const { todayTip } = useHealthTips();
  return (
    <div className="health-tip-page">
      <h2>Today's Health Tip</h2>
      {todayTip ? <p>{todayTip.tip}</p> : <p>No tip for today.</p>}
    </div>
  );
};

export default HealthTipPage;
