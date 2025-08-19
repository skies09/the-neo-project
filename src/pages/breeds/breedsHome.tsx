import React, { useEffect, useState } from "react";
import { breedsAPI, Breed } from "../../services/api.ts";
import BreedCard from "../../components/cards/breedCard.tsx";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faList } from "@fortawesome/free-solid-svg-icons";
import BreedDetailModal from "../../components/modals/BreedDetailModal.tsx";

export default function Breeds() {
	const [groups, setGroups] = useState<string[]>([]);
	const [breeds, setBreeds] = useState<Breed[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

	useEffect(() => {
		const fetchInitialData = async () => {
			setLoading(true);
			setError(null);

			try {
				// Fetch both groups and all breeds simultaneously
				const [groupsData, breedsData] = await Promise.all([
					breedsAPI.getBreedGroups(),
					breedsAPI.getAllBreeds(),
				]);

				setGroups(groupsData);
				setBreeds(breedsData);
			} catch (error) {
				console.error(
					"Error fetching initial data:",
					error instanceof Error ? error.message : String(error)
				);
				setError("Error fetching breed data. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchInitialData();
	}, []);

	const fetchBreedsOfGroup = async (group: string) => {
		console.log("Fetching breeds for group:", group);
		setSelectedGroup(group);
		setLoading(true);
		setError(null);

		try {
			const breedsData = await breedsAPI.getBreedsByGroup(group);
			console.log("Breeds data for group:", breedsData);
			setBreeds(breedsData);
		} catch (error) {
			console.error(
				"Error fetching breeds:",
				error instanceof Error ? error.message : String(error)
			);
			setError("Error fetching breeds. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const fetchAll = async () => {
		setSelectedGroup(null);
		setLoading(true);
		setError(null);

		try {
			const breedsData = await breedsAPI.getAllBreeds();
			setBreeds(breedsData);
		} catch (error) {
			console.error(
				"Error fetching breeds:",
				error instanceof Error ? error.message : String(error)
			);
			setError("Error fetching breeds. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleBreedClick = (breed: Breed) => {
		console.log("Breed clicked:", breed);
		setSelectedBreed(breed);
	};

	if (loading && groups.length === 0 && breeds.length === 0) {
		return (
			<motion.div 
				className="min-h-screen pt-4 pb-8 px-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<motion.div 
					className="flex justify-center items-center font-poppins text-2xl lg:text-3xl font-bold text-oxfordBlue tracking-wider drop-shadow-md"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					Loading breeds...
				</motion.div>
			</motion.div>
		);
	}

	return (
		<motion.div 
			className="min-h-screen pt-4 pb-8 px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			{/* Header Section */}
			<motion.div 
				className="text-center mb-8"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
			>
				<h1 className="font-poppins text-3xl lg:text-4xl font-bold text-oxfordBlue tracking-wider drop-shadow-md mb-4">
					Breeds
				</h1>

				{error && (
					<motion.div 
						className="flex justify-center items-center mt-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
					>
						<p className="text-red-600 font-semibold">{error}</p>
					</motion.div>
				)}
			</motion.div>

			{/* Filter Buttons Section */}
			<motion.div 
				className="mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
			>
				{groups && groups.length > 0 && (
					<div className="flex justify-center items-center flex-wrap gap-4 mb-6">
						{groups.map((group, index) => {
							console.log(
								"Rendering group button:",
								group,
								index
							);
							return (
								<motion.button
									key={index}
									className="group relative overflow-hidden bg-gradient-to-r from-skyBlue to-turquoise text-oxfordBlue px-6 py-4 rounded-xl font-poppins font-semibold text-base shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border border-skyBlue/30"
									onClick={() => fetchBreedsOfGroup(group)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<div className="flex items-center space-x-3 relative z-10">
										<FontAwesomeIcon
											icon={faPaw}
											className="text-lg"
										/>
										<span>{group}</span>
									</div>
									<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</motion.button>
							);
						})}
					</div>
				)}
				<div className="flex justify-center items-center">
					<motion.button
						className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-xl font-poppins font-semibold text-base shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border border-oxfordBlue/30"
						onClick={() => fetchAll()}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<div className="flex items-center space-x-3 relative z-10">
							<FontAwesomeIcon
								icon={faList}
								className="text-lg"
							/>
							<span>All Breeds</span>
						</div>
						<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-oxfordBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</motion.button>
				</div>
			</motion.div>

			{/* Content Section */}
			<motion.div 
				className="max-w-7xl mx-auto"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
			>
				{loading && breeds.length === 0 ? (
					<div className="flex justify-center items-center py-12">
						<p className="text-lg text-oxfordBlue">
							Loading breeds...
						</p>
					</div>
				) : breeds.length > 0 ? (
					<div>
						{selectedGroup && (
							<h2 className="text-2xl font-bold text-center mb-8 text-oxfordBlue">
								{selectedGroup} Breeds
							</h2>
						)}
						{!selectedGroup && (
							<h2 className="text-2xl font-bold text-center mb-8 text-oxfordBlue">
								All Breeds
							</h2>
						)}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 justify-items-center">
							{breeds.map((breed) => (
								<BreedCard
									key={breed.id}
									breed={breed}
									onClick={handleBreedClick}
								/>
							))}
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center py-12">
						<p className="text-lg text-oxfordBlue">
							No breeds found.
						</p>
					</div>
				)}
			</motion.div>

			{/* Breed Detail Modal */}
			<BreedDetailModal 
				selectedBreed={selectedBreed}
				onClose={() => setSelectedBreed(null)}
			/>
		</motion.div>
	);
}
