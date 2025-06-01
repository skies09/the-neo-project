import React, { useState } from "react";
import axios from "axios";

export default function Adoption() {
	const [gender, setGender] = useState("");
	const [goodWithDogs, setGoodWithDogs] = useState(false);
	const [goodWithCats, setGoodWithCats] = useState(false);
	const [goodWithChildren, setGoodWithChildren] = useState(false);
	const [dog, setDog] = useState(null);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url =
			process.env.REACT_APP_NEO_PROJECT_BASE_URL + `api/dogs/filter/`;
		try {
			const response = await axios.post(url, {
				gender,
				goodWithDogs,
				goodWithCats,
				goodWithChildren,
			});
			setDog(response.data);
			setError("");
		} catch (err) {
			setDog(null);
			setError("No matching dog found.");
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
								value="male"
								checked={gender === "male"}
								onChange={() => setGender("male")}
							/>
							<span className="ml-1">Male</span>
						</label>
						<label>
							<input
								type="radio"
								name="gender"
								value="female"
								checked={gender === "female"}
								onChange={() => setGender("female")}
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
					className="w-full mt-4 bg-oxfordBlue text-mintCream py-2 px-4 rounded-lg hover:bg-blue-900 transition"
				>
					Search
				</button>
			</form>

			<div className="max-w-3xl mx-auto mt-6">
				{dog && (
					<div className="p-4 bg-gray-100 rounded-md shadow">
						<h3 className="text-lg font-semibold">{dog.name}</h3>
						<p>Gender: {dog.gender}</p>
						<p>
							Good with Dogs: {dog.good_with_dogs ? "Yes" : "No"}
						</p>
						<p>
							Good with Cats: {dog.good_with_cats ? "Yes" : "No"}
						</p>
						<p>
							Good with Children:{" "}
							{dog.good_with_children ? "Yes" : "No"}
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
