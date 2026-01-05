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
		new: true,
		confirm: false,
	});

	const handleSubmit = async (values: {
		new_password: string;
		confirm_password: string;
	}) => {
		setError(null);
		try {
			await resetPassword(values);
			setSuccess(true);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An error occurred during password reset"
			);
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
				className="min-h-screen bg-mintCream pt-20 pb-8 px-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<div className="max-w-4xl mx-auto">
					<motion.div
						className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-10 max-w-md mx-auto"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="text-center">
							<div className="w-16 h-16 bg-gradient-to-br from-bayleaf to-tomThumb rounded-full flex items-center justify-center mx-auto mb-3">
								<FontAwesomeIcon
									icon={faLock}
									className="text-2xl text-sunset"
								/>
							</div>
							<h3 className="text-2xl font-bold text-tara mb-3 font-delius">
								Success!
							</h3>
							<p className="text-tara/90 font-poppins">
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
			className="min-h-screen bg-mintCream pt-20 pb-8 px-4"
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
					<div className="flex justify-center items-center my-4">
						<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center">
							Set Your Password
						</h1>
					</div>
					<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto mb-8">
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
					<div className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-10 max-w-2xl mx-auto">
						{/* Error Message */}
						{error && (
							<motion.div
								className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
							>
								<p className="font-medium font-poppins">
									{error}
								</p>
							</motion.div>
						)}

						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-bayleaf to-tomThumb rounded-full flex items-center justify-center mx-auto mb-3">
								<FontAwesomeIcon
									icon={faLock}
									className="text-2xl text-sunset"
								/>
							</div>
							<h2 className="text-3xl font-bold text-tara font-delius mb-8 text-center">
								Create Your Password
							</h2>
							<p className="text-lg lg:text-xl text-tara/90 font-fredoka max-w-3xl mx-auto mb-8">
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
									.min(
										8,
										"Password must be at least 8 characters"
									)
									.required("Password is required"),
								confirm_password: Yup.string()
									.oneOf(
										[Yup.ref("new_password")],
										"Passwords must match"
									)
									.required("Please confirm your password"),
							})}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting }) => (
								<Form className="my-4 flex flex-col justify-start items-start w-full lg:w-full space-y-4">
									<div className="w-full">
										<label
											htmlFor="new_password"
											className="ml-2 block text-tara font-poppins font-semibold mb-2"
										>
											New Password
										</label>
										<div className="relative">
											<Field
												type={
													showPasswords.new
														? "text"
														: "password"
												}
												id="new_password"
												name="new_password"
												className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors pr-10"
												placeholder="Enter new password"
											/>
											<span
												onClick={() =>
													togglePasswordVisibility(
														"new"
													)
												}
												className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-oxfordBlue/60 hover:text-oxfordBlue"
											>
												<FontAwesomeIcon
													icon={
														showPasswords.new
															? faEyeSlash
															: faEye
													}
												/>
											</span>
										</div>
										<ErrorMessage
											name="new_password"
											component="div"
											className="text-red-500 text-sm mt-1 font-poppins"
										/>
										<p className="text-xs text-tara/70 mt-1 ml-2">
											Must be at least 8 characters long
										</p>
									</div>

									<div className="relative w-full">
										<label
											htmlFor="confirm_password"
											className="ml-2 block text-tara font-poppins font-semibold mb-2"
										>
											Confirm Password
										</label>
										<div className="relative">
											<Field
												type={
													showPasswords.confirm
														? "text"
														: "password"
												}
												id="confirm_password"
												name="confirm_password"
												className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors pr-10"
												placeholder="Confirm new password"
											/>
											<span
												onClick={() =>
													togglePasswordVisibility(
														"confirm"
													)
												}
												className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-oxfordBlue/60 hover:text-oxfordBlue"
											>
												<FontAwesomeIcon
													icon={
														showPasswords.confirm
															? faEyeSlash
															: faEye
													}
												/>
											</span>
										</div>
										<ErrorMessage
											name="confirm_password"
											component="div"
											className="text-red-500 text-sm mt-1 font-poppins"
										/>
									</div>

									<div className="flex items-center justify-center mt-4 w-full">
										<button
											type="submit"
											disabled={isSubmitting}
											className="w-full group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-8 py-4 rounded-full text-lg font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
										>
											<div className="flex items-center justify-center space-x-3 relative z-10">
												{isSubmitting ? (
													<>
														<div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
														<span>Setting Password...</span>
													</>
												) : (
													<span>Set Password</span>
												)}
											</div>
											<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										</button>
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
