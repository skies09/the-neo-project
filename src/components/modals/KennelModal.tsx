import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faPhone,
	faMapMarkerAlt,
	faBuilding,
	faImage,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Dog } from "../../services/api";
import { getSizeDisplayName } from "../../helpers/sizeUtils";

interface KennelModalProps {
	isOpen: boolean;
	onClose: () => void;
	dog: Dog;
}

const KennelModal: React.FC<KennelModalProps> = ({ isOpen, onClose, dog }) => {
	const getDogName = (value: string) => {
		if (!value) return "";
		return value.charAt(0).toUpperCase() + value.slice(1);
	};

	const kennel = dog.kennel as {
		name?: string;
		email?: string;
		contact_number?: string;
		address_line_1?: string;
		city?: string;
		town?: string;
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className="bg-gradient-to-br from-tara to-mintCream rounded-3xl shadow-2xl border border-oxfordBlue/20 max-w-xl w-full max-h-[90vh] overflow-y-auto"
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6 md:p-8 relative">
							<button
								type="button"
								onClick={onClose}
								className="absolute top-4 right-4 text-oxfordBlue/70 hover:text-oxfordBlue transition-colors p-1"
								aria-label="Close"
							>
								<FontAwesomeIcon icon={faTimes} className="text-xl" />
							</button>

							<div className="mb-6 pr-8">
								<p className="text-xs uppercase tracking-wider text-oxfordBlue/60 font-poppins font-semibold mb-1">
									Adoption enquiry
								</p>
								<h3 className="font-delius font-bold text-2xl text-oxfordBlue">
									Contact{" "}
									<span className="text-highland font-extrabold bg-highland/10 px-1.5 py-0.5 rounded-md">
										{kennel.name || "Rescue Center"}
									</span>
								</h3>
								<p className="text-sm text-oxfordBlue/70 font-poppins mt-1">
									Send an enquiry about adopting {getDogName(dog.name)}.
								</p>
							</div>

							<div className="flex gap-4 mb-6 p-4 rounded-2xl bg-honeydew/70 border border-oxfordBlue/15">
								<div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-oxfordBlue/20 bg-oxfordBlue/10 flex items-center justify-center">
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
									<h4 className="font-delius font-bold text-xl text-oxfordBlue mb-1">
										{getDogName(dog.name)}
									</h4>
									<ul className="space-y-1 text-sm text-oxfordBlue/80 font-poppins">
										<li>{dog.breed}</li>
										<li>
											{dog.gender} · {dog.age} years · {getSizeDisplayName(dog.size)}
										</li>
									</ul>
								</div>
							</div>

							<div className="pt-4 border-t border-oxfordBlue/20">
								<h4 className="font-poppins font-semibold text-oxfordBlue mb-3 text-sm uppercase tracking-wide">
									{kennel.name}
								</h4>
								<div className="space-y-3 text-sm">
									{kennel.email && (
										<div className="flex items-center gap-3 text-oxfordBlue bg-white/70 rounded-xl px-3 py-2 border border-oxfordBlue/10">
											<FontAwesomeIcon icon={faEnvelope} className="text-highland w-4 flex-shrink-0" />
											<a href={`mailto:${kennel.email}`} className="font-poppins truncate hover:underline font-medium">
												{kennel.email}
											</a>
										</div>
									)}
									{kennel.contact_number && (
										<div className="flex items-center gap-3 text-oxfordBlue bg-white/70 rounded-xl px-3 py-2 border border-oxfordBlue/10">
											<FontAwesomeIcon icon={faPhone} className="text-highland w-4 flex-shrink-0" />
											<a href={`tel:${kennel.contact_number}`} className="font-poppins hover:underline font-medium">
												{kennel.contact_number}
											</a>
										</div>
									)}
									{kennel.address_line_1 && (
										<div className="flex items-center gap-3 text-oxfordBlue bg-white/70 rounded-xl px-3 py-2 border border-oxfordBlue/10">
											<FontAwesomeIcon icon={faMapMarkerAlt} className="text-highland w-4 flex-shrink-0" />
											<span className="font-poppins text-xs font-medium">{kennel.address_line_1}</span>
										</div>
									)}
									{(kennel.city || kennel.town) && (
										<div className="flex items-center gap-3 text-oxfordBlue bg-white/70 rounded-xl px-3 py-2 border border-oxfordBlue/10">
											<FontAwesomeIcon icon={faBuilding} className="text-highland w-4 flex-shrink-0" />
											<span className="font-poppins text-xs font-medium">{kennel.city || kennel.town}</span>
										</div>
									)}
									{!kennel.email &&
										!kennel.contact_number &&
										!kennel.address_line_1 &&
										!kennel.city &&
										!kennel.town && (
											<p className="text-oxfordBlue/70 font-poppins text-xs bg-white/60 rounded-xl px-3 py-2 border border-oxfordBlue/10">
												Contact details not provided
											</p>
										)}
								</div>
							</div>

							<div className="mt-6 space-y-3">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{kennel.email && (
										<a href={`mailto:${kennel.email}`} className="btn-primary px-5 py-3 text-center">
											<FontAwesomeIcon icon={faEnvelope} className="mr-2 text-base" />
											Email
										</a>
									)}
									{kennel.contact_number && (
										<a href={`tel:${kennel.contact_number}`} className="btn-secondary px-5 py-3 text-center">
											<FontAwesomeIcon icon={faPhone} className="mr-2 text-base" />
											Call
										</a>
									)}
								</div>

								{!kennel.email && !kennel.contact_number && (
									<p className="text-center text-xs text-oxfordBlue/70 font-poppins">
										No direct email or phone contact available.
									</p>
								)}

								<div className="flex justify-center pt-1">
									<button type="button" className="btn-tertiary px-8 py-3" onClick={onClose}>
										Close
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default KennelModal;
