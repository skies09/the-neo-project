import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
	const [hasFetched, setHasFetched] = useState(false);
	const headerRef = useRef(null);
	const contentRef = useRef(null);
	const ctaRef = useRef(null);

	const [headerAnimated, setHeaderAnimated] = useState(false);
	const [contentAnimated, setContentAnimated] = useState(false);
	const [ctaAnimated, setCtaAnimated] = useState(false);

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
				setHasFetched(true);
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
				setHasFetched(true);
			}
		};

		fetchFeaturedDog();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, lastFetchDate]);

	// Set up viewport detection (hooks must be called unconditionally)
	const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
	const contentInView = useInView(contentRef, {
		once: true,
		margin: "-100px",
	});
	const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

	useEffect(() => {
		if (headerInView && !headerAnimated) setHeaderAnimated(true);
		if (contentInView && !contentAnimated) setContentAnimated(true);
		if (ctaInView && !ctaAnimated) setCtaAnimated(true);
	}, [
		headerInView,
		contentInView,
		ctaInView,
		headerAnimated,
		contentAnimated,
		ctaAnimated,
	]);

	// Auto-show CTA after dogs are loaded and a delay
	useEffect(() => {
		if (dogsOfTheDay.length > 0 && !ctaAnimated) {
			const timer = setTimeout(() => {
				setCtaAnimated(true);
			}, 1000); // Show CTA 1 second after dogs load
			return () => clearTimeout(timer);
		}
	}, [dogsOfTheDay.length, ctaAnimated]);

	// Don't render the section if there are no dogs after we've attempted to fetch
	if (hasFetched && !loading && dogsOfTheDay.length === 0 && !error) {
		return null;
	}

	return (
		<section
			className={`${dogsOfTheDay.length > 0 ? "block" : "hidden"} py-20`}
		>
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					ref={headerRef}
					className="text-center mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={
						headerAnimated
							? { opacity: 1, y: 0 }
							: headerInView
							? { opacity: 1, y: 0 }
							: { opacity: 0, y: -20 }
					}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<h2 className="font-delius text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							The Neo Trio
						</h2>
					</div>
					<p className="text-lg text-highland font-fredoka max-w-5xl mx-auto">
						Meet today's top dogs, waiting for their forever home!
					</p>
				</motion.div>

				{/* Featured Dogs Grid */}
				<motion.div
					ref={contentRef}
					className="max-w-7xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={
						contentAnimated
							? { opacity: 1, y: 0 }
							: contentInView
							? { opacity: 1, y: 0 }
							: { opacity: 0, y: 20 }
					}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					{loading ? (
						<div className="bg-white rounded-3xl shadow-xl p-12 text-center">
							<div className="animate-spin w-16 h-16 border-4 border-skyBlue border-t-transparent rounded-full mx-auto mb-4"></div>
							<p className="text-oxfordBlue/70 font-poppins">
								Loading today's featured dogs...
							</p>
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
						ref={ctaRef}
						className="text-center mt-12"
						initial={{ opacity: 0, y: 20 }}
						animate={
							ctaAnimated || ctaInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
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
