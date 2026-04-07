import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';

const TodayTipCard = ({ tip }) => {
	return (
		<Card
			style={{
				borderRadius: '14px',
				borderColor: 'var(--border)',
			}}
		>
			<div className="flex flex-col md:flex-row md:items-center gap-4">
				<div className="h-11 w-11 shrink-0 rounded-xl bg-[var(--warn-lt)] text-[var(--warn)] grid place-items-center text-xl">
					💡
				</div>

				<div className="min-w-0 flex-1">
					<p className="text-xs font-bold tracking-[0.16em] text-[var(--accent)]">TIP OF THE DAY</p>
					<p className="text-xl leading-tight font-bold text-[var(--text)]">Drink water before you feel thirsty</p>
					<p className="text-sm text-[var(--muted)] truncate">{tip}</p>
				</div>

				<Link
					to="/health-tips"
					className="shrink-0 inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white"
				>
					Read More
				</Link>
			</div>
		</Card>
	);
};

export default TodayTipCard;
