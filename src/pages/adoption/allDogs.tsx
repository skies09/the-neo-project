import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdoptCard from "../../components/cards/adoptCard";
import { dogAPI, Dog } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faSearch, faDog } from "@fortawesome/free-solid-svg-icons";
import PawLoading from "../../components/PawLoading";
import {
	ErrorCard,
	RefreshContactSubtitle,
} from "../../components/ErrorCard";

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

	const showEmptyState = !loading && (Boolean(error) || dogData.length === 0);

	if (loading) {
		return (
			<div className="relative min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16">
				<div className="mx-auto max-w-4xl px-4 py-20">
					<div className="text-center">
						<PawLoading message="Fetching all the dogs ready for adoption..." />
					</div>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream px-4 pb-20 pt-16"
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

			{/* Empty / error — same card layout as blog post not found */}
			{showEmptyState && (
				<motion.div
					className="mx-auto max-w-4xl px-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					<div className="text-center">
						<ErrorCard
							icon={faDog}
							className="mx-auto max-w-2xl"
							cardPaddingClass="p-8"
							title="No dogs available for adoption"
							titleClassName="font-delius text-2xl font-bold text-oxfordBlue"
							footer={
								<div className="flex justify-center">
									<Link
										to="/"
										className="btn-primary inline-flex items-center justify-center px-6 py-3"
									>
										Back to home
									</Link>
								</div>
							}
						>
							<RefreshContactSubtitle className="text-oxfordBlue/70" />
						</ErrorCard>
					</div>
				</motion.div>
			)}

			{/* Content Section */}
			{!showEmptyState && (
				<motion.div
					className="mx-auto max-w-7xl pt-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					<div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
						{dogData.map((dog) => (
							<AdoptCard key={dog.id} dog={dog} />
						))}
					</div>
				</motion.div>
			)}
		</motion.div>
	);
}
