import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
				<Form className="my-4 flex flex-col justify-start items-start w-full lg:w-full">
					<p className="block text-md text-oxfordBlue font-sans">
						Center name
					</p>
					<Field
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
						type="text"
						id="name"
						name="name"
						placeholder="Name"
					/>
					<p className="block text-md text-oxfordBlue font-sans">
						Email
					</p>
					<Field
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
						type="email"
						id="email"
						name="email"
						placeholder="Email"
					/>
					<ErrorMessage
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
						name="email"
						component="div"
					/>
					<p className="block text-md text-oxfordBlue font-sans">
						Contact number
					</p>
					<Field
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
						type="text"
						id="number"
						name="number"
						placeholder="Contact number"
					/>
					<p className="block text-md text-oxfordBlue font-sans">
						Address Line 1
					</p>
					<Field
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
						type="text"
						id="addressLine1"
						name="addressLine1"
						placeholder="Address Line 1"
					/>
					<div className="flex flex-row w-full">
						<div className="w-1/2 mr-2">
							<p className="block text-md text-oxfordBlue font-sans">
								Town
							</p>
							<Field
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
								type="text"
								id="town"
								name="town"
								placeholder="Town"
							/>
						</div>
						<div className="w-1/2 ml-2">
							<p className="block text-md text-oxfordBlue font-sans">
								City
							</p>
							<Field
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
								type="text"
								id="city"
								name="city"
								placeholder="City"
							/>
						</div>
					</div>
					<p className="block text-md text-oxfordBlue font-sans">
						Postcode
					</p>
					<Field
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
						type="text"
						id="postcode"
						name="postcode"
						placeholder="Postcode"
					/>

					<div className="flex items-center justify-center mt-4 w-full">
						<button
							type="submit"
							className="px-10 py-2 bg-oxfordBlue text-honeydew rounded-lg transition-all shadow-md font-poppins font-semibold hover:bg-skyBlue hover:text-oxfordBlue"
						>
							{loading ? "Sending..." : "Send"}
						</button>
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
		<div id="kennelAdmin" className="w-screen overflow-hidden h-auto mt-4">
			<div className="text-white py-4 flex justify-center">
				<button
					onClick={() => setIsLoginForm(true)}
					className={`px-6 py-2 mx-2 ${
						isLoginForm
							? "bg-oxfordBlue text-honeydew"
							: "bg-honeydew text-oxfordBlue "
					} rounded-lg transition-all shadow-md font-poppins font-semibold`}
				>
					Login
				</button>
				<button
					onClick={() => setIsLoginForm(false)}
					className={`px-6 py-2 mx-2 ${
						!isLoginForm
							? "bg-oxfordBlue text-honeydew"
							: "bg-honeydew text-oxfordBlue"
					} rounded-lg transition-all shadow-md font-poppins font-semibold`}
				>
					Signup
				</button>
			</div>
			<div className="flex flex-col md:flex-row my-4 h-full min-h-auto">
				{/* Left side (Login) */}
				<div className="flex items-stretch justify-center flex-1 bg-gray-100">
					{isLoginForm && (
						<div className="w-5/6 lg:w-1/2 p-6 bg-honeydew rounded-xl shadow-lg mx-10 my-4 flex flex-col justify-between">
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

					{/* Right side (Signup) */}
					{!isLoginForm && (
						<div className="flex flex-col items-stretch justify-center flex-1 bg-gray-100">
							{!formSubmitted && (
								<div>
									<div className="flex flex-col bg-sunset rounded-xl w-5/6 lg:w-1/2 mx-auto p-4">
										<p className="text-sm lg:text-lg text-center font-poppins font-medium">
											Are you a re-homing or animal rescue
											center?
										</p>
										<p className="mt-2 text-sm lg:text-lg text-center font-poppins font-medium">
											Sign up here to upload dogs
											available for adoption
										</p>
									</div>

									<div className="w-5/6 lg:w-1/2 p-6 bg-honeydew rounded-xl shadow-lg mx-auto my-4 flex flex-col justify-between">
										<p className="text-sm lg:text-md text-center font-poppins">
											Please fill out the form with your
											center details
										</p>
										{renderContactForm()}
									</div>
								</div>
							)}
							{formSubmitted && renderThankYou()}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default KennelAdmin;
