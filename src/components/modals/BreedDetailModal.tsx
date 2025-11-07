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
	faInfoCircle,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getSizeDisplayName } from "../../helpers/sizeUtils";

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
	const renderCharacteristic = (
		icon: any,
		label: string,
		value: string | null | undefined
	) => {
		if (!value) return null;
		return (
			<div className="flex items-center space-x-3 p-3 rounded-xl">
				<FontAwesomeIcon icon={icon} className="text-tara w-4" />
				<span className="text-tara/70 font-poppins font-medium flex-1">
					{label}:
				</span>
				<span className="text-tara font-poppins font-semibold">
					{value}
				</span>
			</div>
		);
	};

	// Helper function to render section
	const renderSection = (
		title: string,
		icon: any,
		children: React.ReactNode
	) => (
		<div className="rounded-2xl p-6">
			<h3 className="text-xl font-semibold text-tara font-poppins mb-4 flex items-center">
				<FontAwesomeIcon icon={icon} className="mr-3 text-tara" />
				{title}
			</h3>
			<div className="space-y-3">{children}</div>
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
				className="bg-tomThumb rounded-3xl shadow-2xl p-4 md:p-8 lg:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="text-center mb-6 relative">
					<button
						onClick={onClose}
						className="absolute top-0 right-0 text-tara hover:text-tara/70 transition-colors"
					>
						<FontAwesomeIcon icon={faTimes} className="text-xl" />
					</button>
					<div className="w-16 h-16 bg-gradient-to-br from-bayleaf to-tomThumb rounded-full flex items-center justify-center mx-auto mb-3">
						<FontAwesomeIcon
							icon={faDog}
							className="text-2xl text-sunset"
						/>
					</div>
					<h2 className="text-3xl font-bold text-tara font-delius mb-8 text-center">
						{selectedBreed.breed}
					</h2>
					<p className="text-lg lg:text-xl text-tara/90 font-fredoka max-w-3xl mx-auto mb-8">
						Breed Information
					</p>
				</div>

				{/* Breed Details */}
				<div className="space-y-6">
					{/* Basic Information */}
					{renderSection(
						"Basic Information",
						faPaw,
						<>
							<div className="flex justify-between items-center">
								<span className="text-tara/70 font-poppins font-medium">
									Breed Name:
								</span>
								<span className="text-tara font-poppins font-semibold">
									{selectedBreed.breed}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-tara/70 font-poppins font-medium">
									Group:
								</span>
								<span className="text-tara font-poppins font-semibold bg-tara/10 px-3 py-1 rounded-full">
									{selectedBreed.group}
								</span>
							</div>
							{selectedBreed.size && (
								<div className="flex justify-between items-center">
									<span className="text-tara/70 font-poppins font-medium">
										Size:
									</span>
									<span className="text-tara font-poppins font-semibold bg-tara/10 px-3 py-1 rounded-full">
										{getSizeDisplayName(selectedBreed.size)}
									</span>
								</div>
							)}
						</>
					)}

					{/* Physical Characteristics */}
					{(selectedBreed.lifespan ||
						selectedBreed.height ||
						selectedBreed.weight) &&
						renderSection(
							"Physical Characteristics",
							faRuler,
							<>
								{renderCharacteristic(
									faHeart,
									"Lifespan",
									selectedBreed.lifespan
								)}
								{renderCharacteristic(
									faRuler,
									"Height",
									selectedBreed.height
								)}
								{renderCharacteristic(
									faWeightHanging,
									"Weight",
									selectedBreed.weight
								)}
							</>
						)}

					{/* Temperament & Behavior */}
					{(selectedBreed.friendliness ||
						selectedBreed.family_friendly ||
						selectedBreed.child_friendly ||
						selectedBreed.pet_friendly ||
						selectedBreed.stranger_friendly ||
						selectedBreed.playfulness) &&
						renderSection(
							"Temperament & Behavior",
							faHeart,
							<>
								{renderCharacteristic(
									faHeart,
									"Friendliness",
									selectedBreed.friendliness
								)}
								{renderCharacteristic(
									faUsers,
									"Family Friendly",
									selectedBreed.family_friendly
								)}
								{renderCharacteristic(
									faChild,
									"Child Friendly",
									selectedBreed.child_friendly
								)}
								{renderCharacteristic(
									faDog,
									"Pet Friendly",
									selectedBreed.pet_friendly
								)}
								{renderCharacteristic(
									faUsers,
									"Stranger Friendly",
									selectedBreed.stranger_friendly
								)}
								{renderCharacteristic(
									faPlay,
									"Playfulness",
									selectedBreed.playfulness
								)}
							</>
						)}

					{/* Care & Training */}
					{(selectedBreed.easy_to_groom ||
						selectedBreed.easy_to_train ||
						selectedBreed.energy_levels ||
						selectedBreed.shedding_amount ||
						selectedBreed.barks_howls) &&
						renderSection(
							"Care & Training",
							faGraduationCap,
							<>
								{renderCharacteristic(
									faCut,
									"Easy to Groom",
									selectedBreed.easy_to_groom
								)}
								{renderCharacteristic(
									faGraduationCap,
									"Easy to Train",
									selectedBreed.easy_to_train
								)}
								{renderCharacteristic(
									faBolt,
									"Energy Levels",
									selectedBreed.energy_levels
								)}
								{renderCharacteristic(
									faCut,
									"Shedding Amount",
									selectedBreed.shedding_amount
								)}
								{renderCharacteristic(
									faVolumeUp,
									"Barks/Howls",
									selectedBreed.barks_howls
								)}
							</>
						)}

					{/* Living Environment */}
					{(selectedBreed.apartment_dog ||
						selectedBreed.can_be_alone ||
						selectedBreed.good_for_busy_owners ||
						selectedBreed.good_for_new_owners ||
						selectedBreed.guard_dog) &&
						renderSection(
							"Living Environment",
							faHome,
							<>
								{renderCharacteristic(
									faHome,
									"Apartment Dog",
									selectedBreed.apartment_dog
								)}
								{renderCharacteristic(
									faClock,
									"Can Be Alone",
									selectedBreed.can_be_alone
								)}
								{renderCharacteristic(
									faClock,
									"Good for Busy Owners",
									selectedBreed.good_for_busy_owners
								)}
								{renderCharacteristic(
									faUserGraduate,
									"Good for New Owners",
									selectedBreed.good_for_new_owners
								)}
								{renderCharacteristic(
									faShieldAlt,
									"Guard Dog",
									selectedBreed.guard_dog
								)}
							</>
						)}

					{/* Health Information */}
					{(selectedBreed.health || selectedBreed.health_concerns) &&
						renderSection(
							"Health Information",
							faHeart,
							<>
								{renderCharacteristic(
									faHeart,
									"General Health",
									selectedBreed.health
								)}
								{renderCharacteristic(
									faExclamationTriangle,
									"Health Concerns",
									selectedBreed.health_concerns
								)}
							</>
						)}

					{/* Description */}
					{(selectedBreed.short_description ||
						selectedBreed.long_description) &&
						renderSection(
							"Description",
							faInfoCircle,
							<>
								{selectedBreed.short_description && (
									<div className="rounded-xl p-4">
										<h4 className="font-semibold text-tara font-poppins mb-2">
											Short Description
										</h4>
										<p className="text-tara font-poppins">
											{selectedBreed.short_description}
										</p>
									</div>
								)}
								{selectedBreed.long_description && (
									<div className="rounded-xl p-4">
										<h4 className="font-semibold text-tara font-poppins mb-2">
											Detailed Description
										</h4>
										<p className="text-tara font-poppins">
											{selectedBreed.long_description}
										</p>
									</div>
								)}
							</>
						)}
				</div>

				{/* Close Button */}
				<div className="flex justify-center mt-8">
					<button
						className="group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-8 py-4 rounded-full text-lg font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
						onClick={onClose}
					>
						<div className="flex items-center justify-center space-x-3 relative z-10">
							<span>Close</span>
						</div>
						<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default BreedDetailModal;
