import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dog } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faVenusMars,
	faBirthdayCake,
	faPaw,
	faRuler,
	faHeart,
	faEnvelope,
	faPhone,
	faMapMarkerAlt,
	faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { getSizeDisplayName } from "../../helpers/sizeUtils";

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
		<div className="flex items-center justify-center p-2 w-full">
			<div
				className="relative w-full max-w-xs cursor-pointer perspective-1000"
				onClick={() => setIsFlipped(!isFlipped)}
			>
				{/* Front and Back Container */}
				<motion.div
					className="relative w-full"
					initial={{ rotateY: 0 }}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
					style={{ transformStyle: "preserve-3d" }}
				>
					{/* Front Side */}
					<div
						className="w-full text-center backface-hidden"
						style={{ 
							backfaceVisibility: "hidden"
						}}
					>
						<motion.div
							className="max-w-md overflow-hidden shadow-lg rounded-2xl bg-gradient-to-br from-tara to-mintCream w-full hover:shadow-xl transition-all duration-200"
							whileHover={{ scale: 1.01 }}
							transition={{ duration: 0.2 }}
						>
							{dog.image && (
								<div className="relative overflow-hidden">
									<img
										className="w-full h-36 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
										src={
											process.env.REACT_APP_LOCAL +
											dog.image
										}
										alt={dog.name}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-2xl"></div>
								</div>
							)}
							<div className="p-6">
								<p className="font-delius font-bold text-xl mb-3 text-oxfordBlue text-center">
									{getDogName(dog.name)}
								</p>
								<div className="space-y-2 mb-4">
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins text-sm flex items-center">
											<FontAwesomeIcon
												icon={faVenusMars}
												className="mr-2 text-tara"
											/>
											Gender:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue">
											{dog.gender}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins text-sm flex items-center">
											<FontAwesomeIcon
												icon={faBirthdayCake}
												className="mr-2 text-tara"
											/>
											Age:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue">
											{dog.age} years
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins text-sm flex items-center">
											<FontAwesomeIcon
												icon={faPaw}
												className="mr-2 text-tara"
											/>
											Breed:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue">
											{dog.breed}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins text-sm flex items-center">
											<FontAwesomeIcon
												icon={faRuler}
												className="mr-2 text-tara"
											/>
											Size:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue">
											{getSizeDisplayName(dog.size)}
										</span>
									</div>
								</div>
								<button
									className="w-full group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset text-xl"
								>
									<div className="flex items-center justify-center space-x-3 relative z-10">
										<FontAwesomeIcon
											icon={faHeart}
											className="text-lg"
										/>
										<span>Adopt Me</span>
									</div>
								</button>
							</div>
						</motion.div>
					</div>

					{/* Back Side */}
					<div
						className="absolute top-0 left-0 w-full text-center backface-hidden"
						style={{
							backfaceVisibility: "hidden",
							transform: "rotateY(180deg)",
						}}
					>
						<motion.div
							className="max-w-md overflow-hidden shadow-lg rounded-2xl bg-gradient-to-br from-tara to-mintCream w-full hover:shadow-xl transition-all duration-200"
							whileHover={{ scale: 1.01 }}
							transition={{ duration: 0.2 }}
						>
							{dog.image && (
								<div className="relative overflow-hidden">
									<img
										className="w-full h-36 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
										src={
											process.env.REACT_APP_LOCAL +
											dog.image
										}
										alt={dog.name}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-2xl"></div>
								</div>
							)}
							<div className="p-6">
								<p className="font-delius font-bold text-xl mb-3 text-oxfordBlue text-center">
									{dog.kennel.name}
								</p>
								<div className="space-y-2 mb-4">
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins text-sm flex items-center">
											<FontAwesomeIcon
												icon={faEnvelope}
												className="mr-2 text-tara"
											/>
											Email:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue truncate ml-2">
											{dog.kennel.email}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins text-sm flex items-center">
											<FontAwesomeIcon
												icon={faPhone}
												className="mr-2 text-tara"
											/>
											Phone:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue">
											{(dog.kennel as any).contact_number ||
												"Not provided"}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins text-sm flex items-center">
											<FontAwesomeIcon
												icon={faMapMarkerAlt}
												className="mr-2 text-tara"
											/>
											Address:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue text-xs">
											{(dog.kennel as any).address_line_1 ||
												"Not provided"}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins text-sm flex items-center">
											<FontAwesomeIcon
												icon={faBuilding}
												className="mr-2 text-tara"
											/>
											Location:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue text-xs">
											{(dog.kennel as any).city ||
												(dog.kennel as any).town ||
												"Not provided"}
										</span>
									</div>
								</div>
								<button
									className="w-full group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-6 py-3 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
								>
									<div className="flex items-center justify-center space-x-2 relative z-10">
										<FontAwesomeIcon
											icon={faPhone}
											className="text-sm"
										/>
										<span>Contact Kennel</span>
									</div>
									<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</button>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default AdoptionCard;
