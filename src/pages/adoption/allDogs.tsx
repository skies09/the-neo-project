import React, { useEffect, useState } from "react";
import AdoptCard from "../../components/cards/adoptCard.tsx";
import { dogAPI, Dog } from "../../services/api.ts";

export default function AllDogs() {
	const [dogData, setDogData] = useState<Dog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDogs = async () => {
			setLoading(true);
			setError(null);
			
			try {
				const data = await dogAPI.getAllDogs();
				setDogData(data);
			} catch (error) {
				console.error(
					"Error fetching dogs:",
					error instanceof Error ? error.message : String(error)
				);
				setError("Error fetching dogs. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchDogs();
	}, []);

	if (loading) {
		return (
			<div className="w-screen overflow-hidden h-full mt-4">
				<div className="flex justify-center items-center font-poppins text-2xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
					Loading dogs...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-screen overflow-hidden h-full mt-4">
				<div className="flex justify-center items-center font-poppins text-2xl font-bold text-red-600 tracking-wider drop-shadow-md">
					{error}
				</div>
			</div>
		);
	}

	return (
		<div id="adopt" className="w-screen overflow-hidden h-full mt-4">
			<div className="flex justify-center items-center font-poppins text-2xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
				Dogs for adoption
			</div>
			<div>
				{dogData && dogData.length > 0 ? (
					<ul className="flex flex-wrap justify-center mt-2">
						{dogData.map((dog) => (
							<li className="m-2" key={dog.id}>
								<AdoptCard dog={dog} />
							</li>
						))}
					</ul>
				) : (
					<div className="flex justify-center items-center mt-8">
						<p className="text-lg text-oxfordBlue">No dogs available for adoption at the moment.</p>
					</div>
				)}
			</div>
		</div>
	);
}
