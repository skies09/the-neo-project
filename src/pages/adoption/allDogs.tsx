import React, { useEffect, useState } from "react";
import AdoptCard from "../../components/cards/adoptCard.tsx";

export default function AllDogs() {
	const [dogData, setDogData] = useState([]);
	useEffect(() => {
		const fetchDogs = async () => {
			let url = process.env.REACT_APP_NEO_PROJECT_BASE_URL + "api/dogs/";

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

				const data = await response.json();
				setDogData(data.results);
			} catch (error) {
				console.error(
					"Error fetching groups:",
					error instanceof Error ? error.message : String(error)
				);
			}
		};

		fetchDogs();
	}, []);

	return (
		<div id="adopt" className="w-screen overflow-hidden h-full mt-4">
			<div className="flex justify-center items-center font-poppins text-2xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
				Dogs for adoption
			</div>
			<div>
				{" "}
				{dogData && (
					<ul className="flex flex-wrap justify-center mt-2">
						{dogData.map((dog, index) => (
							<li className="m-2" key={index}>
								<AdoptCard dog={dog} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
