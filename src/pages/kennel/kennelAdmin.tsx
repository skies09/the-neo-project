import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faEye, faEyeSlash, faUser, faEnvelope, faPhone, faMapMarkerAlt, faBuilding, faCity } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKennelActions } from "../../hooks/kennel.actions.tsx";

interface EmailValues {
	name: string;
	email: string;
	number: string;
	addressLine1: string;
	town: string;
	city: string;
	postcode: string;
	from?: string;
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

	function sendEmail(values: EmailValues) {
		const serviceKey = process.env.REACT_APP_EMAIL_SERVICE_KEY;
		const templateKey = process.env.REACT_APP_EMAIL_TEMPLATE_KEY;
		const emailKey = process.env.REACT_APP_EMAIL_KEY;

		if (serviceKey && templateKey && emailKey) {
			emailjs.send(
				serviceKey,
				templateKey,
				values as unknown as Record<string, unknown>,
				emailKey
			);
		}
	}

	const login = (values: LoginValues) => {
		const data = {
			username: values.username,
			password: values.password,
		};

		kennelActions.login(data).catch((err) => {
			if (err.message) {
				setErrorMessage("Unable to log in");
			}
		});
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
				onSubmit={(
					values: EmailValues,
					{
						setSubmitting,
					}: { setSubmitting: (isSubmitting: boolean) => void }
				) => {
					setLoading(true);
					values.from = "Neo project";

					sendEmail(values);
					setSubmitting(false);
				}}
			>
				<Form className="my-4 flex flex-col justify-start items-start w-full lg:w-full space-y-4">
					<div className="w-full">
						<label className="block text-md text-oxfordBlue font-semibold mb-2 flex items-center">
							<FontAwesomeIcon icon={faBuilding} className="mr-2 text-oxfordBlue" />
							Center name
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-skyBlue focus:ring-2 focus:ring-skyBlue/20 font-sans transition-all duration-200"
							type="text"
							id="name"
							name="name"
							placeholder="Enter center name"
						/>
					</div>
					<div className="w-full">
						<label className="block text-md text-oxfordBlue font-semibold mb-2 flex items-center">
							<FontAwesomeIcon icon={faEnvelope} className="mr-2 text-oxfordBlue" />
							Email
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-skyBlue focus:ring-2 focus:ring-skyBlue/20 font-sans transition-all duration-200"
							type="email"
							id="email"
							name="email"
							placeholder="Enter email address"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-sans"
							name="email"
							component="div"
						/>
					</div>
					<div className="w-full">
						<label className="block text-md text-oxfordBlue font-semibold mb-2 flex items-center">
							<FontAwesomeIcon icon={faPhone} className="mr-2 text-oxfordBlue" />
							Contact number
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-skyBlue focus:ring-2 focus:ring-skyBlue/20 font-sans transition-all duration-200"
							type="text"
							id="number"
							name="number"
							placeholder="Enter contact number"
						/>
					</div>
					<div className="w-full">
						<label className="block text-md text-oxfordBlue font-semibold mb-2 flex items-center">
							<FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-oxfordBlue" />
							Address Line 1
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-skyBlue focus:ring-2 focus:ring-skyBlue/20 font-sans transition-all duration-200"
							type="text"
							id="addressLine1"
							name="addressLine1"
							placeholder="Enter address"
						/>
					</div>
					<div className="flex flex-row w-full space-x-4">
						<div className="w-1/2">
							<label className="block text-md text-oxfordBlue font-semibold mb-2 flex items-center">
								<FontAwesomeIcon icon={faBuilding} className="mr-2 text-oxfordBlue" />
								Town
							</label>
							<Field
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-skyBlue focus:ring-2 focus:ring-skyBlue/20 font-sans transition-all duration-200"
								type="text"
								id="town"
								name="town"
								placeholder="Enter town"
							/>
						</div>
						<div className="w-1/2">
							<label className="block text-md text-oxfordBlue font-semibold mb-2 flex items-center">
								<FontAwesomeIcon icon={faCity} className="mr-2 text-oxfordBlue" />
								City
							</label>
							<Field
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-skyBlue focus:ring-2 focus:ring-skyBlue/20 font-sans transition-all duration-200"
								type="text"
								id="city"
								name="city"
								placeholder="Enter city"
							/>
						</div>
					</div>
					<div className="w-full">
						<label className="block text-md text-oxfordBlue font-semibold mb-2 flex items-center">
							<FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-oxfordBlue" />
							Postcode
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-skyBlue focus:ring-2 focus:ring-skyBlue/20 font-sans transition-all duration-200"
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
								<FontAwesomeIcon icon={faEnvelope} className="text-lg" />
								<span>{loading ? "Sending..." : "Send Application"}</span>
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
			<div className="flex flex-col bg-sunset rounded-xl w-5/6 lg:w-1/2 mx-auto p-4">
				<p className="text-sm lg:text-lg text-center font-poppins font-medium">
					Thank you!
				</p>
				<p className="mt-2 text-sm lg:text-lg text-center font-poppins font-medium">
					We are working to create an account for your center and will
					be in touch shortly
				</p>
			</div>
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
						<FontAwesomeIcon icon={faUser} className="text-4xl text-skyBlue mr-4" />
						<h1 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Kennel Portal
						</h1>
						<FontAwesomeIcon icon={faUser} className="text-4xl text-skyBlue ml-4" />
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
							<FontAwesomeIcon icon={faEnvelope} className="mr-2" />
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

										login(values);
										setSubmitting(false);
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
								<div className="flex flex-col justify-center items-center mx-auto">
									<div className="flex text-center mt-2 w-full justify-center items-center">
										<p className="text-sm lg:text-lg text-center font-poppins font-medium text-[#FF0000]">
											{errorMessage}
										</p>
									</div>
									<p className="mt-2 text-sm lg:text-lg text-center font-poppins font-medium">
										Trouble logging in?
										<br />
										Contact us
									</p>
									<Link
										to="/Contact"
										className="px-10 py-2 w-full mx-auto bg-oxfordBlue text-honeydew rounded-lg transition-all shadow-md font-poppins font-semibold hover:bg-skyBlue hover:text-oxfordBlue"
									>
										Contact us
									</Link>
								</div>
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
											Are you a re-homing or animal rescue center? Sign up here to upload dogs available for adoption.
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
