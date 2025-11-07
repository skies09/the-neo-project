import React, { useEffect, useState } from "react";
import { breedsAPI, Breed } from "../../services/api";
import BreedCard from "../../components/cards/breedCard";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faList } from "@fortawesome/free-solid-svg-icons";
import BreedDetailModal from "../../components/modals/BreedDetailModal";

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
				setError("No breeds found, please check back later");
			} finally {
				setLoading(false);
			}
		};

		fetchInitialData();
	}, []);

	const fetchBreedsOfGroup = async (group: string) => {
		setSelectedGroup(group);
		setLoading(true);
		setError(null);

		try {
			const breedsData = await breedsAPI.getBreedsByGroup(group);
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
		setSelectedBreed(breed);
	};

	if (loading && groups.length === 0 && breeds.length === 0) {
		return (
			<motion.div
				className="min-h-screen pt-16 pb-8 px-4"
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
			className="min-h-screen pt-16 pb-8 px-4 bg-mintCream"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			{/* Header Section */}
			<motion.div
				className="text-center pt-4 mb-16"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
			>
				<div className="flex justify-center items-center my-4">
					<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center">
						Breeds
					</h1>
				</div>
				{error && (
					<motion.div
						className="max-w-7xl mx-auto pt-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.3,
							ease: "easeOut",
						}}
					>
						<div className="flex flex-col justify-center items-center py-12 bg-sark rounded-3xl shadow-xl">
							<p className="text-lg lg:text-xl text-mintCream font-fredoka max-w-5xl mx-auto text-center">
								{error}
							</p>
						</div>
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
							return (
								<button
									key={index}
									className={`px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 hover:text-yellowOrange ${
										selectedGroup === group
											? "bg-gradient-to-r from-highland to-sark text-honeydew shadow-lg transform scale-105"
											: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue hover:bg-oxfordBlue"
									}`}
									onClick={() => fetchBreedsOfGroup(group)}
								>
									<div className="flex items-center justify-center space-x-3">
										<FontAwesomeIcon
											icon={faPaw}
											className="text-lg"
										/>
										<span>{group}</span>
									</div>
								</button>
							);
						})}
					</div>
				)}
				{breeds && breeds.length > 0 && (
					<div className="flex justify-center items-center">
						<button
							className={`px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 hover:text-yellowOrange ${
								!selectedGroup
									? "bg-gradient-to-r from-highland to-sark text-honeydew shadow-lg transform scale-105"
									: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue hover:bg-oxfordBlue"
							}`}
							onClick={() => fetchAll()}
						>
							<div className="flex items-center justify-center space-x-3">
								<FontAwesomeIcon
									icon={faList}
									className="text-lg"
								/>
								<span>All Breeds</span>
							</div>
						</button>
					</div>
				)}
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
				) : (
					breeds.length > 0 && (
						<div>
							{selectedGroup && (
								<h2 className="text-4xl font-bold text-center mb-8 text-oxfordBlue font-delius">
									{selectedGroup} Breeds
								</h2>
							)}
							{!selectedGroup && (
								<h2 className="text-4xl font-bold text-center mb-8 text-oxfordBlue font-delius">
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
					)
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
