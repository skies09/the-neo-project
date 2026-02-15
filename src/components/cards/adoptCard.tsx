import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
	faImage,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getSizeDisplayName } from "../../helpers/sizeUtils";

interface AdoptionCardProps {
	dog: Dog;
}

const AdoptionCard = ({ dog }: AdoptionCardProps) => {
	const [showContactModal, setShowContactModal] = useState(false);

	const getDogName = (string: string) => {
		if (!string) return "";
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const kennel = dog.kennel as {
		contact_number?: string;
		address_line_1?: string;
		city?: string;
		town?: string;
	} & typeof dog.kennel;

	return (
		<>
			<div className="w-full max-w-4xl mx-auto h-full flex">
				<div className="overflow-hidden rounded-2xl bg-gradient-to-br from-tara to-mintCream shadow-xl border-2 border-oxfordBlue/10 hover:shadow-2xl transition-shadow duration-300 p-6 md:p-8 flex flex-col min-h-[320px] w-full">
					{/* Top row: circular profile image (top left) + name & details */}
					<div className="flex gap-4 md:gap-6 items-start flex-1 min-h-0">
						{/* Circle image - profile style, top left */}
						<div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-oxfordBlue/20 bg-oxfordBlue/10 flex items-center justify-center">
							{dog.image ? (
								<img
									className="w-full h-full object-cover"
									src={
										process.env.REACT_APP_LOCAL +
										dog.image
									}
									alt={dog.name}
								/>
							) : (
								<FontAwesomeIcon
									icon={faImage}
									className="text-2xl md:text-3xl text-oxfordBlue/40"
								/>
							)}
						</div>

						{/* Content beside the image */}
						<div className="flex-1 min-w-0">
							<h2 className="font-delius font-bold text-2xl md:text-3xl text-oxfordBlue mb-4">
								{getDogName(dog.name)}
							</h2>

							<ul className="space-y-2 text-sm">
								<li className="flex items-center justify-between gap-3">
									<span className="text-oxfordBlue/70 font-poppins flex items-center gap-2">
										<FontAwesomeIcon icon={faVenusMars} className="text-highland w-4" />
										Gender
									</span>
									<span className="font-semibold font-poppins text-oxfordBlue">
										{dog.gender}
									</span>
								</li>
								<li className="flex items-center justify-between gap-3">
									<span className="text-oxfordBlue/70 font-poppins flex items-center gap-2">
										<FontAwesomeIcon icon={faBirthdayCake} className="text-highland w-4" />
										Age
									</span>
									<span className="font-semibold font-poppins text-oxfordBlue">
										{dog.age} years
									</span>
								</li>
								<li className="flex items-center justify-between gap-3">
									<span className="text-oxfordBlue/70 font-poppins flex items-center gap-2">
										<FontAwesomeIcon icon={faPaw} className="text-highland w-4" />
										Breed
									</span>
									<span className="font-semibold font-poppins text-oxfordBlue">
										{dog.breed}
									</span>
								</li>
								<li className="flex items-center justify-between gap-3">
									<span className="text-oxfordBlue/70 font-poppins flex items-center gap-2">
										<FontAwesomeIcon icon={faRuler} className="text-highland w-4" />
										Size
									</span>
									<span className="font-semibold font-poppins text-oxfordBlue">
										{getSizeDisplayName(dog.size)}
									</span>
								</li>
							</ul>
						</div>
					</div>

					{/* Grey border, Adopt Me button - 11/12 width with x padding */}
					<div className="w-11/12 mx-auto mt-4 pt-4 border-t border-oxfordBlue/20 px-4 md:px-6">
						<button
							type="button"
							onClick={() => setShowContactModal(true)}
							className="w-full bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-4 rounded-xl font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:opacity-95 flex items-center justify-center gap-2 text-lg"
						>
							<FontAwesomeIcon icon={faHeart} className="text-lg" />
							Adopt Me
						</button>
					</div>
				</div>
			</div>

			{/* Contact modal: dog info + kennel details */}
			<AnimatePresence>
				{showContactModal && (
					<motion.div
						className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setShowContactModal(false)}
					>
						<motion.div
							className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-2xl border-2 border-oxfordBlue/20 max-w-lg w-full max-h-[90vh] overflow-y-auto"
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="p-6 md:p-8 relative">
								<button
									type="button"
									onClick={() => setShowContactModal(false)}
									className="absolute top-4 right-4 text-oxfordBlue/70 hover:text-oxfordBlue transition-colors p-1"
									aria-label="Close"
								>
									<FontAwesomeIcon icon={faTimes} className="text-xl" />
								</button>

								{/* Dog info */}
								<div className="flex gap-4 mb-6">
									<div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-oxfordBlue/20 bg-oxfordBlue/10 flex items-center justify-center">
										{dog.image ? (
											<img
												className="w-full h-full object-cover"
												src={process.env.REACT_APP_LOCAL + dog.image}
												alt={dog.name}
											/>
										) : (
											<FontAwesomeIcon icon={faImage} className="text-xl text-oxfordBlue/40" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="font-delius font-bold text-xl text-oxfordBlue mb-2">
											{getDogName(dog.name)}
										</h3>
										<ul className="space-y-1 text-sm text-oxfordBlue/80 font-poppins">
											<li>{dog.gender} · {dog.age} years</li>
											<li>{dog.breed} · {getSizeDisplayName(dog.size)}</li>
										</ul>
									</div>
								</div>

								{/* Kennel contact details */}
								<div className="pt-4 border-t border-oxfordBlue/20">
									<h4 className="font-poppins font-semibold text-oxfordBlue mb-3">
										{kennel.name}
									</h4>
									<div className="space-y-2 text-sm">
										{kennel.email && (
											<div className="flex items-center gap-2 text-oxfordBlue">
												<FontAwesomeIcon icon={faEnvelope} className="text-highland w-4 flex-shrink-0" />
												<a href={`mailto:${kennel.email}`} className="font-poppins truncate hover:underline">
													{kennel.email}
												</a>
											</div>
										)}
										{kennel.contact_number && (
											<div className="flex items-center gap-2 text-oxfordBlue">
												<FontAwesomeIcon icon={faPhone} className="text-highland w-4 flex-shrink-0" />
												<a href={`tel:${kennel.contact_number}`} className="font-poppins hover:underline">
													{kennel.contact_number}
												</a>
											</div>
										)}
										{kennel.address_line_1 && (
											<div className="flex items-center gap-2 text-oxfordBlue">
												<FontAwesomeIcon icon={faMapMarkerAlt} className="text-highland w-4 flex-shrink-0" />
												<span className="font-poppins text-xs">{kennel.address_line_1}</span>
											</div>
										)}
										{(kennel.city || kennel.town) && (
											<div className="flex items-center gap-2 text-oxfordBlue">
												<FontAwesomeIcon icon={faBuilding} className="text-highland w-4 flex-shrink-0" />
												<span className="font-poppins text-xs">{kennel.city || kennel.town}</span>
											</div>
										)}
										{!kennel.email && !kennel.contact_number && !kennel.address_line_1 && !kennel.city && !kennel.town && (
											<p className="text-oxfordBlue/70 font-poppins text-xs">Contact details not provided</p>
										)}
									</div>
								</div>

								<button
									className="mt-6 w-full bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-4 rounded-xl font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:opacity-95 flex items-center justify-center gap-2"
									onClick={() => setShowContactModal(false)}
								>
									<FontAwesomeIcon icon={faHeart} className="text-lg" />
									Adopt Me
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default AdoptionCard;
