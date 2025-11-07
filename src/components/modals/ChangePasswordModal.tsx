import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { kennelAPI } from "../../services/api";

interface ChangePasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [formData, setFormData] = useState({
		old_password: "",
		new_password: "",
		confirm_password: "",
	});
	const [showPasswords, setShowPasswords] = useState({
		old: false,
		new: false,
		confirm: false,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (error) setError(null);
	};

	const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
		setShowPasswords((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const validateForm = () => {
		if (!formData.old_password.trim()) {
			setError("Current password is required");
			return false;
		}
		if (!formData.new_password.trim()) {
			setError("New password is required");
			return false;
		}
		if (formData.new_password.length < 8) {
			setError("New password must be at least 8 characters long");
			return false;
		}
		if (formData.new_password !== formData.confirm_password) {
			setError("New passwords do not match");
			return false;
		}
		if (formData.old_password === formData.new_password) {
			setError("New password must be different from current password");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!validateForm()) return;

		setLoading(true);
		setError(null);

		try {
			await kennelAPI.changePassword(formData);
			setSuccess(true);
			setTimeout(() => {
				onClose();
				setSuccess(false);
				setFormData({
					old_password: "",
					new_password: "",
					confirm_password: "",
				});
			}, 2000);
		} catch (err: any) {
			console.error("Error changing password:", err);
			setError(
				err.response?.data?.message ||
				err.response?.data?.error ||
				err.message ||
				"Failed to change password. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		if (!loading) {
			onClose();
			setFormData({
				old_password: "",
				new_password: "",
				confirm_password: "",
			});
			setError(null);
			setSuccess(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{/* Backdrop */}
					<motion.div
						className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleClose}
					/>

					{/* Modal */}
					<motion.div
						className="relative bg-tomThumb rounded-3xl p-8 lg:p-10 max-w-md w-full shadow-2xl"
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
					>
						{/* Header */}
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
								<FontAwesomeIcon
									icon={faLock}
									className="text-2xl text-sunset"
								/>
							</div>
							<h2 className="text-3xl font-bold text-tara font-delius mb-8 text-center">
								Change Password
							</h2>
							<button
								onClick={handleClose}
								disabled={loading}
								className="absolute top-4 right-4 text-tara hover:text-tara/70 transition-colors disabled:opacity-50"
							>
								<FontAwesomeIcon icon={faTimes} className="text-xl" />
							</button>
						</div>

						{/* Success Message */}
						{success && (
							<motion.div
								className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
							>
								<p className="font-medium">Password changed successfully!</p>
							</motion.div>
						)}

						{/* Error Message */}
						{error && (
							<motion.div
								className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
							>
								<p className="font-medium">{error}</p>
							</motion.div>
						)}

						{/* Form */}
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Current Password */}
							<div>
								<label
									htmlFor="old_password"
									className="block text-tara font-poppins font-semibold mb-2"
								>
									Current Password
								</label>
								<div className="relative">
									<input
										type={showPasswords.old ? "text" : "password"}
										id="old_password"
										name="old_password"
										value={formData.old_password}
										onChange={handleInputChange}
										disabled={loading}
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed pr-10"
										placeholder="Enter your current password"
									/>
									<button
										type="button"
										onClick={() => togglePasswordVisibility("old")}
										disabled={loading}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-oxfordBlue/60 hover:text-oxfordBlue transition-colors"
									>
										<FontAwesomeIcon
											icon={showPasswords.old ? faEyeSlash : faEye}
										/>
									</button>
								</div>
							</div>

							{/* New Password */}
							<div>
								<label
									htmlFor="new_password"
									className="block text-tara font-poppins font-semibold mb-2"
								>
									New Password
								</label>
								<div className="relative">
									<input
										type={showPasswords.new ? "text" : "password"}
										id="new_password"
										name="new_password"
										value={formData.new_password}
										onChange={handleInputChange}
										disabled={loading}
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed pr-10"
										placeholder="Enter your new password"
									/>
									<button
										type="button"
										onClick={() => togglePasswordVisibility("new")}
										disabled={loading}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-oxfordBlue/60 hover:text-oxfordBlue transition-colors"
									>
										<FontAwesomeIcon
											icon={showPasswords.new ? faEyeSlash : faEye}
										/>
									</button>
								</div>
								<p className="text-xs text-tara/70 font-poppins mt-1 ml-2">
									Must be at least 8 characters long
								</p>
							</div>

							{/* Confirm New Password */}
							<div>
								<label
									htmlFor="confirm_password"
									className="block text-tara font-poppins font-semibold mb-2"
								>
									Confirm New Password
								</label>
								<div className="relative">
									<input
										type={showPasswords.confirm ? "text" : "password"}
										id="confirm_password"
										name="confirm_password"
										value={formData.confirm_password}
										onChange={handleInputChange}
										disabled={loading}
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed pr-10"
										placeholder="Confirm your new password"
									/>
									<button
										type="button"
										onClick={() => togglePasswordVisibility("confirm")}
										disabled={loading}
										className="absolute right-4 top-1/2 transform -translate-y-1/2 text-oxfordBlue/60 hover:text-oxfordBlue transition-colors"
									>
										<FontAwesomeIcon
											icon={showPasswords.confirm ? faEyeSlash : faEye}
										/>
									</button>
								</div>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={loading}
								className="w-full group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-8 py-4 rounded-full text-lg font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
							>
								<div className="flex items-center justify-center space-x-3 relative z-10">
									{loading ? (
										<>
											<div className="animate-spin w-5 h-5 border-2 border-oxfordBlue border-t-transparent rounded-full"></div>
											<span>Changing Password...</span>
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faLock} className="text-lg" />
											<span>Change Password</span>
										</>
									)}
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ChangePasswordModal;
