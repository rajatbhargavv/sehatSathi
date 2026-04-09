import React from 'react';
import Card from '../../../components/ui/Card';

const HeroCard = ({ todayLabel, statCards }) => {
	return (
		// added card component Hero-card instead of overwritting the styles - rishabh
		<Card 
		variant="hero" className='p-6'
		>
			<p className="text-xs tracking-[0.16em] text-[var(--green-300)] mb-2">{todayLabel}</p>
			<h2 className="text-3xl font-bold mb-1 text-white">Your Health Dashboard</h2>
			<p className="text-sm text-[var(--green-50)] mb-6">
				Stay on top of medications, find doctors, and read today&apos;s wellness tip.
			</p>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
				{statCards.map((item) => (
					// Same here - rishabh
					<Card
						key={item.key}
						  variant="glass"
						  className="p-3 text-center"
					>
						<p className="text-3xl leading-none font-bold text-white">{item.value}</p>
						<p className="mt-1 text-xs text-[var(--green-50)]">{item.label}</p>
					</Card>
				))}
			</div>
		</Card>
	);
};

export default HeroCard;
