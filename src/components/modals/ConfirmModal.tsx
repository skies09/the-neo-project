import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	icon?: IconDefinition;
	confirmText?: string;
	cancelText?: string;
	confirmButtonStyle?: "danger" | "primary";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	icon,
	confirmText = "Confirm",
	cancelText = "Cancel",
	confirmButtonStyle = "primary",
}) => {
	const handleConfirm = () => {
		onConfirm();
		onClose();
	};

	const confirmButtonClasses =
		confirmButtonStyle === "danger"
			? "bg-gradient-to-r from-highland to-sark text-honeydew hover:text-sunset"
			: "bg-gradient-to-r from-highland to-sark text-honeydew hover:text-sunset";

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
						className="relative bg-gradient-to-br from-tara to-mintCream rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full border-2 border-oxfordBlue/10"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={onClose}
							className="absolute top-4 right-4 text-oxfordBlue hover:text-highland transition-colors"
						>
							<FontAwesomeIcon icon={faTimes} className="text-xl" />
						</button>

						{/* Icon */}
						{icon && (
							<div className="flex justify-center mb-4">
								<div className="w-16 h-16 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center">
									<FontAwesomeIcon
										icon={icon}
										className="text-2xl text-honeydew"
									/>
								</div>
							</div>
						)}

						{/* Title */}
						<h2 className="text-2xl font-bold text-oxfordBlue font-delius text-center mb-4">
							{title}
						</h2>

						{/* Message */}
						<p className="text-oxfordBlue/70 font-poppins text-center mb-6">
							{message}
						</p>

						{/* Buttons */}
						<div className="flex flex-col sm:flex-row gap-3">
							<button
								onClick={onClose}
								className="flex-1 group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-6 py-3 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
							>
								<div className="flex items-center justify-center space-x-2 relative z-10">
									<span>{cancelText}</span>
								</div>
							</button>
							<button
								onClick={handleConfirm}
								className={`flex-1 group relative overflow-hidden ${confirmButtonClasses} px-6 py-3 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
							>
								<div className="flex items-center justify-center space-x-2 relative z-10">
									<span>{confirmText}</span>
								</div>
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ConfirmModal;

