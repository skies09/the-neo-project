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
				className="w-full h-80 bg-gradient-to-br from-aquamarine to-turquoise rounded-2xl shadow-xl border border-skyBlue/30 transition-all duration-300 hover:shadow-2xl hover:border-skyBlue/50 flex flex-col"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={handleClick}
			>
				{/* Header with gradient overlay */}
				<div className="h-36 bg-gradient-to-r from-skyBlue to-turquoise relative rounded-t-2xl">
					<div className="absolute inset-0 bg-gradient-to-br from-oxfordBlue/20 to-transparent rounded-t-2xl"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<motion.div
							className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
							whileHover={{ rotate: 360 }}
							transition={{ duration: 0.6 }}
						>
							<FontAwesomeIcon
								icon={faDog}
								className="text-2xl text-white"
							/>
						</motion.div>
					</div>
				</div>

				{/* Content */}
				<div className="p-4 sm:p-6 flex flex-col flex-grow">
					<motion.h3
						className="font-poppins font-bold text-lg sm:text-xl text-oxfordBlue text-center mb-4 bg-gradient-to-r from-oxfordBlue to-skyBlue bg-clip-text text-transparent min-h-[5rem] flex items-center justify-center"
						whileHover={{ scale: 1.02 }}
					>
						{breed.breed}
					</motion.h3>

					<div className="space-y-2 sm:space-y-3 flex-grow flex flex-col justify-center">
						<div className="flex items-center justify-between">
							<span className="text-oxfordBlue font-mono text-xs sm:text-sm font-medium">
								Group:
							</span>
							<span className="font-semibold font-poppins text-oxfordBlue bg-oxfordBlue/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
								{breed.group}
							</span>
						</div>
					</div>

					{/* Action button */}
					<motion.button
						className="w-full mt-4 px-3 sm:px-4 py-3 bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew rounded-xl font-poppins font-semibold text-xs sm:text-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:from-skyBlue hover:to-oxfordBlue"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<FontAwesomeIcon icon={faEye} className="mr-2" />
						View Details
					</motion.button>
				</div>
			</motion.div>

			<div className="absolute inset-0 bg-gradient-to-br from-skyBlue/10 to-turquoise/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
		</div>
	);
};

export default BreedCard;
