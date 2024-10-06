import React from "react";

const AdoptionCard = ({ dog }) => {
	const getDogName = (string) => {
		if (!string) return "";
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<div className="max-w-md overflow-hidden shadow-lg rounded-xl bg-honeydew m-4 w-full">
			{dog.image && (
				<img
					className="w-full h-48 object-cover"
					src={dog.image}
					alt={dog.name}
				/>
			)}
			<div className="p-6">
				<p className="font-poppins font-bold text-xl mb-2 text-oxfordBlue text-center">
					{getDogName(dog.name)}
				</p>
				{dog.gender && (
					<p className="text-oxfordBlue font-mono">
						Gender:{" "}
						<span className="font-semibold font-poppins">
							{dog.gender}
						</span>
					</p>
				)}
				{dog.age && (
					<p className="text-oxfordBlue font-mono">
						Age:
						<span className="font-semibold font-poppins">
							{dog.age}
						</span>
						years
					</p>
				)}
				{dog.breed && (
					<p className="text-oxfordBlue font-mono">
						Breed:{" "}
						<span className="font-semibold font-poppins">
							{dog.breed}
						</span>
					</p>
				)}
				{dog.size && (
					<p className="text-oxfordBlue font-mono">
						Size:{" "}
						<span className="font-semibold font-poppins">
							{dog.size}
						</span>
					</p>
				)}
				<button className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 font-poppins font-bold">
					Adopt Me
				</button>
			</div>
		</div>
	);
};

export default AdoptionCard;
