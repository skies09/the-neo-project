import React, { useEffect, useState } from "react";
import AdoptCard from "../../components/cards/adoptCard";
import { dogAPI, Dog } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faSearch, faHome } from "@fortawesome/free-solid-svg-icons";
import PawLoading from "../../components/PawLoading";

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
				if (data && Array.isArray(data)) {
					setDogData(data);
				} else {
					setDogData([]);
				}
			} catch (error) {
				console.error(
					"Error fetching dogs:",
					error instanceof Error ? error.message : String(error),
				);
				setError(
					"No dogs available for adoption at this time, please check back later",
				);
				setDogData([]);
			} finally {
				setLoading(false);
			}
		};

		fetchDogs();
	}, []);

	if (loading) {
		return (
			<motion.div
				className="min-h-screen pt-24 pb-16 px-4"
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
					Fetching dogs...
					<PawLoading />
				</motion.div>
			</motion.div>
		);
	}

	return (
		<motion.div
			className="min-h-screen pt-16 pb-20 px-4 bg-mintCream"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			{/* Header Section */}
			<motion.div
				className="text-center pt-4 mb-8"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
			>
				<div className="flex justify-center items-center my-4">
					<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center">
						Dogs for Adoption
					</h1>
				</div>
				<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto mb-8">
					<FontAwesomeIcon icon={faSearch} className="mr-2" />
					Browse all the dogs available
				</p>
			</motion.div>

			{/* Error Message */}
			{error && (
				<motion.div
					className="max-w-7xl mx-auto pt-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
				>
					<div className="flex flex-col justify-center items-center py-12 bg-sark rounded-3xl shadow-xl">
						<p className="text-lg lg:text-xl text-mintCream font-fredoka max-w-5xl mx-auto text-center">
							{error}
						</p>
					</div>
				</motion.div>
			)}

			{/* Content Section */}
			{!error && (
				<motion.div
					className="max-w-7xl mx-auto pt-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					{dogData && dogData.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
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
							<p className="text-lg text-oxfordBlue font-poppins">
								No dogs available for adoption at the moment.
							</p>
							<p className="text-sm text-oxfordBlue/70 mt-2 font-poppins">
								Check back soon for new arrivals!
							</p>
						</div>
					)}
				</motion.div>
			)}
		</motion.div>
	);
}
