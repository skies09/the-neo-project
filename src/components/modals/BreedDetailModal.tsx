import React from "react";
import { motion } from "framer-motion";
import { Breed } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faDog } from "@fortawesome/free-solid-svg-icons";
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

	return (
		<motion.div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
		>
			<motion.div
				className="bg-gradient-to-br from-honeydew to-mintCream rounded-3xl shadow-2xl border border-skyBlue/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
					<div className="bg-gradient-to-br from-skyBlue to-aquamarine rounded-2xl p-6">
						<h3 className="text-xl font-semibold text-oxfordBlue mb-4 flex items-center">
							<FontAwesomeIcon
								icon={faPaw}
								className="mr-3 text-oxfordBlue"
							/>
							Basic Information
						</h3>
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-oxfordBlue font-medium">
									Breed Name:
								</span>
								<span className="text-oxfordBlue font-semibold">
									{selectedBreed.breed}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-oxfordBlue font-medium">
									Group:
								</span>
								<span className="text-oxfordBlue font-semibold bg-oxfordBlue/10 px-3 py-1 rounded-full">
									{selectedBreed.group}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-oxfordBlue font-medium">
									Size:
								</span>
								<span className="text-oxfordBlue font-semibold bg-skyBlue/10 px-3 py-1 rounded-full">
									{getSizeDisplayName(selectedBreed.size)}
								</span>
							</div>
						</div>
					</div>
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
