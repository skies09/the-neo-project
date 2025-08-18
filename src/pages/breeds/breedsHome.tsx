import React, { useEffect, useState } from "react";
import { breedsAPI } from "../../services/api.ts";

export default function Breeds() {
	const [groups, setGroups] = useState<string[]>([]);
	const [breeds, setBreeds] = useState<Breed[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGroups = async () => {
			setLoading(true);
			setError(null);
			
			try {
				const groupsData = await breedsAPI.getBreedGroups();
				setGroups(groupsData);
			} catch (error) {
				console.error(
					"Error fetching groups:",
					error instanceof Error ? error.message : String(error)
				);
				setError("Error fetching breed groups. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchGroups();
	}, []);

	const fetchBreedsOfGroup = async (group: string) => {
		setSelectedGroup(group);
		setLoading(true);
		setError(null);
		
		try {
			const breedsData = await breedsAPI.getBreedsByGroup(group);
			setBreeds(breedsData);
		} catch (error) {
			console.error(
				"Error fetching breeds:",
				error instanceof Error ? error.message : String(error)
			);
			setError("Error fetching breeds. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const fetchAll = async () => {
		setSelectedGroup(null);
		setLoading(true);
		setError(null);
		
		try {
			const breedsData = await breedsAPI.getAllBreeds();
			setBreeds(breedsData);
		} catch (error) {
			console.error(
				"Error fetching breeds:",
				error instanceof Error ? error.message : String(error)
			);
			setError("Error fetching breeds. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (loading && groups.length === 0) {
		return (
			<div className="w-screen overflow-hidden h-[80vh] mt-4">
				<div className="flex justify-center items-center font-poppins text-2xl lg:text-3xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
					Loading breeds...
				</div>
			</div>
		);
	}

	return (
		<div id="breeds" className="w-screen overflow-hidden h-[80vh] mt-4 ">
			<div className="flex justify-center items-center font-poppins text-2xl lg:text-3xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
				Breeds
			</div>
			
			{error && (
				<div className="flex justify-center items-center mt-4">
					<p className="text-red-600 font-semibold">{error}</p>
				</div>
			)}
			
			<div className="mt-4">
				{groups && groups.length > 0 && (
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
				{loading && breeds.length === 0 ? (
					<div className="flex justify-center items-center mt-8">
						<p className="text-lg text-oxfordBlue">Loading breeds...</p>
					</div>
				) : breeds.length > 0 ? (
					<div className="mt-4">
						{selectedGroup && (
							<h3 className="text-xl font-bold text-center">{`${selectedGroup} Breeds:`}</h3>
						)}
						<ul className="flex flex-wrap justify-center mt-2">
							{breeds.map((breed) => (
								<li className="m-2" key={breed.id}>
									<div className="font-mono text-base text-oxfordBlue p-2 border rounded-lg">
										{breed.breed}
									</div>
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className="flex justify-center items-center mt-8">
						<p className="text-lg text-oxfordBlue">No breeds found.</p>
					</div>
				)}
			</div>
		</div>
	);
}
