import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdoptCard from "../components/cards/adoptCard";
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
	faShieldAlt,
	faClock,
	faPhone,
	faEnvelope,
	faMapMarkerAlt,
	faQuoteLeft,
	faCheckCircle,
	faAward,
	faHandsHelping,
} from "@fortawesome/free-solid-svg-icons";
import {
	faFacebook,
	faTwitter,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Left Column - Text Content */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center lg:text-left"
						>
							<div className="flex justify-center lg:justify-start items-center mb-6">
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
							</div>
							<p className="text-xl lg:text-2xl text-oxfordBlue/80 font-poppins max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
								Discover amazing dogs waiting for their forever
								homes. Find the perfect breed that matches your
								lifestyle and start your adoption journey today.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
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
							</div>
						</motion.div>

						{/* Right Column - Hero Image Placeholder */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="relative"
						>
							<div className="relative bg-gradient-to-br from-skyBlue/20 to-aquamarine/20 rounded-3xl p-8 shadow-2xl">
								{/* Hero Image Placeholder */}
								<div className="aspect-[4/3] bg-gradient-to-br from-skyBlue/30 to-aquamarine/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-skyBlue/50">
									<div className="text-center">
										<FontAwesomeIcon
											icon={faPaw}
											className="text-6xl text-skyBlue/60 mb-4"
										/>
										<p className="text-oxfordBlue/60 font-poppins font-semibold">
											Hero Image Placeholder
										</p>
										<p className="text-sm text-oxfordBlue/40 mt-2">
											Add your main hero image here
										</p>
									</div>
								</div>

								{/* Floating Elements */}
								<div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center shadow-lg">
									<FontAwesomeIcon
										icon={faStar}
										className="text-2xl text-white"
									/>
								</div>
								<div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-turquoise to-skyBlue rounded-full flex items-center justify-center shadow-lg">
									<FontAwesomeIcon
										icon={faHeart}
										className="text-xl text-white"
									/>
								</div>
							</div>
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

			{/* How It Works Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-oxfordBlue mb-6 font-poppins">
							How It Works
						</h2>
						<p className="text-xl text-oxfordBlue/70 font-poppins max-w-3xl mx-auto">
							Finding your perfect companion is simple with our
							streamlined process
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{/* Step 1 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.1 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="relative mb-8">
								{/* Step Image Placeholder */}
								<div className="aspect-square bg-gradient-to-br from-skyBlue/20 to-aquamarine/20 rounded-3xl flex items-center justify-center border-2 border-dashed border-skyBlue/30 mb-6">
									<div className="text-center">
										<FontAwesomeIcon
											icon={faSearch}
											className="text-5xl text-skyBlue/60 mb-4"
										/>
										<p className="text-oxfordBlue/60 font-poppins font-semibold">
											Step 1 Image
										</p>
										<p className="text-sm text-oxfordBlue/40 mt-2">
											Add search/browse image
										</p>
									</div>
								</div>
								<div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center text-white font-bold text-lg">
									1
								</div>
							</div>
							<h3 className="text-2xl font-bold text-oxfordBlue mb-4 font-poppins">
								Browse & Search
							</h3>
							<p className="text-oxfordBlue/70 font-poppins leading-relaxed">
								Explore our extensive database of dogs available
								for adoption. Use our advanced filters to find
								the perfect match for your lifestyle.
							</p>
						</motion.div>

						{/* Step 2 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="relative mb-8">
								{/* Step Image Placeholder */}
								<div className="aspect-square bg-gradient-to-br from-aquamarine/20 to-turquoise/20 rounded-3xl flex items-center justify-center border-2 border-dashed border-aquamarine/30 mb-6">
									<div className="text-center">
										<FontAwesomeIcon
											icon={faHeart}
											className="text-5xl text-aquamarine/60 mb-4"
										/>
										<p className="text-oxfordBlue/60 font-poppins font-semibold">
											Step 2 Image
										</p>
										<p className="text-sm text-oxfordBlue/40 mt-2">
											Add connection/meeting image
										</p>
									</div>
								</div>
								<div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center text-white font-bold text-lg">
									2
								</div>
							</div>
							<h3 className="text-2xl font-bold text-oxfordBlue mb-4 font-poppins">
								Connect & Meet
							</h3>
							<p className="text-oxfordBlue/70 font-poppins leading-relaxed">
								Connect with the kennel and arrange a meeting
								with your potential new family member. We
								facilitate safe and secure interactions.
							</p>
						</motion.div>

						{/* Step 3 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="relative mb-8">
								{/* Step Image Placeholder */}
								<div className="aspect-square bg-gradient-to-br from-turquoise/20 to-skyBlue/20 rounded-3xl flex items-center justify-center border-2 border-dashed border-turquoise/30 mb-6">
									<div className="text-center">
										<FontAwesomeIcon
											icon={faHandsHelping}
											className="text-5xl text-turquoise/60 mb-4"
										/>
										<p className="text-oxfordBlue/60 font-poppins font-semibold">
											Step 3 Image
										</p>
										<p className="text-sm text-oxfordBlue/40 mt-2">
											Add adoption/family image
										</p>
									</div>
								</div>
								<div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-turquoise to-skyBlue rounded-full flex items-center justify-center text-white font-bold text-lg">
									3
								</div>
							</div>
							<h3 className="text-2xl font-bold text-oxfordBlue mb-4 font-poppins">
								Adopt & Love
							</h3>
							<p className="text-oxfordBlue/70 font-poppins leading-relaxed">
								Complete the adoption process and welcome your
								new best friend home. Start your journey of
								unconditional love and companionship.
							</p>
						</motion.div>
					</div>
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
									<p className="text-oxfordBlue font-poppins leading-relaxed flex-grow">
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
									<p className="text-oxfordBlue font-poppins leading-relaxed flex-grow">
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
									<p className="text-oxfordBlue font-poppins leading-relaxed flex-grow">
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

			{/* Testimonials Section */}
			<section className="py-20 bg-gradient-to-br from-skyBlue/5 to-aquamarine/5">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-oxfordBlue mb-6 font-poppins">
							Happy Families, Happy Dogs
						</h2>
						<p className="text-xl text-oxfordBlue/70 font-poppins max-w-3xl mx-auto">
							See what our community has to say about their
							adoption experience
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Testimonial 1 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.1 }}
							viewport={{ once: true }}
							className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
						>
							<div className="flex items-center mb-6">
								{/* Profile Image Placeholder */}
								<div className="w-16 h-16 bg-gradient-to-br from-skyBlue/20 to-aquamarine/20 rounded-full flex items-center justify-center border-2 border-dashed border-skyBlue/30 mr-4">
									<FontAwesomeIcon
										icon={faUsers}
										className="text-2xl text-skyBlue/60"
									/>
								</div>
								<div>
									<h4 className="font-bold text-oxfordBlue font-poppins">
										Sarah Johnson
									</h4>
									<p className="text-oxfordBlue/60 text-sm">
										Adopted Max, 2023
									</p>
								</div>
							</div>
							<div className="flex mb-4">
								{[...Array(5)].map((_, i) => (
									<FontAwesomeIcon
										key={i}
										icon={faStar}
										className="text-yellow-400 text-sm mr-1"
									/>
								))}
							</div>
							<FontAwesomeIcon
								icon={faQuoteLeft}
								className="text-skyBlue/30 text-2xl mb-4"
							/>
							<p className="text-oxfordBlue/80 font-poppins leading-relaxed italic">
								"The process was so smooth and the team was
								incredibly helpful. Max has brought so much joy
								to our family!"
							</p>
						</motion.div>

						{/* Testimonial 2 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
						>
							<div className="flex items-center mb-6">
								{/* Profile Image Placeholder */}
								<div className="w-16 h-16 bg-gradient-to-br from-aquamarine/20 to-turquoise/20 rounded-full flex items-center justify-center border-2 border-dashed border-aquamarine/30 mr-4">
									<FontAwesomeIcon
										icon={faUsers}
										className="text-2xl text-aquamarine/60"
									/>
								</div>
								<div>
									<h4 className="font-bold text-oxfordBlue font-poppins">
										Mike Chen
									</h4>
									<p className="text-oxfordBlue/60 text-sm">
										Adopted Luna, 2023
									</p>
								</div>
							</div>
							<div className="flex mb-4">
								{[...Array(5)].map((_, i) => (
									<FontAwesomeIcon
										key={i}
										icon={faStar}
										className="text-yellow-400 text-sm mr-1"
									/>
								))}
							</div>
							<FontAwesomeIcon
								icon={faQuoteLeft}
								className="text-aquamarine/30 text-2xl mb-4"
							/>
							<p className="text-oxfordBlue/80 font-poppins leading-relaxed italic">
								"Luna is the perfect match for our lifestyle.
								The breed calculator helped us find exactly what
								we were looking for!"
							</p>
						</motion.div>

						{/* Testimonial 3 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
							className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
						>
							<div className="flex items-center mb-6">
								{/* Profile Image Placeholder */}
								<div className="w-16 h-16 bg-gradient-to-br from-turquoise/20 to-skyBlue/20 rounded-full flex items-center justify-center border-2 border-dashed border-turquoise/30 mr-4">
									<FontAwesomeIcon
										icon={faUsers}
										className="text-2xl text-turquoise/60"
									/>
								</div>
								<div>
									<h4 className="font-bold text-oxfordBlue font-poppins">
										Emily Rodriguez
									</h4>
									<p className="text-oxfordBlue/60 text-sm">
										Adopted Buddy, 2024
									</p>
								</div>
							</div>
							<div className="flex mb-4">
								{[...Array(5)].map((_, i) => (
									<FontAwesomeIcon
										key={i}
										icon={faStar}
										className="text-yellow-400 text-sm mr-1"
									/>
								))}
							</div>
							<FontAwesomeIcon
								icon={faQuoteLeft}
								className="text-turquoise/30 text-2xl mb-4"
							/>
							<p className="text-oxfordBlue/80 font-poppins leading-relaxed italic">
								"From browsing to adoption, everything was
								seamless. Buddy has been the best addition to
								our family!"
							</p>
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

			{/* Why Choose Us Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-oxfordBlue mb-6 font-poppins">
							Why Choose The Neo Project?
						</h2>
						<p className="text-xl text-oxfordBlue/70 font-poppins max-w-3xl mx-auto">
							We're committed to making every adoption a success
							story
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Feature 1 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.1 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="w-20 h-20 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-6">
								<FontAwesomeIcon
									icon={faShieldAlt}
									className="text-3xl text-white"
								/>
							</div>
							<h3 className="text-xl font-bold text-oxfordBlue mb-4 font-poppins">
								Verified Kennels
							</h3>
							<p className="text-oxfordBlue/70 font-poppins">
								All our partner kennels are thoroughly vetted
								and verified for quality care.
							</p>
						</motion.div>

						{/* Feature 2 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="w-20 h-20 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center mx-auto mb-6">
								<FontAwesomeIcon
									icon={faClock}
									className="text-3xl text-white"
								/>
							</div>
							<h3 className="text-xl font-bold text-oxfordBlue mb-4 font-poppins">
								24/7 Support
							</h3>
							<p className="text-oxfordBlue/70 font-poppins">
								Our team is always here to help you through
								every step of the adoption process.
							</p>
						</motion.div>

						{/* Feature 3 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="w-20 h-20 bg-gradient-to-br from-turquoise to-skyBlue rounded-full flex items-center justify-center mx-auto mb-6">
								<FontAwesomeIcon
									icon={faAward}
									className="text-3xl text-white"
								/>
							</div>
							<h3 className="text-xl font-bold text-oxfordBlue mb-4 font-poppins">
								Expert Matching
							</h3>
							<p className="text-oxfordBlue/70 font-poppins">
								Our advanced breed calculator ensures the
								perfect match for your lifestyle.
							</p>
						</motion.div>

						{/* Feature 4 */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="w-20 h-20 bg-gradient-to-br from-skyBlue to-turquoise rounded-full flex items-center justify-center mx-auto mb-6">
								<FontAwesomeIcon
									icon={faCheckCircle}
									className="text-3xl text-white"
								/>
							</div>
							<h3 className="text-xl font-bold text-oxfordBlue mb-4 font-poppins">
								Lifetime Support
							</h3>
							<p className="text-oxfordBlue/70 font-poppins">
								We provide ongoing support even after adoption
								to ensure happy families.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

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
						<p className="text-xl text-skyBlue font-poppins mb-8 max-w-2xl mx-auto">
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

			{/* Footer Section */}
			<footer className="bg-oxfordBlue text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Company Info */}
						<div className="lg:col-span-2">
							<div className="flex items-center mb-6">
								<FontAwesomeIcon
									icon={faHeart}
									className="text-3xl text-skyBlue mr-3"
								/>
								<h3 className="text-2xl text-skyBlue font-bold font-poppins">
									The Neo Project
								</h3>
							</div>
							<p className="text-skyBlue font-poppins leading-relaxed mb-6 max-w-md">
								Connecting loving families with amazing dogs.
								Every adoption is a new beginning filled with
								joy, companionship, and unconditional love.
							</p>
							<div className="flex space-x-4">
								<a
									href="#"
									className="w-10 h-10 bg-skyBlue/20 rounded-full flex items-center justify-center hover:bg-skyBlue/30 transition-colors"
								>
									<FontAwesomeIcon
										icon={faFacebook as any}
										className="text-skyBlue"
									/>
								</a>
								<a
									href="#"
									className="w-10 h-10 bg-skyBlue/20 rounded-full flex items-center justify-center hover:bg-skyBlue/30 transition-colors"
								>
									<FontAwesomeIcon
										icon={faTwitter as any}
										className="text-skyBlue"
									/>
								</a>
								<a
									href="#"
									className="w-10 h-10 bg-skyBlue/20 rounded-full flex items-center justify-center hover:bg-skyBlue/30 transition-colors"
								>
									<FontAwesomeIcon
										icon={faInstagram as any}
										className="text-skyBlue"
									/>
								</a>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h4 className="text-lg text-sunset font-bold font-poppins mb-6">
								Quick Links
							</h4>
							<ul className="space-y-3">
								<li>
									<Link
										to="/allDogs"
										className="text-skyBlue hover:text-skyBlue transition-colors font-poppins"
									>
										Browse Dogs
									</Link>
								</li>
								<li>
									<Link
										to="/breedCalculator"
										className="text-skyBlue hover:text-skyBlue transition-colors font-poppins"
									>
										Breed Calculator
									</Link>
								</li>
								<li>
									<Link
										to="/breeds"
										className="text-skyBlue hover:text-skyBlue transition-colors font-poppins"
									>
										Dog Breeds
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="text-skyBlue hover:text-skyBlue transition-colors font-poppins"
									>
										Contact Us
									</Link>
								</li>
							</ul>
						</div>

						{/* Contact Info */}
						<div>
							<h4 className="text-lg text-sunset font-bold font-poppins mb-6">
								Contact Info
							</h4>
							<div className="space-y-3">
								<div className="flex items-center">
									<FontAwesomeIcon
										icon={faPhone}
										className="text-skyBlue mr-3"
									/>
									<span className="text-skyBlue font-poppins">
										07777777777
									</span>
								</div>
								<div className="flex items-center">
									<FontAwesomeIcon
										icon={faEnvelope}
										className="text-skyBlue mr-3"
									/>
									<span className="text-skyBlue font-poppins">
										contact@neoproject.com
									</span>
								</div>
								<div className="flex items-center">
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className="text-skyBlue mr-3"
									/>
									<span className="text-skyBlue font-poppins">
										123 Dog Street, Pet City
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
						<p className="text-sunset font-poppins text-sm">
							© 2024 The Neo Project. All rights reserved.
						</p>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<a
								href="#"
								className="text-sunset hover:text-skyBlue transition-colors font-poppins text-sm"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="text-sunset hover:text-skyBlue transition-colors font-poppins text-sm"
							>
								Terms of Service
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;
