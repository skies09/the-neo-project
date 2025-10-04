import React, { useEffect, useState } from "react";
import AdoptCard from "../../components/cards/adoptCard";
import { dogAPI, Dog } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
	faHeart,
	faPaw,
	faSearch,
	faHome,
	faSpinner,
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
				setError(
					"No dogs available for adoption at this time, please check back later"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchDogs();
	}, []);

	if (loading) {
		return (
			<motion.div
				className="min-h-screen pt-2 pb-16 px-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<motion.div
					className="flex flex-col justify-center items-center font-poppins text-2xl font-bold text-oxfordBlue tracking-wider drop-shadow-md"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					<FontAwesomeIcon
						icon={faSpinner}
						className="animate-spin text-4xl mb-4 text-skyBlue"
					/>
					Loading dogs...
				</motion.div>
			</motion.div>
		);
	}

	if (error) {
		return (
			<motion.div
				className="min-h-screen pt-2 pb-16 px-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<motion.div
					className="flex flex-col justify-center items-center font-poppins text-2xl font-bold text-red-600 tracking-wider drop-shadow-md"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					<FontAwesomeIcon
						icon={faPaw}
						className="text-4xl mb-4 text-red-500"
					/>
					{error}
				</motion.div>
			</motion.div>
		);
	}

	return (
		<motion.div
			className="min-h-screen pt-2 pb-20 px-4"
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
				<div className="flex justify-center items-center mb-4">
					<FontAwesomeIcon
						icon={faHeart}
						className="text-4xl text-skyBlue mr-4"
					/>
					<h1 className="font-poppins text-3xl lg:text-4xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
						Dogs for Adoption
					</h1>
					<FontAwesomeIcon
						icon={faHeart}
						className="text-4xl text-skyBlue ml-4"
					/>
				</div>
				<p className="text-lg text-oxfordBlue/70 font-mono">
					<FontAwesomeIcon icon={faSearch} className="mr-2" />
					Find your perfect companion
				</p>
			</motion.div>

			{/* Content Section */}
			<motion.div
				className="max-w-7xl mx-auto pt-12"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
			>
				{dogData && dogData.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28 justify-items-center">
						{dogData.map((dog) => (
							<AdoptCard key={dog.id} dog={dog} />
						))}
					</div>
				) : (
					<div className="flex flex-col justify-center items-center py-12">
						<FontAwesomeIcon
							icon={faHome}
							className="text-6xl mb-4 text-oxfordBlue/50"
						/>
						<p className="text-lg text-oxfordBlue">
							No dogs available for adoption at the moment.
						</p>
						<p className="text-sm text-oxfordBlue/70 mt-2">
							Check back soon for new arrivals!
						</p>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
