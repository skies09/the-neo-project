import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { kennelAPI } from "../../services/api.ts";

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
						className="relative bg-gradient-to-br from-skyBlue to-aquamarine rounded-3xl p-8 max-w-md w-full shadow-2xl"
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
					>
						{/* Header */}
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center">
								<div className="w-10 h-10 bg-oxfordBlue rounded-full flex items-center justify-center mr-3">
									<FontAwesomeIcon
										icon={faLock}
										className="text-honeydew text-lg"
									/>
								</div>
								<h2 className="text-2xl font-bold text-oxfordBlue">
									Change Password
								</h2>
							</div>
							<button
								onClick={handleClose}
								disabled={loading}
								className="text-oxfordBlue hover:text-oxfordBlue/70 transition-colors disabled:opacity-50"
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
									className="block text-sm font-medium text-oxfordBlue mb-2"
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
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-oxfordBlue focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
										placeholder="Enter your current password"
									/>
									<button
										type="button"
										onClick={() => togglePasswordVisibility("old")}
										disabled={loading}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-oxfordBlue transition-colors"
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
									className="block text-sm font-medium text-oxfordBlue mb-2"
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
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-oxfordBlue focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
										placeholder="Enter your new password"
									/>
									<button
										type="button"
										onClick={() => togglePasswordVisibility("new")}
										disabled={loading}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-oxfordBlue transition-colors"
									>
										<FontAwesomeIcon
											icon={showPasswords.new ? faEyeSlash : faEye}
										/>
									</button>
								</div>
								<p className="text-xs text-gray-500 mt-1">
									Must be at least 8 characters long
								</p>
							</div>

							{/* Confirm New Password */}
							<div>
								<label
									htmlFor="confirm_password"
									className="block text-sm font-medium text-oxfordBlue mb-2"
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
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-oxfordBlue focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
										placeholder="Confirm your new password"
									/>
									<button
										type="button"
										onClick={() => togglePasswordVisibility("confirm")}
										disabled={loading}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-oxfordBlue transition-colors"
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
								className="w-full bg-oxfordBlue hover:bg-oxfordBlue/90 text-honeydew py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
							>
								{loading ? (
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-honeydew mr-2"></div>
										Changing Password...
									</div>
								) : (
									"Change Password"
								)}
							</button>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ChangePasswordModal;
