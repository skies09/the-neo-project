import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useKennelActions } from "../../hooks/kennel.actions";

const PasswordReset = () => {
	const { resetPassword } = useKennelActions();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [showPasswords, setShowPasswords] = useState({
		new: false,
		confirm: false,
	});

	const handleSubmit = async (values: { new_password: string; confirm_password: string }) => {
		setError(null);
		try {
			await resetPassword(values);
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred during password reset");
		}
	};

	const togglePasswordVisibility = (field: "new" | "confirm") => {
		setShowPasswords((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	if (success) {
		return (
			<motion.div
				className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-20 pb-8 px-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<div className="max-w-4xl mx-auto">
					<motion.div
						className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-md mx-auto"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="text-center">
							<div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-4">
								<FontAwesomeIcon
									icon={faLock}
									className="text-2xl text-honeydew"
								/>
							</div>
							<h3 className="text-2xl font-bold text-oxfordBlue mb-3">
								Success!
							</h3>
							<p className="text-oxfordBlue/80 font-poppins">
								Password set successfully! Redirecting...
							</p>
						</div>
					</motion.div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-20 pb-8 px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<motion.div 
					className="text-center mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<FontAwesomeIcon icon={faLock} className="text-4xl text-skyBlue mr-4" />
						<h1 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Set Your Password
						</h1>
						<FontAwesomeIcon icon={faLock} className="text-4xl text-skyBlue ml-4" />
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins">
						Welcome! Please set your password to continue.
					</p>
				</motion.div>

				{/* Password Reset Form */}
				<motion.div
					className="w-full"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-md mx-auto">
						{/* Error Message */}
						{error && (
							<motion.div
								className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
							>
								<p className="font-medium font-poppins">{error}</p>
							</motion.div>
						)}

						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-3">
								<FontAwesomeIcon
									icon={faLock}
									className="text-2xl text-honeydew"
								/>
							</div>
							<h2 className="text-2xl font-bold text-oxfordBlue mb-2">
								Create Your Password
							</h2>
							<p className="text-oxfordBlue/70">
								Set a secure password for your account
							</p>
						</div>

						<Formik
							initialValues={{
								new_password: "",
								confirm_password: "",
							}}
							validationSchema={Yup.object({
								new_password: Yup.string()
									.min(8, "Password must be at least 8 characters")
									.required("Password is required"),
								confirm_password: Yup.string()
									.oneOf([Yup.ref("new_password")], "Passwords must match")
									.required("Please confirm your password"),
							})}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting }) => (
								<Form className="space-y-6">
									<div>
										<label htmlFor="new_password" className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
											<FontAwesomeIcon icon={faLock} className="mr-2 text-oxfordBlue" />
											New Password
										</label>
										<div className="relative">
											<Field
												type={showPasswords.new ? "text" : "password"}
												id="new_password"
												name="new_password"
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200 pr-10"
												placeholder="Enter new password"
											/>
											<button
												type="button"
												onClick={() => togglePasswordVisibility("new")}
												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-oxfordBlue transition-colors"
											>
												<FontAwesomeIcon
													icon={showPasswords.new ? faEyeSlash : faEye}
												/>
											</button>
										</div>
										<ErrorMessage
											name="new_password"
											component="div"
											className="text-red-500 text-sm mt-1 font-poppins"
										/>
										<p className="text-xs text-gray-500 mt-1">
											Must be at least 8 characters long
										</p>
									</div>
									
									<div>
										<label htmlFor="confirm_password" className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
											<FontAwesomeIcon icon={faLock} className="mr-2 text-oxfordBlue" />
											Confirm Password
										</label>
										<div className="relative">
											<Field
												type={showPasswords.confirm ? "text" : "password"}
												id="confirm_password"
												name="confirm_password"
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200 pr-10"
												placeholder="Confirm new password"
											/>
											<button
												type="button"
												onClick={() => togglePasswordVisibility("confirm")}
												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-oxfordBlue transition-colors"
											>
												<FontAwesomeIcon
													icon={showPasswords.confirm ? faEyeSlash : faEye}
												/>
											</button>
										</div>
										<ErrorMessage
											name="confirm_password"
											component="div"
											className="text-red-500 text-sm mt-1 font-poppins"
										/>
									</div>
									
									<div className="flex items-center justify-center pt-4">
										<motion.button
											type="submit"
											disabled={isSubmitting}
											className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-3 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-oxfordBlue/30 disabled:opacity-50 disabled:cursor-not-allowed w-full"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<div className="flex items-center justify-center space-x-3 relative z-10">
												<FontAwesomeIcon icon={faLock} className="text-lg" />
												<span>{isSubmitting ? "Setting Password..." : "Set Password"}</span>
											</div>
											<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										</motion.button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default PasswordReset;
