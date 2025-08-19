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
import { getSizeDisplayName } from "../../helpers/sizeUtils.ts";

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
		<div className="flex items-center justify-center p-4">
			<div
				className="relative w-80 lg:w-[22rem] h-48 cursor-pointer perspective-1000"
				onClick={() => setIsFlipped(!isFlipped)}
			>
				{/* Front and Back Container */}
				<motion.div
					className="absolute w-full h-full"
					initial={{ rotateY: 0 }}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
					style={{ transformStyle: "preserve-3d" }}
				>
					{/* Front Side */}
					<div
						className={`absolute w-full h-full text-center flex items-center justify-center backface-hidden ${
							isFlipped ? "rotate-y-180" : ""
						}`}
						style={{ backfaceVisibility: "hidden" }}
					>
						<motion.div
							className="max-w-md overflow-hidden shadow-2xl rounded-2xl bg-gradient-to-br from-honeydew to-mintCream w-full border border-sunset/20"
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
								<p className="font-poppins font-bold text-xl mb-3 text-oxfordBlue text-center bg-gradient-to-r from-oxfordBlue to-skyBlue bg-clip-text text-transparent">
									{getDogName(dog.name)}
								</p>
								<div className="space-y-2 mb-4">
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue font-mono text-sm flex items-center">
											<FontAwesomeIcon
												icon={faVenusMars}
												className="mr-2 text-skyBlue"
											/>
											Gender:
										</span>
										<span className="font-semibold font-poppins text-skyBlue">
											{dog.gender}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue font-mono text-sm flex items-center">
											<FontAwesomeIcon
												icon={faBirthdayCake}
												className="mr-2 text-skyBlue"
											/>
											Age:
										</span>
										<span className="font-semibold font-poppins text-skyBlue">
											{dog.age} years
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue font-mono text-sm flex items-center">
											<FontAwesomeIcon
												icon={faPaw}
												className="mr-2 text-skyBlue"
											/>
											Breed:
										</span>
										<span className="font-semibold font-poppins text-skyBlue">
											{dog.breed}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue font-mono text-sm flex items-center">
											<FontAwesomeIcon
												icon={faRuler}
												className="mr-2 text-skyBlue"
											/>
											Size:
										</span>
										<span className="font-semibold font-poppins text-skyBlue">
											{getSizeDisplayName(dog.size)}
										</span>
									</div>
								</div>
								<motion.button
									className="w-full px-6 py-3 bg-gradient-to-r from-skyBlue to-turquoise text-oxfordBlue rounded-xl hover:from-turquoise hover:to-skyBlue font-poppins font-bold shadow-lg transition-all duration-300 hover:shadow-xl"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<FontAwesomeIcon
										icon={faHeart}
										className="mr-2"
									/>
									Adopt Me
								</motion.button>
							</div>
						</motion.div>
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
						<motion.div
							className="max-w-md overflow-hidden shadow-2xl rounded-2xl bg-gradient-to-br from-sunset to-flax w-full border border-sunset/20"
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
								<p className="font-poppins font-bold text-xl mb-3 text-oxfordBlue text-center bg-gradient-to-r from-oxfordBlue to-sunset bg-clip-text text-transparent">
									{dog.kennel.name}
								</p>
								<div className="space-y-2 mb-4">
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue font-mono text-sm flex items-center">
											<FontAwesomeIcon
												icon={faEnvelope}
												className="mr-2 text-oxfordBlue"
											/>
											Email:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue truncate ml-2">
											{dog.kennel.email}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue font-mono text-sm flex items-center">
											<FontAwesomeIcon
												icon={faPhone}
												className="mr-2 text-oxfordBlue"
											/>
											Phone:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue">
											{dog.kennel.contact_number ||
												"Not provided"}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue font-mono text-sm flex items-center">
											<FontAwesomeIcon
												icon={faMapMarkerAlt}
												className="mr-2 text-oxfordBlue"
											/>
											Address:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue text-xs">
											{dog.kennel.address_line_1 ||
												"Not provided"}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue font-mono text-sm flex items-center">
											<FontAwesomeIcon
												icon={faBuilding}
												className="mr-2 text-oxfordBlue"
											/>
											Location:
										</span>
										<span className="font-semibold font-poppins text-oxfordBlue text-xs">
											{dog.kennel.city ||
												dog.kennel.town ||
												"Not provided"}
										</span>
									</div>
								</div>
								<motion.button
									className="w-full px-6 py-3 bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew rounded-xl hover:from-skyBlue hover:to-oxfordBlue font-poppins font-bold shadow-lg transition-all duration-300 hover:shadow-xl"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<FontAwesomeIcon
										icon={faPhone}
										className="mr-2"
									/>
									Contact Kennel
								</motion.button>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default AdoptionCard;
