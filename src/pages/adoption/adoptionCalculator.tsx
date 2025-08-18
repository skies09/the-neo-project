import React, { useState } from "react";
import { dogAPI, Dog } from "../../services/api.ts";

export default function Adoption() {
	const [gender, setGender] = useState("");
	const [goodWithDogs, setGoodWithDogs] = useState(false);
	const [goodWithCats, setGoodWithCats] = useState(false);
	const [goodWithChildren, setGoodWithChildren] = useState(false);
	const [dog, setDog] = useState<Dog | null>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

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
			setDog(matchedDog);
		} catch (err) {
			setDog(null);
			setError("No matching dog found.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div id="adopt" className="w-screen overflow-y-auto mt-4 px-4 py-6">
			<h2 className="text-center font-poppins text-2xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
				Find your dog
			</h2>

			<form
				onSubmit={handleSubmit}
				className="max-w-md mx-auto my-6 space-y-4 bg-white p-4 rounded-xl shadow-md"
			>
				<div>
					<label className="block font-semibold mb-1">Gender</label>
					<div className="flex gap-4">
						<label>
							<input
								type="radio"
								name="gender"
								value="Male"
								checked={gender === "Male"}
								onChange={() => setGender("Male")}
							/>
							<span className="ml-1">Male</span>
						</label>
						<label>
							<input
								type="radio"
								name="gender"
								value="Female"
								checked={gender === "Female"}
								onChange={() => setGender("Female")}
							/>
							<span className="ml-1">Female</span>
						</label>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<label>
						<input
							type="checkbox"
							checked={goodWithDogs}
							onChange={() => setGoodWithDogs(!goodWithDogs)}
						/>
						<span className="ml-2">Good with other dogs</span>
					</label>
					<label>
						<input
							type="checkbox"
							checked={goodWithCats}
							onChange={() => setGoodWithCats(!goodWithCats)}
						/>
						<span className="ml-2">Good with cats</span>
					</label>
					<label>
						<input
							type="checkbox"
							checked={goodWithChildren}
							onChange={() =>
								setGoodWithChildren(!goodWithChildren)
							}
						/>
						<span className="ml-2">Good with children</span>
					</label>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full mt-4 bg-oxfordBlue text-mintCream py-2 px-4 rounded-lg hover:bg-blue-900 transition disabled:opacity-50"
				>
					{loading ? "Searching..." : "Search"}
				</button>
			</form>

			<div className="max-w-3xl mx-auto mt-6">
				{dog && (
					<div className="p-4 bg-gray-100 rounded-md shadow">
						<h3 className="text-lg font-semibold">{dog.name}</h3>
						<p>Gender: {dog.gender}</p>
						<p>Breed: {dog.breed}</p>
						<p>Age: {dog.age} years</p>
						<p>Size: {dog.size}</p>
						<p>
							Good with Dogs: {dog.good_with_dogs ? "Yes" : dog.good_with_dogs === null ? "Unknown" : "No"}
						</p>
						<p>
							Good with Cats: {dog.good_with_cats ? "Yes" : dog.good_with_cats === null ? "Unknown" : "No"}
						</p>
						<p>
							Good with Children:{" "}
							{dog.good_with_children ? "Yes" : dog.good_with_children === null ? "Unknown" : "No"}
						</p>
						{dog.extra_information && (
							<p className="mt-2 text-sm text-gray-600">
								<strong>Additional Info:</strong> {dog.extra_information}
							</p>
						)}
						<p className="mt-2 text-sm text-gray-500">
							<strong>Kennel:</strong> {dog.kennel.name}
						</p>
					</div>
				)}
				{error && (
					<p className="text-center text-red-600 font-medium mt-4">
						{error}
					</p>
				)}
			</div>
		</div>
	);
}
