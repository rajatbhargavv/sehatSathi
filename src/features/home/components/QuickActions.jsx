import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';

const QuickActions = ({ items = [] }) => {
	return (
		<div>
			<h3 className="text-lg font-bold mb-4 text-[var(--text)]">Quick Access</h3>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
				{items.map((item) => (
					<Card key={item.label} className="hover:shadow-md transition-shadow">
						<Link to={item.link} className="block">
							<div className="text-2xl">{item.icon}</div>
							<p className="mt-3 text-sm font-medium text-[var(--text)]">{item.label}</p>
						</Link>
					</Card>
				))}
			</div>
		</div>
	);
};

export default QuickActions;
