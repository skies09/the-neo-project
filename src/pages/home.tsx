import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdoptCard from "../components/cards/adoptCard.tsx";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faPaw,
	faSearch,
	faUsers,
	faStar,
	faArrowRight,
	faDog,
	faCalculator,
	faList,
} from "@fortawesome/free-solid-svg-icons";

interface DogOfTheDay {
	id: string;
	public_id: string;
	name: string;
	gender: string;
	age: number;
	size: string;
	weight: number;
	good_with_dogs: boolean | null;
	good_with_cats: boolean | null;
	good_with_children: boolean | null;
	breed: string;
	is_crossbreed: boolean | null;
	extra_information?: string;
	image?: string;
	kennel: {
		id: string;
		public_id: string;
		username: string;
		name: string;
		email: string;
	};
	created: string;
	updated: string;
}

const Home = () => {
	const [dogOfTheDay, setDogOfTheDay] = useState<DogOfTheDay | null>(null);

	useEffect(() => {
		const fetchGroups = async () => {
			const url =
				process.env.REACT_APP_NEO_PROJECT_BASE_URL +
				"api/dogs/dog-of-the-day/";

			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const dogOfTheDayData = await response.json();
				setDogOfTheDay(dogOfTheDayData);
			} catch (error) {
				console.error(
					"Error fetching dog of the day:",
					error instanceof Error ? error.message : String(error)
				);
			}
		};

		fetchGroups();
	}, []);

	return (
		<div
			id="home"
			className="min-h-screen bg-gradient-to-br from-honeydew via-mintCream to-skyBlue/20"
		>
			{/* Hero Section */}
			<section className="relative overflow-hidden pt-20 pb-16">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-20 left-10 w-32 h-32 bg-skyBlue rounded-full blur-3xl"></div>
					<div className="absolute top-40 right-20 w-24 h-24 bg-aquamarine rounded-full blur-2xl"></div>
					<div className="absolute bottom-20 left-1/3 w-40 h-40 bg-turquoise rounded-full blur-3xl"></div>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="mb-8"
						>
							<div className="flex justify-center items-center mb-6">
								<FontAwesomeIcon
									icon={faHeart}
									className="text-6xl text-skyBlue mr-4"
								/>
								<h1 className="font-poppins text-5xl lg:text-7xl font-bold text-oxfordBlue tracking-tight">
									Every Dog
									<span className="block bg-gradient-to-r from-skyBlue to-aquamarine bg-clip-text text-transparent">
										Deserves A Home
									</span>
								</h1>
								<FontAwesomeIcon
									icon={faPaw}
									className="text-6xl text-aquamarine ml-4"
								/>
							</div>
							<p className="text-xl lg:text-2xl text-oxfordBlue/80 font-poppins max-w-3xl mx-auto leading-relaxed">
								Discover amazing dogs waiting for their forever
								homes. Find the perfect breed that matches your
								lifestyle and start your adoption journey today.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="flex flex-col sm:flex-row gap-4 justify-center items-center"
						>
							<Link
								to="/adopt"
								className="group bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-2xl font-poppins font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center"
							>
								<FontAwesomeIcon
									icon={faSearch}
									className="mr-3"
								/>
								Find My Perfect Dog
								<FontAwesomeIcon
									icon={faArrowRight}
									className="ml-3 group-hover:translate-x-1 transition-transform"
								/>
							</Link>
							<Link
								to="/allDogs"
								className="group bg-white/80 backdrop-blur-sm text-oxfordBlue px-8 py-4 rounded-2xl font-poppins font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-skyBlue/30 flex items-center"
							>
								<FontAwesomeIcon
									icon={faDog}
									className="mr-3"
								/>
								Browse All Dogs
							</Link>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Statistics Section */}
			<section className="py-16 bg-gradient-to-r from-skyBlue/10 to-aquamarine/10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="grid grid-cols-1 md:grid-cols-3 gap-8"
					>
						<div className="text-center">
							<div className="w-20 h-20 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-4">
								<FontAwesomeIcon
									icon={faHeart}
									className="text-3xl text-white"
								/>
							</div>
							<h3 className="text-4xl font-bold text-oxfordBlue mb-2">
								500+
							</h3>
							<p className="text-oxfordBlue/70 font-poppins">
								Happy Adoptions
							</p>
						</div>
						<div className="text-center">
							<div className="w-20 h-20 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
								<FontAwesomeIcon
									icon={faUsers}
									className="text-3xl text-white"
								/>
							</div>
							<h3 className="text-4xl font-bold text-oxfordBlue mb-2">
								100+
							</h3>
							<p className="text-oxfordBlue/70 font-poppins">
								Trusted Kennels
							</p>
						</div>
						<div className="text-center">
							<div className="w-20 h-20 bg-gradient-to-br from-turquoise to-skyBlue rounded-full flex items-center justify-center mx-auto mb-4">
								<FontAwesomeIcon
									icon={faPaw}
									className="text-3xl text-white"
								/>
							</div>
							<h3 className="text-4xl font-bold text-oxfordBlue mb-2">
								250+
							</h3>
							<p className="text-oxfordBlue/70 font-poppins">
								Dog Breeds
							</p>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-oxfordBlue mb-4 font-poppins">
							Everything You Need to Find Your Perfect Dog
						</h2>
						<p className="text-xl text-oxfordBlue/70 font-poppins max-w-3xl mx-auto">
							From breed matching to adoption, we've got you
							covered every step of the way
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.1 }}
							viewport={{ once: true }}
							className="group h-full"
						>
							<Link to="/allDogs" className="block h-full">
								<div className="bg-gradient-to-br from-skyBlue to-aquamarine rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
										<FontAwesomeIcon
											icon={faDog}
											className="text-3xl text-white"
										/>
									</div>
									<h3 className="text-2xl font-bold text-white mb-4 font-poppins">
										Browse Dogs
									</h3>
									<p className="text-white/90 font-poppins leading-relaxed flex-grow">
										Explore our extensive collection of dogs
										available for adoption. Find your
										perfect match from hundreds of loving
										companions.
									</p>
									<div className="mt-6 flex items-center text-white font-semibold">
										<span>Start Browsing</span>
										<FontAwesomeIcon
											icon={faArrowRight}
											className="ml-2 group-hover:translate-x-1 transition-transform"
										/>
									</div>
								</div>
							</Link>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className="group h-full"
						>
							<Link
								to="/breedCalculator"
								className="block h-full"
							>
								<div className="bg-gradient-to-br from-aquamarine to-turquoise rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
										<FontAwesomeIcon
											icon={faCalculator}
											className="text-3xl text-white"
										/>
									</div>
									<h3 className="text-2xl font-bold text-white mb-4 font-poppins">
										Breed Calculator
									</h3>
									<p className="text-white/90 font-poppins leading-relaxed flex-grow">
										Not sure which breed is right for you?
										Take our lifestyle assessment and get
										personalized breed recommendations.
									</p>
									<div className="mt-6 flex items-center text-white font-semibold">
										<span>Find Your Breed</span>
										<FontAwesomeIcon
											icon={faArrowRight}
											className="ml-2 group-hover:translate-x-1 transition-transform"
										/>
									</div>
								</div>
							</Link>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
							className="group h-full"
						>
							<Link to="/breeds" className="block h-full">
								<div className="bg-gradient-to-br from-turquoise to-skyBlue rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
										<FontAwesomeIcon
											icon={faList}
											className="text-3xl text-white"
										/>
									</div>
									<h3 className="text-2xl font-bold text-white mb-4 font-poppins">
										Dog Breeds
									</h3>
									<p className="text-white/90 font-poppins leading-relaxed flex-grow">
										Learn about different dog breeds, their
										characteristics, and find the perfect
										match for your lifestyle and
										preferences.
									</p>
									<div className="mt-6 flex items-center text-white font-semibold">
										<span>Explore Breeds</span>
										<FontAwesomeIcon
											icon={faArrowRight}
											className="ml-2 group-hover:translate-x-1 transition-transform"
										/>
									</div>
								</div>
							</Link>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Dog of the Day Section */}
			{dogOfTheDay && Object.keys(dogOfTheDay).length !== 0 && (
				<section className="py-16 bg-gradient-to-r from-oxfordBlue/5 to-skyBlue/5">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="text-center mb-12"
						>
							<div className="flex justify-center items-center mb-4">
								<FontAwesomeIcon
									icon={faStar}
									className="text-4xl text-skyBlue mr-4"
								/>
								<h2 className="text-4xl lg:text-5xl font-bold text-oxfordBlue font-poppins">
									Dog of the Day
								</h2>
								<FontAwesomeIcon
									icon={faStar}
									className="text-4xl text-skyBlue ml-4"
								/>
							</div>
							<p className="text-xl text-oxfordBlue/70 font-poppins">
								Meet today's featured companion - ready to steal
								your heart!
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className="flex justify-center"
						>
							<AdoptCard dog={dogOfTheDay} />
						</motion.div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<section className="py-16 bg-gradient-to-r from-green-700 to-emerald-800">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-poppins">
							Ready to Find Your Perfect Match?
						</h2>
						<p className="text-xl text-white/90 font-poppins mb-8 max-w-2xl mx-auto">
							Join hundreds of happy families who found their
							forever companions through our platform.
						</p>
						<Link
							to="/adopt"
							className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-2xl font-poppins font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
						>
							<FontAwesomeIcon icon={faHeart} className="mr-3" />
							Start Your Adoption Journey
							<FontAwesomeIcon
								icon={faArrowRight}
								className="ml-3"
							/>
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default Home;
