import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dog } from "../../services/api";

interface AdoptionCardProps {
  dog: Dog;
}

const AdoptionCard = ({ dog }: AdoptionCardProps) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const getDogName = (string: string) => {
		if (!string) return "";
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<div className="flex items-center justify-center m-4">
			<div
				className="relative w-80 h-48 cursor-pointer perspective-1000"
				onClick={() => setIsFlipped(!isFlipped)}
			>
				{/* Front and Back Container */}
				<motion.div
					className="absolute w-full h-full"
					initial={{ rotateY: 0 }}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					transition={{ duration: 0.8 }}
					style={{ transformStyle: "preserve-3d" }}
				>
					{/* Front Side */}
					<div
						className={`absolute w-full h-full text-center flex items-center justify-center backface-hidden ${
							isFlipped ? "rotate-y-180" : ""
						}`}
						style={{ backfaceVisibility: "hidden" }}
					>
						<div className="max-w-md overflow-hidden shadow-lg rounded-xl bg-honeydew m-4 w-full">
							{dog.image && (
								<img
									className="w-full h-36 object-cover rounded-t-xl"
									src={
										process.env.REACT_APP_LOCAL + dog.image
									}
									alt={dog.name}
								/>
							)}
							<div className="p-6">
								<p className="font-poppins font-bold text-xl mb-2 text-oxfordBlue text-center">
									{getDogName(dog.name)}
								</p>
								<p className="text-oxfordBlue font-mono">
									Gender:{" "}
									<span className="font-semibold font-poppins">
										{dog.gender}
									</span>
								</p>
								<p className="text-oxfordBlue font-mono">
									Age:{" "}
									<span className="font-semibold font-poppins">
										{dog.age}{" "}
									</span>
									years
								</p>
								<p className="text-oxfordBlue font-mono">
									Breed:{" "}
									<span className="font-semibold font-poppins">
										{dog.breed}
									</span>
								</p>
								<p className="text-oxfordBlue font-mono">
									Size:{" "}
									<span className="font-semibold font-poppins">
										{dog.size}
									</span>
								</p>
								<button className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 font-poppins font-bold">
									Adopt Me
								</button>
							</div>
						</div>
					</div>

					{/* Back Side */}
					<div
						className={`absolute w-full h-full text-center flex items-center justify-center backface-hidden ${
							isFlipped ? "" : "hidden"
						}`}
						style={{
							backfaceVisibility: "hidden",
							transform: "rotateY(180deg)",
						}}
					>
						<div className="max-w-md overflow-hidden shadow-lg rounded-xl bg-honeydew m-4 w-full">
							{dog.image && (
								<img
									className="w-full h-36 object-cover rounded-t-xl"
									src={
										process.env.REACT_APP_LOCAL + dog.image
									}
									alt={dog.name}
								/>
							)}
							<div className="p-6">
								<p className="font-poppins font-bold text-xl mb-2 text-oxfordBlue text-center">
									{dog.kennel.name}
								</p>
								<p className="text-oxfordBlue font-mono">
									Email:{" "}
									<span className="font-semibold font-poppins">
										{dog.kennel.email}
									</span>
								</p>
								<p className="text-oxfordBlue font-mono">
									Username:{" "}
									<span className="font-semibold font-poppins">
										{dog.kennel.username}
									</span>
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default AdoptionCard;
