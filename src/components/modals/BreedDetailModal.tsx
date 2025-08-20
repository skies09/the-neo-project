import React from "react";
import { motion } from "framer-motion";
import { Breed } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faPaw, 
	faDog, 
	faHeart, 
	faRuler, 
	faWeightHanging, 
	faHome, 
	faChild, 
	faUsers, 
	faShieldAlt, 
	faGraduationCap, 
	faPlay, 
	faBolt, 
	faCut, 
	faVolumeUp, 
	faClock, 
	faUserGraduate,
	faExclamationTriangle,
	faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { getSizeDisplayName } from "../../helpers/sizeUtils.ts";

interface BreedDetailModalProps {
	selectedBreed: Breed | null;
	onClose: () => void;
}

const BreedDetailModal = ({
	selectedBreed,
	onClose,
}: BreedDetailModalProps) => {
	if (!selectedBreed) return null;

	// Helper function to render characteristic with icon
	const renderCharacteristic = (icon: any, label: string, value: string | null | undefined) => {
		if (!value) return null;
		return (
			<div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
				<FontAwesomeIcon icon={icon} className="text-oxfordBlue w-4" />
				<span className="text-oxfordBlue font-medium flex-1">{label}:</span>
				<span className="text-oxfordBlue font-semibold">{value}</span>
			</div>
		);
	};

	// Helper function to render section
	const renderSection = (title: string, icon: any, children: React.ReactNode) => (
		<div className="bg-gradient-to-br from-skyBlue to-aquamarine rounded-2xl p-6">
			<h3 className="text-xl font-semibold text-oxfordBlue mb-4 flex items-center">
				<FontAwesomeIcon icon={icon} className="mr-3 text-oxfordBlue" />
				{title}
			</h3>
			<div className="space-y-3">
				{children}
			</div>
		</div>
	);

	return (
		<motion.div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
		>
			<motion.div
				className="bg-gradient-to-br from-honeydew to-mintCream rounded-3xl shadow-2xl border border-skyBlue/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="text-center mb-6">
					<div className="w-20 h-20 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-4">
						<FontAwesomeIcon
							icon={faDog}
							className="text-3xl text-white"
						/>
					</div>
					<h2 className="text-3xl font-bold text-oxfordBlue mb-2 font-poppins">
						{selectedBreed.breed}
					</h2>
					<p className="text-oxfordBlue/70 font-poppins">
						Breed Information
					</p>
				</div>

				{/* Breed Details */}
				<div className="space-y-6">
					{/* Basic Information */}
					{renderSection("Basic Information", faPaw, (
						<>
							<div className="flex justify-between items-center">
								<span className="text-oxfordBlue font-medium">Breed Name:</span>
								<span className="text-oxfordBlue font-semibold">{selectedBreed.breed}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-oxfordBlue font-medium">Group:</span>
								<span className="text-oxfordBlue font-semibold bg-oxfordBlue/10 px-3 py-1 rounded-full">
									{selectedBreed.group}
								</span>
							</div>
							{selectedBreed.size && (
								<div className="flex justify-between items-center">
									<span className="text-oxfordBlue font-medium">Size:</span>
									<span className="text-oxfordBlue font-semibold bg-skyBlue/10 px-3 py-1 rounded-full">
										{getSizeDisplayName(selectedBreed.size)}
									</span>
								</div>
							)}
						</>
					))}

					{/* Physical Characteristics */}
					{(selectedBreed.lifespan || selectedBreed.height || selectedBreed.weight) && 
						renderSection("Physical Characteristics", faRuler, (
							<>
								{renderCharacteristic(faHeart, "Lifespan", selectedBreed.lifespan)}
								{renderCharacteristic(faRuler, "Height", selectedBreed.height)}
								{renderCharacteristic(faWeightHanging, "Weight", selectedBreed.weight)}
							</>
						))
					}

					{/* Temperament & Behavior */}
					{(selectedBreed.friendliness || selectedBreed.family_friendly || selectedBreed.child_friendly || 
					  selectedBreed.pet_friendly || selectedBreed.stranger_friendly || selectedBreed.playfulness) && 
						renderSection("Temperament & Behavior", faHeart, (
							<>
								{renderCharacteristic(faHeart, "Friendliness", selectedBreed.friendliness)}
								{renderCharacteristic(faUsers, "Family Friendly", selectedBreed.family_friendly)}
								{renderCharacteristic(faChild, "Child Friendly", selectedBreed.child_friendly)}
								{renderCharacteristic(faDog, "Pet Friendly", selectedBreed.pet_friendly)}
								{renderCharacteristic(faUsers, "Stranger Friendly", selectedBreed.stranger_friendly)}
								{renderCharacteristic(faPlay, "Playfulness", selectedBreed.playfulness)}
							</>
						))
					}

					{/* Care & Training */}
					{(selectedBreed.easy_to_groom || selectedBreed.easy_to_train || selectedBreed.energy_levels || 
					  selectedBreed.shedding_amount || selectedBreed.barks_howls) && 
						renderSection("Care & Training", faGraduationCap, (
							<>
								{renderCharacteristic(faCut, "Easy to Groom", selectedBreed.easy_to_groom)}
								{renderCharacteristic(faGraduationCap, "Easy to Train", selectedBreed.easy_to_train)}
								{renderCharacteristic(faBolt, "Energy Levels", selectedBreed.energy_levels)}
								{renderCharacteristic(faCut, "Shedding Amount", selectedBreed.shedding_amount)}
								{renderCharacteristic(faVolumeUp, "Barks/Howls", selectedBreed.barks_howls)}
							</>
						))
					}

					{/* Living Environment */}
					{(selectedBreed.apartment_dog || selectedBreed.can_be_alone || selectedBreed.good_for_busy_owners || 
					  selectedBreed.good_for_new_owners || selectedBreed.guard_dog) && 
						renderSection("Living Environment", faHome, (
							<>
								{renderCharacteristic(faHome, "Apartment Dog", selectedBreed.apartment_dog)}
								{renderCharacteristic(faClock, "Can Be Alone", selectedBreed.can_be_alone)}
								{renderCharacteristic(faClock, "Good for Busy Owners", selectedBreed.good_for_busy_owners)}
								{renderCharacteristic(faUserGraduate, "Good for New Owners", selectedBreed.good_for_new_owners)}
								{renderCharacteristic(faShieldAlt, "Guard Dog", selectedBreed.guard_dog)}
							</>
						))
					}

					{/* Health Information */}
					{(selectedBreed.health || selectedBreed.health_concerns) && 
						renderSection("Health Information", faHeart, (
							<>
								{renderCharacteristic(faHeart, "General Health", selectedBreed.health)}
								{renderCharacteristic(faExclamationTriangle, "Health Concerns", selectedBreed.health_concerns)}
							</>
						))
					}

					{/* Description */}
					{(selectedBreed.short_description || selectedBreed.long_description) && 
						renderSection("Description", faInfoCircle, (
							<>
								{selectedBreed.short_description && (
									<div className="bg-white/50 rounded-xl p-4">
										<h4 className="font-semibold text-oxfordBlue mb-2">Short Description</h4>
										<p className="text-oxfordBlue">{selectedBreed.short_description}</p>
									</div>
								)}
								{selectedBreed.long_description && (
									<div className="bg-white/50 rounded-xl p-4">
										<h4 className="font-semibold text-oxfordBlue mb-2">Detailed Description</h4>
										<p className="text-oxfordBlue">{selectedBreed.long_description}</p>
									</div>
								)}
							</>
						))
					}
				</div>

				{/* Close Button */}
				<div className="flex justify-center mt-8">
					<motion.button
						className="bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
						onClick={onClose}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Close
					</motion.button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default BreedDetailModal;
