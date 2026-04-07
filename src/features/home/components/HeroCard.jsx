import React from 'react';
import Card from '../../../components/ui/Card';

const HeroCard = ({ todayLabel, statCards }) => {
	return (
		<Card
			style={{
				padding: '1.2rem',
				borderRadius: '16px',
				background: 'linear-gradient(135deg, var(--primary-dk), var(--primary))',
				borderColor: 'transparent',
				color: 'white',
			}}
		>
			<p className="text-xs tracking-[0.16em] text-[var(--green-300)] mb-2">{todayLabel}</p>
			<h2 className="text-3xl font-bold mb-1 text-white">Your Health Dashboard</h2>
			<p className="text-sm text-[var(--green-50)] mb-6">
				Stay on top of medications, find doctors, and read today&apos;s wellness tip.
			</p>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
				{statCards.map((item) => (
					<Card
						key={item.key}
						style={{
							padding: '0.7rem',
							background: 'rgba(255,255,255,0.16)',
							borderColor: 'rgba(255,255,255,0.2)',
							backdropFilter: 'blur(2px)',
						}}
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
