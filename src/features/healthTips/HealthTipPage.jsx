import React, { useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { healthTips } from '../../data/healthTipsData';
import { useHealthTips } from './healthTipHooks';

const TipCard = ({ tip, onReadMore, showReadMore = true }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={onReadMore}>
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {tip.category}
        </span>
      </div>
      <p className="text-[var(--text)] font-semibold leading-snug mb-5">
        {tip.tip}
      </p>
      {showReadMore && (
        <div className="flex items-center justify-between text-sm font-bold text-[var(--primary)]">
          <span>Read more →</span>
        </div>
      )}
    </Card>
  );
};

const HealthTipPage = () => {
  const { todayTip } = useHealthTips();
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewingTipDetail, setViewingTipDetail] = useState(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(healthTips.map((item) => item.category)));
    return ['All', ...unique];
  }, []);

  const onePerCategory = useMemo(() => {
    const map = new Map();
    healthTips.forEach((tip) => {
      if (!map.has(tip.category)) {
        map.set(tip.category, tip);
      }
    });
    return Array.from(map.values());
  }, []);

  const filteredTips = useMemo(() => {
    if (activeCategory === 'All') return healthTips;
    return healthTips.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6 lg:px-0">
      <div className="rounded-3xl border border-[var(--border)] bg-white/70 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'primary' : 'secondary'}
              onClick={() => setActiveCategory(category)}
              className="rounded-full px-4 py-2 text-xs font-bold"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {viewingTipDetail ? (
        <Card variant="hero" padding="p-8" className="overflow-hidden">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.24em] text-white/70">
                {viewingTipDetail.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
                {viewingTipDetail.tip}
              </h1>
            </div>
            <p className="text-base text-white/90 leading-relaxed max-w-3xl">
              {viewingTipDetail.detail}
            </p>
            <Button
              className="mt-4"
              variant="secondary"
              onClick={() => setViewingTipDetail(null)}
            >
              Show Less
            </Button>
          </div>
        </Card>
      ) : (
        <Card variant="hero" padding="p-8" className="overflow-hidden">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-white/70">Today's Featured Tip</span>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
              {todayTip?.tip || 'Drink water before you feel thirsty'}
            </h1>
            <Button
              className="mt-4"
              variant="secondary"
              onClick={() => setViewingTipDetail(todayTip)}
            >
              Read Full Article
            </Button>
          </div>
        </Card>
      )}

      {activeCategory === 'All' ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {onePerCategory.map((tip) => (
            <TipCard key={tip.id} tip={tip} onReadMore={() => setActiveCategory(tip.category)} showReadMore={true} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-6">
            {activeCategory} Tips
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTips.map((tip) => (
              <TipCard key={tip.id} tip={tip} onReadMore={() => setActiveCategory(tip.category)} showReadMore={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTipPage;
