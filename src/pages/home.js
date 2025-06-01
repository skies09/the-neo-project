import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdoptionCard from "../components/cards/adoptCard";
// import { motion } from "framer-motion";

const Home = () => {
	const [dogOfTheDay, setDogOfTheDay] = useState({});

	useEffect(() => {
		const fetchGroups = async () => {
			const url =
				process.env.REACT_APP_NEO_PROJECT_BASE_URL +
				"api/adoptionDogs/dod";

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
				console.error("Error fetching dog of the day:", error.message);
			}
		};

		fetchGroups();
	}, []);

	return (
		<div id="home" className="w-screen overflow-hidden h-auto mt-4">
			<div className="flex justify-center items-center flex-col">
				<p className="text-xl font-poppins font-semibold text-oxfordBlue mb-2">
					Find your chosen dog!
				</p>
				<Link
					to="/adopt"
					className="text-skyBlue hover:text-sunset font-poppins font-semibold border-2 border-skyBlue px-10 py-3 rounded-xl bg-oxfordBlue"
				>
					Find now
				</Link>
			</div>
			<div className="flex flex-col-reverse md:flex-row h-full min-h-auto">
				<div className="flex items-stretch justify-center flex-1 bg-gray-100">
					<div className="w-full mx-10 my-4 flex flex-col justify-between items-center">
						<div className="max-w-md bg-honeydew rounded-lg shadow-lg p-4 m-2 text-center w-full h-auto">
							<p className="text-lg font-poppins font-semibold text-oxfordBlue mb-2">
								Check out dogs available for adoption
							</p>
							<div className="my-3">
								<Link
									to="/allDogs"
									className="text-skyBlue hover:text-sunset font-poppins font-semibold border border-skyBlue px-4 py-2 rounded-xl"
								>
									Adopt a dog
								</Link>
							</div>
						</div>

						<div className="max-w-md bg-honeydew rounded-lg shadow-lg p-4 m-2 text-center w-full">
							<p className="text-lg font-poppins font-semibold text-oxfordBlue mb-2">
								Find out what breed are you?
							</p>
							<div className="my-3">
								<Link
									to="/breedCalculator"
									className="text-skyBlue hover:text-sunset font-poppins font-semibold border border-skyBlue px-4 py-2 rounded-xl"
								>
									Breed calculator
								</Link>
							</div>
						</div>

						<div className="max-w-md bg-honeydew rounded-lg shadow-lg p-4 m-2 text-center w-full">
							<p className="text-lg font-poppins font-semibold text-oxfordBlue mb-2">
								Check out dog breeds
							</p>
							<div className="my-3">
								<Link
									to="/breeds"
									className="text-skyBlue hover:text-sunset font-poppins font-semibold border border-skyBlue px-4 py-2 rounded-xl"
								>
									Dog breeds
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Right side (Signup) */}
				{Object.keys(dogOfTheDay).length !== 0 && (
					<div className="flex flex-col items-stretch justify-start flex-1 bg-gray-100 mt-4 lg:mt-0">
						<p className="text-oxfordBlue text-2xl font-bold font-poppins text-center">
							Dog of the day
						</p>
						<div className="flex flex-col justify-center items-center w-full my-24">
							<AdoptionCard dog={dogOfTheDay} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
