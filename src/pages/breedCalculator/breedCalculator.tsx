import React, { useState, useRef, useEffect } from "react";
import { breedsAPI, Breed } from "../../services/api.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faHome,
	faRuler,
	faRunning,
	faUsers,
	faDog,
	faSpinner,
	faInfoCircle,
	faHeart,
	faBaby,
	faCat,
	faClock,
	faLeaf,
	faCity,
	faTree,
} from "@fortawesome/free-solid-svg-icons";

interface BreedFilter {
	size?: string;
	livingSpace?: string;
	activityLevel?: string;
	experienceLevel?: string;
	goodWithDogs?: boolean;
	goodWithCats?: boolean;
	goodWithChildren?: boolean;
	groomingNeeds?: string;
	timeAvailable?: string;
}

export default function BreedCalculator() {
	const [size, setSize] = useState("");
	const [livingSpace, setLivingSpace] = useState("");
	const [activityLevel, setActivityLevel] = useState("");
	const [experienceLevel, setExperienceLevel] = useState("");
	const [goodWithDogs, setGoodWithDogs] = useState(false);
	const [goodWithCats, setGoodWithCats] = useState(false);
	const [goodWithChildren, setGoodWithChildren] = useState(false);
	const [groomingNeeds, setGroomingNeeds] = useState("");
	const [timeAvailable, setTimeAvailable] = useState("");

	const [breeds, setBreeds] = useState<Breed[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to results when breeds are found
	useEffect(() => {
		if (breeds.length > 0 && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [breeds]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			//TODO: Move this to back end
			const allBreeds = await breedsAPI.getAllBreeds();
			console.log("All breeds:", allBreeds);
			const filteredBreeds = allBreeds.slice(0, 5);
			setBreeds(filteredBreeds);
		} catch (err) {
			console.error("Search error:", err);
			setBreeds([]);
			setError("No matching breeds found. Try adjusting your criteria.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			id="breedCalculator"
			className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-20 pb-8 px-4"
		>
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex justify-center items-center mb-4">
						<FontAwesomeIcon
							icon={faSearch}
							className="text-4xl text-skyBlue mr-4"
						/>
						<h1 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Find Your Perfect Breed
						</h1>
						<FontAwesomeIcon
							icon={faSearch}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins">
						Tell us about your lifestyle and we'll recommend the
						perfect breeds for you
					</p>
				</div>

				{/* Search Form */}
				<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-3">
							<FontAwesomeIcon
								icon={faDog}
								className="text-2xl text-honeydew"
							/>
						</div>
						<h2 className="text-2xl font-bold text-oxfordBlue mb-2">
							Lifestyle Assessment
						</h2>
						<p className="text-oxfordBlue/70">
							Answer these questions to find breeds that match
							your lifestyle
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Living Situation */}
						<div className="bg-white/80 rounded-2xl p-6">
							<label className="block text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faHome}
									className="mr-3 text-oxfordBlue"
								/>
								Living Situation
							</label>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="livingSpace"
										value="apartment"
										checked={livingSpace === "apartment"}
										onChange={() =>
											setLivingSpace("apartment")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<FontAwesomeIcon
										icon={faCity}
										className="text-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Apartment
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="livingSpace"
										value="house"
										checked={livingSpace === "house"}
										onChange={() => setLivingSpace("house")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<FontAwesomeIcon
										icon={faHome}
										className="text-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										House
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="livingSpace"
										value="farm"
										checked={livingSpace === "farm"}
										onChange={() => setLivingSpace("farm")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<FontAwesomeIcon
										icon={faTree}
										className="text-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Farm/Rural
									</span>
								</label>
							</div>
						</div>

						{/* Preferred Size */}
						<div className="bg-white/80 rounded-2xl p-6">
							<label className="block text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faRuler}
									className="mr-3 text-oxfordBlue"
								/>
								Preferred Size
							</label>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="size"
										value="small"
										checked={size === "small"}
										onChange={() => setSize("small")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Small (under 20 lbs)
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="size"
										value="medium"
										checked={size === "medium"}
										onChange={() => setSize("medium")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Medium (20-50 lbs)
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="size"
										value="large"
										checked={size === "large"}
										onChange={() => setSize("large")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Large (over 50 lbs)
									</span>
								</label>
							</div>
						</div>

						{/* Activity Level */}
						<div className="bg-white/80 rounded-2xl p-6">
							<label className="block text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faRunning}
									className="mr-3 text-oxfordBlue"
								/>
								Your Activity Level
							</label>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="activityLevel"
										value="low"
										checked={activityLevel === "low"}
										onChange={() => setActivityLevel("low")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Low (couch potato)
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="activityLevel"
										value="moderate"
										checked={activityLevel === "moderate"}
										onChange={() =>
											setActivityLevel("moderate")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Moderate (daily walks)
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="activityLevel"
										value="high"
										checked={activityLevel === "high"}
										onChange={() =>
											setActivityLevel("high")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										High (athletic/outdoor)
									</span>
								</label>
							</div>
						</div>

						{/* Experience Level */}
						<div className="bg-white/80 rounded-2xl p-6">
							<label className="block text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faUsers}
									className="mr-3 text-oxfordBlue"
								/>
								Dog Experience
							</label>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="experienceLevel"
										value="first"
										checked={experienceLevel === "first"}
										onChange={() =>
											setExperienceLevel("first")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										First-time owner
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="experienceLevel"
										value="some"
										checked={experienceLevel === "some"}
										onChange={() =>
											setExperienceLevel("some")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Some experience
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="experienceLevel"
										value="experienced"
										checked={
											experienceLevel === "experienced"
										}
										onChange={() =>
											setExperienceLevel("experienced")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Experienced owner
									</span>
								</label>
							</div>
						</div>

						{/* Compatibility Requirements */}
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

						{/* Grooming Preferences */}
						<div className="bg-white/80 rounded-2xl p-6">
							<label className="block text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faLeaf}
									className="mr-3 text-oxfordBlue"
								/>
								Grooming Preferences
							</label>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="groomingNeeds"
										value="low"
										checked={groomingNeeds === "low"}
										onChange={() => setGroomingNeeds("low")}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Low maintenance
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="groomingNeeds"
										value="moderate"
										checked={groomingNeeds === "moderate"}
										onChange={() =>
											setGroomingNeeds("moderate")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Moderate grooming
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="groomingNeeds"
										value="high"
										checked={groomingNeeds === "high"}
										onChange={() =>
											setGroomingNeeds("high")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										High maintenance
									</span>
								</label>
							</div>
						</div>

						{/* Time Available */}
						<div className="bg-white/80 rounded-2xl p-6">
							<label className="block text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faClock}
									className="mr-3 text-oxfordBlue"
								/>
								Time Available for Dog
							</label>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="timeAvailable"
										value="limited"
										checked={timeAvailable === "limited"}
										onChange={() =>
											setTimeAvailable("limited")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Limited time
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="timeAvailable"
										value="moderate"
										checked={timeAvailable === "moderate"}
										onChange={() =>
											setTimeAvailable("moderate")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Moderate time
									</span>
								</label>
								<label className="flex items-center space-x-3 cursor-pointer group">
									<input
										type="radio"
										name="timeAvailable"
										value="plenty"
										checked={timeAvailable === "plenty"}
										onChange={() =>
											setTimeAvailable("plenty")
										}
										className="w-5 h-5 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
									/>
									<span className="text-oxfordBlue font-medium group-hover:text-oxfordBlue/80 transition-colors">
										Plenty of time
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
										Finding Perfect Breeds...
									</div>
								) : (
									<div className="flex items-center justify-center">
										<FontAwesomeIcon
											icon={faSearch}
											className="mr-3"
										/>
										Find My Perfect Breeds
									</div>
								)}
							</button>
						</div>
					</form>
				</div>

				{/* Results Section */}
				<div ref={resultsRef} className="max-w-4xl mx-auto">
					{breeds.length > 0 && (
						<div className="text-center mb-8">
							<div className="flex justify-center items-center mb-4">
								<FontAwesomeIcon
									icon={faDog}
									className="text-4xl text-skyBlue mr-4"
								/>
								<h2 className="font-poppins text-3xl lg:text-4xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
									Perfect Breeds for You
								</h2>
								<FontAwesomeIcon
									icon={faDog}
									className="text-4xl text-skyBlue ml-4"
								/>
							</div>
							<p className="text-lg text-oxfordBlue/70 font-poppins">
								Based on your lifestyle, here are the breeds
								that would be perfect for you
							</p>
						</div>
					)}

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{breeds.map((breed, index) => (
							<div
								key={breed.id}
								className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-skyBlue/20 p-6 hover:shadow-2xl transition-all duration-300"
							>
								<div className="text-center mb-4">
									<div className="w-16 h-16 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-3">
										<FontAwesomeIcon
											icon={faDog}
											className="text-2xl text-white"
										/>
									</div>
									<h3 className="text-xl font-bold text-oxfordBlue mb-1">
										{breed.breed}
									</h3>
									<p className="text-sm text-oxfordBlue/70">
										{breed.group}
									</p>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-oxfordBlue">
											Group:
										</span>
										<span className="text-sm text-oxfordBlue/80">
											{breed.group}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-oxfordBlue">
											Match Score:
										</span>
										<span className="text-sm font-bold text-green-600">
											{95 - index * 5}%
										</span>
									</div>
								</div>

								<div className="mt-4 pt-4 border-t border-skyBlue/20">
									<button className="w-full bg-gradient-to-r from-skyBlue to-aquamarine text-oxfordBlue py-2 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
										<FontAwesomeIcon
											icon={faInfoCircle}
											className="mr-2"
										/>
										Learn More
									</button>
								</div>
							</div>
						))}
					</div>

					{error && (
						<div className="text-center p-6 bg-red-50 border border-red-200 rounded-2xl">
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
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
