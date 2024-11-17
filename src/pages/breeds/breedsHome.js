import React, { useEffect, useState } from "react";

export default function Breeds() {
	const [groups, setGroups] = useState([]);
	const [breeds, setBreeds] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState(null);

	useEffect(() => {
	const fetchGroups = async () => {
		const url = process.env.REACT_APP_NEO_PROJECT_BASE_URL + 'api/breeds/groups/'

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

			const groupsData = await response.json();
			setGroups(groupsData);
		} catch (error) {
			console.error("Error fetching groups:", error.message);
		}
	};

	fetchGroups();
	}, []);

	const fetchBreedsOfGroup = async (group) => {
		setSelectedGroup(group);
		const url = `${process.env.REACT_APP_NEO_PROJECT_BASE_URL}api/breeds/groups/${group}`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const breedsData = await response.json();
			setBreeds(breedsData);
		} catch (error) {
			console.error("Error fetching breeds:", error.message);
		}
	};

	const fetchAll = async () => {

		const url = process.env.REACT_APP_NEO_PROJECT_BASE_URL + 'api/breeds/list_all'

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

			const breedsData = await response.json();
			setBreeds(breedsData);
		} catch (error) {
			console.error("Error fetching breeds:", error.message);
		}
	};

	return (
		<div id="breeds" className="w-screen overflow-hidden h-[80vh] mt-4 ">
			<div className="flex justify-center items-center font-poppins text-2xl lg:text-3xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
				Breeds
			</div>
			<div className="mt-4">
				{groups && (
					<ul className="flex justify-center items-center">
						{groups.map((group, index) => (
							<li className="m-2" key={index}>
								<button
									className="font-mono text-base text-oxfordBlue p-4 border rounded-lg hover:bg-sunset"
									onClick={() => fetchBreedsOfGroup(group)}
								>
									{group}
								</button>
							</li>
						))}
					</ul>
				)}
				<div className="flex justify-center items-center mt-4">
					<button
						className="font-mono text-base text-oxfordBlue p-4 border rounded-lg hover:bg-sunset"
						onClick={() => fetchAll()}
					>
						All Breeds
					</button>
				</div>
				{breeds.length > 0 && (
					<div className="mt-4">
					{selectedGroup && (
						<h3 className="text-xl font-bold text-center">{`${selectedGroup} Breeds:`}</h3>
					)}
						<ul className="flex flex-wrap justify-center mt-2">
							{breeds.map((breed, index) => (
								<li className="m-2" key={breed.id}>
									<div className="font-mono text-base text-oxfordBlue p-2 border rounded-lg">
										{breed.breed}{" "}
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
