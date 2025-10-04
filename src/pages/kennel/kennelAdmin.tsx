import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
	faEye,
	faEyeSlash,
	faUser,
	faEnvelope,
	faPhone,
	faMapMarkerAlt,
	faBuilding,
	faCity,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKennelActions } from "../../hooks/kennel.actions";

interface ContactFormData {
	name: string;
	email: string;
	contact_number: string;
	address_line_1?: string;
	town?: string;
	city?: string;
	postcode?: string;
	contact_type:
		| "general"
		| "rescue_signup"
		| "adoption_inquiry"
		| "support"
		| "other";
	subject?: string;
	message: string;
	priority?: "low" | "medium" | "high" | "urgent";
}

interface ContactResponse {
	message: string;
	contact_id: string;
	status: "success" | "error";
}

class ContactApiService {
	private baseUrl: string;

	constructor() {
		this.baseUrl = process.env.REACT_APP_NEO_PROJECT_BASE_URL || "";
	}

	async submitContact(
		contactData: ContactFormData
	): Promise<ContactResponse> {
		try {
			const response = await fetch(`${this.baseUrl}api/contacts/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contactData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Failed to submit contact form"
				);
			}

			return data;
		} catch (error) {
			console.error("Contact submission error:", error);
			throw error;
		}
	}

	async submitRescueSignup(formData: {
		name: string;
		email: string;
		contact_number: string;
		address_line_1?: string;
		town?: string;
		city?: string;
		postcode?: string;
		message: string;
	}): Promise<ContactResponse> {
		const contactData: ContactFormData = {
			...formData,
			contact_type: "rescue_signup",
			priority: "high",
			subject: "Rescue Center Signup Request",
		};

		return this.submitContact(contactData);
	}
}

const contactApiService = new ContactApiService();

interface KennelSignupValues {
	name: string;
	email: string;
	number: string;
	addressLine1: string;
	town: string;
	city: string;
	postcode: string;
}

interface LoginValues {
	username: string;
	password: string;
}

const KennelAdmin = () => {
	const [loggingIn, setIsLoggingIn] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const kennelActions = useKennelActions();

	async function submitKennelSignup(values: KennelSignupValues) {
		try {
			const response = await contactApiService.submitRescueSignup({
				name: values.name,
				email: values.email,
				contact_number: values.number,
				address_line_1: values.addressLine1,
				town: values.town,
				city: values.city,
				postcode: values.postcode,
				message: `Kennel signup request from ${values.name}. Please review and approve this kennel for platform access.`,
			});

			setFormSubmitted(true);
			setLoading(false);
			return response;
		} catch (error: any) {
			console.error("Kennel signup error:", error);
			setErrorMessage(
				error.message ||
					"Failed to submit kennel signup. Please try again."
			);
			setLoading(false);
			throw error;
		}
	}

	const login = async (
		values: LoginValues,
		setSubmitting?: (isSubmitting: boolean) => void
	) => {
		const data = {
			username: values.username,
			password: values.password,
		};

		try {
			await kennelActions.login(data);
			// Success - navigation will be handled by kennelActions
			setIsLoggingIn(false);
			if (setSubmitting) setSubmitting(false);
		} catch (err: any) {
			console.error("Login error caught:", err);
			console.error("Error response:", err.response);
			console.error("Error message:", err.message);

			// Extract error message from different possible sources
			let errorMsg = "Invalid username or password";

			if (err.response?.data) {
				console.log("Error response data:", err.response.data);
				// API error response
				if (err.response.data.detail) {
					errorMsg = err.response.data.detail;
				} else if (err.response.data.error) {
					errorMsg = err.response.data.error;
				} else if (err.response.data.message) {
					errorMsg = err.response.data.message;
				} else if (err.response.data.non_field_errors) {
					// Django REST framework common error format
					errorMsg = Array.isArray(err.response.data.non_field_errors)
						? err.response.data.non_field_errors[0]
						: err.response.data.non_field_errors;
				} else if (typeof err.response.data === "string") {
					errorMsg = err.response.data;
				}
			} else if (err.message) {
				// Network or other error
				if (err.message.includes("Network Error")) {
					errorMsg = "Network error. Please check your connection.";
				} else if (err.message.includes("timeout")) {
					errorMsg = "Request timed out. Please try again.";
				} else if (
					err.message.includes("401") ||
					err.message.includes("403")
				) {
					errorMsg = "Invalid username or password";
				} else {
					errorMsg = err.message;
				}
			}

			// Clean up common error messages to be more user-friendly
			if (
				errorMsg.toLowerCase().includes("credentials") ||
				errorMsg.toLowerCase().includes("invalid") ||
				errorMsg.toLowerCase().includes("authentication")
			) {
				errorMsg = "Invalid username or password";
			}

			console.log("Setting error message to:", errorMsg);
			setErrorMessage(errorMsg);
			setIsLoggingIn(false);
			if (setSubmitting) setSubmitting(false);
		}
	};

	const renderContactForm = () => {
		return (
			<Formik
				initialValues={{
					name: "",
					email: "",
					number: "",
					addressLine1: "",
					town: "",
					city: "",
					postcode: "",
				}}
				validationSchema={Yup.object({
					name: Yup.string(),
					email: Yup.string()
						.email("Invalid email format")
						.required("Email is required"),
					number: Yup.string(),
					addressLine1: Yup.string(),
					town: Yup.string(),
					city: Yup.string(),
					postcode: Yup.string(),
				})}
				onSubmit={async (
					values: KennelSignupValues,
					{
						setSubmitting,
					}: { setSubmitting: (isSubmitting: boolean) => void }
				) => {
					setLoading(true);
					setErrorMessage("");

					try {
						await submitKennelSignup(values);
					} catch (error) {
						// Error handling is done in submitKennelSignup
					} finally {
						setSubmitting(false);
					}
				}}
			>
				<Form className="my-4 flex flex-col justify-start items-start w-full lg:w-full space-y-6">
					<div className="w-full">
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
							<FontAwesomeIcon
								icon={faBuilding}
								className="mr-2 text-oxfordBlue"
							/>
							Center name
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="text"
							id="name"
							name="name"
							placeholder="Enter center name"
						/>
					</div>
					<div className="w-full">
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
							<FontAwesomeIcon
								icon={faEnvelope}
								className="mr-2 text-oxfordBlue"
							/>
							Email
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="email"
							id="email"
							name="email"
							placeholder="Enter email address"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-poppins"
							name="email"
							component="div"
						/>
					</div>
					<div className="w-full">
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
							<FontAwesomeIcon
								icon={faPhone}
								className="mr-2 text-oxfordBlue"
							/>
							Contact number
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="text"
							id="number"
							name="number"
							placeholder="Enter contact number"
						/>
					</div>
					<div className="w-full">
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								className="mr-2 text-oxfordBlue"
							/>
							Address Line 1
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="text"
							id="addressLine1"
							name="addressLine1"
							placeholder="Enter address"
						/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="w-full">
							<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
								<FontAwesomeIcon
									icon={faBuilding}
									className="mr-2 text-oxfordBlue"
								/>
								Town
							</label>
							<Field
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
								type="text"
								id="town"
								name="town"
								placeholder="Enter town"
							/>
						</div>
						<div className="w-full">
							<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
								<FontAwesomeIcon
									icon={faCity}
									className="mr-2 text-oxfordBlue"
								/>
								City
							</label>
							<Field
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
								type="text"
								id="city"
								name="city"
								placeholder="Enter city"
							/>
						</div>
					</div>
					<div className="w-full">
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								className="mr-2 text-oxfordBlue"
							/>
							Postcode
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="text"
							id="postcode"
							name="postcode"
							placeholder="Enter postcode"
						/>
					</div>

					<div className="flex items-center justify-center mt-6 w-full">
						<motion.button
							type="submit"
							className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-3 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-oxfordBlue/30"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<div className="flex items-center space-x-3 relative z-10">
								<FontAwesomeIcon
									icon={faEnvelope}
									className="text-lg"
								/>
								<span>
									{loading
										? "Sending..."
										: "Send Application"}
								</span>
							</div>
							<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</motion.button>
					</div>
				</Form>
			</Formik>
		);
	};

	const renderThankYou = () => {
		return (
			<motion.div
				className="flex flex-col bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-md mx-auto"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="text-center">
					<div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-4">
						<FontAwesomeIcon
							icon={faEnvelope}
							className="text-2xl text-honeydew"
						/>
					</div>
					<h3 className="text-2xl font-bold text-oxfordBlue mb-3">
						Thank you!
					</h3>
					<p className="text-oxfordBlue/80 font-poppins">
						We are working to create an account for your center and
						will be in touch shortly
					</p>
				</div>
			</motion.div>
		);
	};

	return (
		<motion.div
			id="kennelAdmin"
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
						<FontAwesomeIcon
							icon={faUser}
							className="text-4xl text-skyBlue mr-4"
						/>
						<h1 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Kennel Portal
						</h1>
						<FontAwesomeIcon
							icon={faUser}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins">
						Login to your account or register your rescue center
					</p>
				</motion.div>

				{/* Tab Navigation */}
				<motion.div
					className="flex justify-center mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-2xl p-2 shadow-lg">
						<motion.button
							onClick={() => setIsLoginForm(true)}
							className={`px-8 py-3 mx-1 rounded-xl font-semibold transition-all duration-200 ${
								isLoginForm
									? "bg-oxfordBlue text-honeydew shadow-md transform scale-105"
									: "text-oxfordBlue hover:bg-oxfordBlue/10"
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<FontAwesomeIcon icon={faUser} className="mr-2" />
							Login
						</motion.button>
						<motion.button
							onClick={() => setIsLoginForm(false)}
							className={`px-8 py-3 mx-1 rounded-xl font-semibold transition-all duration-200 ${
								!isLoginForm
									? "bg-oxfordBlue text-honeydew shadow-md transform scale-105"
									: "text-oxfordBlue hover:bg-oxfordBlue/10"
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<FontAwesomeIcon
								icon={faEnvelope}
								className="mr-2"
							/>
							Signup
						</motion.button>
					</div>
				</motion.div>
				<motion.div
					className="w-full"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
				>
					{/* Login Form */}
					{isLoginForm && (
						<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-2xl mx-auto">
							<div>
								<p className="text-oxfordBlue text-2xl font-bold mb-4 font-poppins text-center">
									Kennel Login
								</p>
								<Formik
									initialValues={{
										username: "",
										password: "",
									}}
									validationSchema={Yup.object({
										username: Yup.string().required(
											"Username is required"
										),
										password: Yup.string().required(
											"Password is required"
										),
									})}
									onSubmit={(values, { setSubmitting }) => {
										setErrorMessage("");
										setIsLoggingIn(true);

										login(values, setSubmitting);
									}}
								>
									{({ values, isSubmitting }) => (
										<Form className="my-4 flex flex-col justify-start items-start w-full lg:w-full">
											<p className="block text-md text-oxfordBlue font-sans">
												Username
											</p>
											<Field
												className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
												type="text"
												id="username"
												name="username"
												placeholder="Username"
											/>
											<div className="relative w-full">
												<p className="block text-md text-oxfordBlue font-sans">
													Password
												</p>

												<Field
													className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans pr-10"
													type={
														showPassword
															? "text"
															: "password"
													}
													id="password"
													name="password"
													placeholder="Password"
												/>

												<span
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
													className="absolute right-3 top-8 cursor-pointer text-gray-500 hover:text-oxfordBlue"
												>
													<FontAwesomeIcon
														icon={
															!showPassword
																? faEyeSlash
																: faEye
														}
													/>
												</span>
											</div>

											<div className="flex items-center justify-center mt-4 w-full">
												<button
													disabled={
														!values.password ||
														!values.username
													}
													type="submit"
													className={`px-10 py-2 rounded-lg transition-all shadow-md font-poppins font-semibold bg-oxfordBlue text-honeydew ${
														!values.password ||
														!values.username
															? "opacity-60 cursor-not-allowed"
															: "hover:bg-skyBlue hover:text-oxfordBlue"
													}`}
												>
													{loggingIn
														? "Logging in ..."
														: "Login"}
												</button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
							{errorMessage && (
								<motion.div
									className="flex flex-col justify-center items-center mx-auto mt-6"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									<div className="flex text-center mt-2 w-full justify-center items-center mb-4">
										<p
											className="text-sm lg:text-lg text-center font-poppins font-medium text-red-500 !text-red-500"
											style={{ color: "#ef4444" }}
										>
											{errorMessage}
										</p>
									</div>
									<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 w-full max-w-md">
										<p className="text-sm lg:text-base text-center font-poppins font-medium text-oxfordBlue mb-4">
											Trouble logging in?
										</p>
										<Link
											to="/Contact"
											className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-3 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-oxfordBlue/30 flex items-center justify-center space-x-2"
										>
											<FontAwesomeIcon
												icon={faEnvelope}
												className="text-lg"
											/>
											<span>Contact us</span>
											<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 transition-opacity duration-300"></div>
										</Link>
									</div>
								</motion.div>
							)}
						</div>
					)}

					{/* Signup Form */}
					{!isLoginForm && (
						<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-4xl mx-auto">
							{!formSubmitted && (
								<div>
									<div className="text-center mb-6">
										<div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-3">
											<FontAwesomeIcon
												icon={faEnvelope}
												className="text-2xl text-honeydew"
											/>
										</div>
										<h2 className="text-2xl font-bold text-oxfordBlue mb-2">
											Register Your Center
										</h2>
										<p className="text-oxfordBlue/70">
											Are you a re-homing or animal rescue
											center? Sign up here to upload dogs
											available for adoption.
										</p>
									</div>
									{renderContactForm()}
								</div>
							)}
							{formSubmitted && renderThankYou()}
						</div>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default KennelAdmin;
