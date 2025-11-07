import React from "react";
import { motion } from "framer-motion";
import { Breed } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faEye } from "@fortawesome/free-solid-svg-icons";

interface BreedCardProps {
	breed: Breed;
	onClick?: (breed: Breed) => void;
}

const BreedCard = ({ breed, onClick }: BreedCardProps) => {
	const handleClick = () => {
		if (onClick) {
			onClick(breed);
		}
	};

	return (
		<div className="relative group cursor-pointer w-full max-w-xs p-2">
			<motion.div
				className="w-full h-80 bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl flex flex-col"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={handleClick}
			>
				{/* Header with icon */}
				<div className="h-36 relative rounded-t-2xl flex items-center justify-center pt-6">
					<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
						<FontAwesomeIcon
							icon={faDog}
							className="text-2xl text-sunset"
						/>
					</div>
				</div>

				{/* Content */}
				<div className="p-4 sm:p-6 flex flex-col flex-grow">
					<motion.h3
						className="font-delius font-bold text-lg sm:text-xl text-oxfordBlue text-center mb-4 min-h-[5rem] flex items-center justify-center"
						whileHover={{ scale: 1.02 }}
					>
						{breed.breed}
					</motion.h3>

					<div className="space-y-2 sm:space-y-3 flex-grow flex flex-col justify-center">
						<div className="flex items-center justify-between">
							<span className="text-oxfordBlue/70 font-poppins text-xs sm:text-sm font-medium">
								Group:
							</span>
							<span className="font-semibold font-poppins text-oxfordBlue bg-oxfordBlue/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
								{breed.group}
							</span>
						</div>
					</div>

					{/* Action button */}
					<button
						className="w-full mt-4 group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-3 sm:px-4 py-3 rounded-full font-fredoka font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
					>
						<div className="flex items-center justify-center space-x-2 relative z-10">
							<FontAwesomeIcon icon={faEye} className="text-sm" />
							<span>View Details</span>
						</div>
						<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default BreedCard;
