import React, { useState, useRef, useEffect } from "react";
import { dogAPI, Dog } from "../../services/api.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
	faSearch,
	faVenusMars,
	faHeart,
	faCat,
	faBaby,
	faDog,
	faSpinner,
	faPaw,
	faBirthdayCake,
	faRuler,
	faBuilding,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getSizeDisplayName } from "../../helpers/sizeUtils.ts";

export default function Adoption() {
	const [gender, setGender] = useState("");
	const [goodWithDogs, setGoodWithDogs] = useState(false);
	const [goodWithCats, setGoodWithCats] = useState(false);
	const [goodWithChildren, setGoodWithChildren] = useState(false);
	const [dog, setDog] = useState<Dog | null>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const resultsRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to results when dog is found
	useEffect(() => {
		if (dog && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [dog]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const filters = {
				gender: gender || undefined,
				goodWithDogs: goodWithDogs || undefined,
				goodWithCats: goodWithCats || undefined,
				goodWithChildren: goodWithChildren || undefined,
			};
			const matchedDog = await dogAPI.filterDogs(filters);

			if (!matchedDog) {
				throw new Error("No dog returned from API");
			}

			setDog(matchedDog);
		} catch (err) {
			console.error("Search error:", err);
			setDog(null);
			setError(
				"No matching dog found. Try adjusting your search criteria."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			id="adopt"
			className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-20 pb-8 px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<motion.div 
					className="text-center mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<FontAwesomeIcon
							icon={faSearch}
							className="text-4xl text-skyBlue mr-4"
						/>
						<h1 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Find Your Perfect Dog
						</h1>
						<FontAwesomeIcon
							icon={faSearch}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins">
						Tell us what you're looking for and we'll find your
						ideal companion
					</p>
				</motion.div>

				{/* Search Form */}
				<motion.div 
					className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-3">
							<FontAwesomeIcon
								icon={faDog}
								className="text-2xl text-honeydew"
							/>
						</div>
						<h2 className="text-2xl font-bold text-oxfordBlue mb-2">
							Search Criteria
						</h2>
						<p className="text-oxfordBlue/70">
							Select your preferences to find the perfect match
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Gender Selection */}
						<div className="bg-white/80 rounded-2xl p-6">
							<label className="block text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faVenusMars}
									className="mr-3 text-oxfordBlue"
								/>
								Gender Preference
							</label>
							<div className="flex gap-6">
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="gender"
										value="Male"
										checked={gender === "Male"}
										onChange={() => setGender("Male")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Male
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="gender"
										value="Female"
										checked={gender === "Female"}
										onChange={() => setGender("Female")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Female
									</span>
								</label>
							</div>
						</div>

						{/* Compatibility Preferences */}
						<div className="bg-white/80 rounded-2xl p-6">
							<h3 className="text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faHeart}
									className="mr-3 text-oxfordBlue"
								/>
								Compatibility Requirements
							</h3>
							<div className="space-y-4">
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="checkbox"
										checked={goodWithDogs}
										onChange={() =>
											setGoodWithDogs(!goodWithDogs)
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 rounded focus:ring-oxfordBlue"
									/>
									<FontAwesomeIcon
										icon={faDog}
										className="text-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Good with other dogs
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="checkbox"
										checked={goodWithCats}
										onChange={() =>
											setGoodWithCats(!goodWithCats)
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 rounded focus:ring-oxfordBlue"
									/>
									<FontAwesomeIcon
										icon={faCat}
										className="text-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Good with cats
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="checkbox"
										checked={goodWithChildren}
										onChange={() =>
											setGoodWithChildren(
												!goodWithChildren
											)
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 rounded focus:ring-oxfordBlue"
									/>
									<FontAwesomeIcon
										icon={faBaby}
										className="text-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Good with children
									</span>
								</label>
							</div>
						</div>

						{/* Search Button */}
						<div className="text-center">
							<button
								type="submit"
								disabled={loading}
								className="bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew py-4 px-8 rounded-2xl font-poppins font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
							>
								{loading ? (
									<div className="flex items-center justify-center">
										<FontAwesomeIcon
											icon={faSpinner}
											className="animate-spin mr-3"
										/>
										Searching...
									</div>
								) : (
									<div className="flex items-center justify-center">
										<FontAwesomeIcon
											icon={faSearch}
											className="mr-3"
										/>
										Find My Perfect Dog
									</div>
								)}
							</button>
						</div>
					</form>
				</motion.div>

				{/* Results Section */}
				<motion.div 
					ref={resultsRef} 
					className="max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
				>
					{dog && (
						<motion.div 
							className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-skyBlue/20 p-8"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
						>
							<div className="text-center mb-6">
								<div className="w-20 h-20 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-4">
									<FontAwesomeIcon
										icon={faDog}
										className="text-3xl text-white"
									/>
								</div>
								<h3 className="text-3xl font-bold text-oxfordBlue mb-2">
									{dog.name}
								</h3>
								<p className="text-oxfordBlue/70 font-poppins">
									Your perfect match!
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Basic Information */}
								<div className="space-y-4">
									<h4 className="text-xl font-semibold text-oxfordBlue mb-4 flex items-center">
										<FontAwesomeIcon
											icon={faInfoCircle}
											className="mr-2 text-oxfordBlue"
										/>
										Basic Information
									</h4>

									<div className="flex items-center space-x-3">
										<FontAwesomeIcon
											icon={faVenusMars}
											className="text-oxfordBlue w-5"
										/>
										<span className="text-oxfordBlue font-medium">
											Gender:
										</span>
										<span className="text-oxfordBlue">
											{dog.gender || "Unknown"}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<FontAwesomeIcon
											icon={faPaw}
											className="text-oxfordBlue w-5"
										/>
										<span className="text-oxfordBlue font-medium">
											Breed:
										</span>
										<span className="text-oxfordBlue">
											{dog.breed || "Unknown"}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<FontAwesomeIcon
											icon={faBirthdayCake}
											className="text-oxfordBlue w-5"
										/>
										<span className="text-oxfordBlue font-medium">
											Age:
										</span>
										<span className="text-oxfordBlue">
											{dog.age
												? `${dog.age} years`
												: "Unknown"}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<FontAwesomeIcon
											icon={faRuler}
											className="text-oxfordBlue w-5"
										/>
										<span className="text-oxfordBlue font-medium">
											Size:
										</span>
										<span className="text-oxfordBlue">
											{getSizeDisplayName(dog.size)}
										</span>
									</div>
								</div>

								{/* Compatibility Information */}
								<div className="space-y-4">
									<h4 className="text-xl font-semibold text-oxfordBlue mb-4 flex items-center">
										<FontAwesomeIcon
											icon={faHeart}
											className="mr-2 text-oxfordBlue"
										/>
										Compatibility
									</h4>

									<div className="flex items-center space-x-3">
										<FontAwesomeIcon
											icon={faDog}
											className="text-oxfordBlue w-5"
										/>
										<span className="text-oxfordBlue font-medium">
											Good with dogs:
										</span>
										<span
											className={`font-medium ${
												dog.good_with_dogs
													? "text-green-600"
													: dog.good_with_dogs ===
													  null
													? "text-gray-500"
													: "text-red-600"
											}`}
										>
											{dog.good_with_dogs
												? "Yes"
												: dog.good_with_dogs === null
												? "Unknown"
												: "No"}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<FontAwesomeIcon
											icon={faCat}
											className="text-oxfordBlue w-5"
										/>
										<span className="text-oxfordBlue font-medium">
											Good with cats:
										</span>
										<span
											className={`font-medium ${
												dog.good_with_cats
													? "text-green-600"
													: dog.good_with_cats ===
													  null
													? "text-gray-500"
													: "text-red-600"
											}`}
										>
											{dog.good_with_cats
												? "Yes"
												: dog.good_with_cats === null
												? "Unknown"
												: "No"}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<FontAwesomeIcon
											icon={faBaby}
											className="text-oxfordBlue w-5"
										/>
										<span className="text-oxfordBlue font-medium">
											Good with children:
										</span>
										<span
											className={`font-medium ${
												dog.good_with_children
													? "text-green-600"
													: dog.good_with_children ===
													  null
													? "text-gray-500"
													: "text-red-600"
											}`}
										>
											{dog.good_with_children
												? "Yes"
												: dog.good_with_children ===
												  null
												? "Unknown"
												: "No"}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<FontAwesomeIcon
											icon={faBuilding}
											className="text-oxfordBlue w-5"
										/>
										<span className="text-oxfordBlue font-medium">
											Kennel:
										</span>
										<span className="text-oxfordBlue">
											{dog.kennel?.name || "Unknown"}
										</span>
									</div>
								</div>
							</div>

							{dog.extra_information && (
								<div className="mt-6 p-4 bg-skyBlue/10 rounded-2xl border border-skyBlue/20">
									<h4 className="text-lg font-semibold text-oxfordBlue mb-2 flex items-center">
										<FontAwesomeIcon
											icon={faInfoCircle}
											className="mr-2 text-oxfordBlue"
										/>
										Additional Information
									</h4>
									<p className="text-oxfordBlue/80 leading-relaxed">
										{dog.extra_information}
									</p>
								</div>
							)}
						</motion.div>
					)}

					{error && (
						<motion.div 
							className="text-center p-6 bg-red-50 border border-red-200 rounded-2xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
						>
							<FontAwesomeIcon
								icon={faSearch}
								className="text-3xl text-red-500 mb-3"
							/>
							<p className="text-red-600 font-medium text-lg">
								{error}
							</p>
							<p className="text-red-500 mt-2">
								Try adjusting your search criteria
							</p>
						</motion.div>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}
