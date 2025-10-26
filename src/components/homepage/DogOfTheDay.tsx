import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { dogAPI, Dog } from "../../services/api";
import AdoptCard from "../cards/adoptCard";
import { RootState } from "../../store/store";
import {
	setDogOfTheDay,
	setDogsOfTheDay as setDogsOfTheDayAction,
	setLastFetchDate,
	setLoading,
	setError,
	shouldFetchNewDogOfTheDay,
	getTodayDateString,
} from "../../store/dogOfTheDay/actions";

const DogOfTheDay: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		dog: featuredDog,
		dogs,
		loading,
		error,
		lastFetchDate,
	} = useSelector((state: RootState) => state.dogOfTheDay);
	const [dogsOfTheDay, setLocalDogsOfTheDay] = React.useState<Dog[]>([]);

	useEffect(() => {
		const fetchFeaturedDog = async () => {
			// Decide whether to fetch new data
			const hasThreeDogsInStore = Array.isArray(dogs) && dogs.length >= 3;
			const needFetch =
				shouldFetchNewDogOfTheDay(lastFetchDate) ||
				!hasThreeDogsInStore;

			if (!needFetch) {
				// Use existing persisted dogs if valid; fallback to persisted dogs
				if (dogs && dogs.length > 0) {
					setLocalDogsOfTheDay(dogs);
				} else if (featuredDog) {
					setLocalDogsOfTheDay([featuredDog]);
				}
				return;
			}

			dispatch(setLoading(true));
			dispatch(setError(null));

			try {
				const apiDogs = await dogAPI.getDogOfTheDay();
				if (apiDogs && apiDogs.length > 0) {
					const topThree = apiDogs.slice(0, 3);
					setLocalDogsOfTheDay(topThree);
					// Persist array and first dog for backward compatibility
					dispatch(setDogsOfTheDayAction(topThree));
					dispatch(setDogOfTheDay(topThree[0]));
					dispatch(setLastFetchDate(getTodayDateString()));
				}
			} catch (error) {
				console.error("Error fetching featured dogs:", error);
				dispatch(setError("Failed to fetch today's featured dogs"));
			} finally {
				dispatch(setLoading(false));
			}
		};

		fetchFeaturedDog();
	}, [dispatch, lastFetchDate]);

	// Don't render the section if there are no dogs (regardless of error state)
	if (!loading && dogsOfTheDay.length === 0) {
		return null;
	}

	return (
		<section className="py-20 bg-gradient-to-br from-skyBlue/10 to-aquamarine/10">
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					className="text-center mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center">
						<h2 className="font-comic text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							The Neo Trio
						</h2>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto pt-4">
						Meet today's top dogs, waiting for their forever home!
					</p>
				</motion.div>

				{/* Featured Dogs Grid */}
				<motion.div
					className="max-w-7xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					{loading ? (
						<div className="bg-white rounded-3xl shadow-xl p-12 text-center">
							<div className="animate-spin w-16 h-16 border-4 border-skyBlue border-t-transparent rounded-full mx-auto mb-4"></div>
							<p className="text-oxfordBlue/70 font-poppins">
								Loading today's featured dogs...
							</p>
						</div>
					) : error ? (
						<div className="bg-white rounded-3xl shadow-xl p-12 text-center">
							<FontAwesomeIcon
								icon={faPaw}
								className="text-6xl text-red-500/60 mb-4"
							/>
							<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-2">
								Error Loading Dogs
							</h3>
							<p className="text-oxfordBlue/70 font-poppins mb-4">
								{error}
							</p>
							<button
								onClick={() => window.location.reload()}
								className="bg-skyBlue text-white px-6 py-2 rounded-lg font-poppins hover:bg-skyBlue/80 transition-colors"
							>
								Try Again
							</button>
						</div>
					) : dogsOfTheDay.length > 0 ? (
						<div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
								{dogsOfTheDay.map((dog) => (
									<div
										key={dog.id}
										className="transform hover:scale-105 transition-transform duration-300 px-2"
									>
										<AdoptCard dog={dog} />
									</div>
								))}
							</div>
						</div>
					) : null}
				</motion.div>

				{/* Call to Action - only show if there are dogs */}
				{dogsOfTheDay.length > 0 && (
					<motion.div
						className="text-center mt-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.4,
							ease: "easeOut",
						}}
					>
						<button
							onClick={() => navigate("/allDogs")}
							className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset whitespace-nowrap text-xl"
						>
							<div className="flex items-center space-x-3 relative z-10">
								<FontAwesomeIcon
									icon={faHeart}
									className="text-lg"
								/>
								<span>View All Available Dogs</span>
							</div>
							<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</button>
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default DogOfTheDay;
