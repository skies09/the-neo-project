import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const KennelAdmin = () => {
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	function sendEmail(values) {
		emailjs
			.send(
				process.env.REACT_APP_EMAIL_SERVICE_KEY,
				process.env.REACT_APP_EMAIL_TEMPLATE_KEY,
				values,
				process.env.REACT_APP_EMAIL_KEY
			)
			.then(
				(result) => {
					console.log(result.text);
					setFormSubmitted(true);
					setLoading(false);
				},
				(error) => {
					console.log(error.text);
					setLoading(false);
				}
			);
	}

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
				onSubmit={(values, { setSubmitting }) => {
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
								<form className="space-y-4">
									<div>
										<label className="block text-oxfordBlue font-sans">
											Email
										</label>
										<input
											type="email"
											className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
											placeholder="Enter your email"
										/>
									</div>
									<div>
										<label className="block text-oxfordBlue font-sans">
											Password
										</label>
										<input
											type="password"
											className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
											placeholder="Enter your password"
										/>
									</div>
								</form>
							</div>
							{/* Left side button */}
							<div className="flex items-center justify-center mt-4">
								<button className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 font-mono">
									Login
								</button>
							</div>
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
