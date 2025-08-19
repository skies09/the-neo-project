import React, { useEffect, useState } from "react";
import AdoptCard from "../../components/cards/adoptCard.tsx";
import { dogAPI, Dog } from "../../services/api.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faHeart, 
	faPaw, 
	faSearch, 
	faHome,
	faSpinner
} from "@fortawesome/free-solid-svg-icons";

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
			<div className="min-h-screen pt-2 pb-16 px-4">
				<div className="flex flex-col justify-center items-center font-poppins text-2xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
					<FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl mb-4 text-skyBlue" />
					Loading dogs...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen pt-2 pb-16 px-4">
				<div className="flex flex-col justify-center items-center font-poppins text-2xl font-bold text-red-600 tracking-wider drop-shadow-md">
					<FontAwesomeIcon icon={faPaw} className="text-4xl mb-4 text-red-500" />
					{error}
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-2 pb-20 px-4">
			{/* Header Section */}
			<div className="text-center mb-8">
				<div className="flex justify-center items-center mb-4">
					<FontAwesomeIcon icon={faHeart} className="text-4xl text-skyBlue mr-4" />
					<h1 className="font-poppins text-3xl lg:text-4xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
						Dogs for Adoption
					</h1>
					<FontAwesomeIcon icon={faHeart} className="text-4xl text-skyBlue ml-4" />
				</div>
				<p className="text-lg text-oxfordBlue/70 font-mono">
					<FontAwesomeIcon icon={faSearch} className="mr-2" />
					Find your perfect companion
				</p>
			</div>

			{/* Content Section */}
			<div className="max-w-7xl mx-auto pt-12">
				{dogData && dogData.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28 justify-items-center">
						{dogData.map((dog) => (
							<AdoptCard key={dog.id} dog={dog} />
						))}
					</div>
				) : (
					<div className="flex flex-col justify-center items-center py-12">
						<FontAwesomeIcon icon={faHome} className="text-6xl mb-4 text-oxfordBlue/50" />
						<p className="text-lg text-oxfordBlue">
							No dogs available for adoption at the moment.
						</p>
						<p className="text-sm text-oxfordBlue/70 mt-2">
							Check back soon for new arrivals!
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
