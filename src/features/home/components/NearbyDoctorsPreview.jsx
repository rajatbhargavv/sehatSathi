import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import DoctorCard from '../../../components/cards/DoctorCard';

const NearbyDoctorsPreview = ({ doctors = [] }) => {
	return (
		<Card>
			<div className="flex justify-between items-center mb-3">
				<h3 className="font-bold text-[var(--text)]">Nearby Doctors</h3>
				<Link to="/doctors" className="text-sm font-bold text-[var(--primary)]">
					See All →
				</Link>
			</div>

			<div className="space-y-3">
				{doctors.slice(0, 2).map((doc) => (
					<DoctorCard key={doc.id} data={doc} compact />
				))}
			</div>
		</Card>
	);
};

export default NearbyDoctorsPreview;
