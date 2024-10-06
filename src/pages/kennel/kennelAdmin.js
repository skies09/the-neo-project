import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function KennelAdmin() {
	const [isSigningUp, setIsSigningUp] = useState(false);

	return (
		<div id="kennelAdmin" className="w-screen overflow-hidden h-auto mt-4">
			<div className="flex flex-col md:flex-row my-4 h-full min-h-auto">
				{/* Left side (Login) */}
				<div className="flex items-stretch justify-center flex-1 bg-gray-100">
					<div className="w-full p-6 bg-honeydew rounded-xl shadow-lg mx-10 my-4 flex flex-col justify-between">
						<div>
							<p className="text-oxfordBlue text-2xl font-bold mb-4 font-poppins">
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
				</div>

				{/* Right side (Signup) */}
				<div className="flex items-stretch justify-center flex-1 bg-gray-100">
					<div className="flex flex-col justify-between w-full p-4 lg:p-6 bg-honeydew rounded-xl shadow-lg mx-10 my-4">
						{!isSigningUp && (
							<>
								<div>
									<p className="mt-4 text-sm lg:text-lg text-center font-poppins">
										Are you a re-homing or animal rescue
										center?
									</p>
									<p className="mt-2 text-sm lg:text-lg text-center font-poppins">
										Sign up here to upload dogs available
										for adoption
									</p>
								</div>

								<div className="flex items-center justify-center mt-4 md:mt-0 pb-6">
									<button
										onClick={() => setIsSigningUp(true)}
										className="text-blue-500 hover:underline"
									>
										Sign up
									</button>
								</div>
							</>
						)}
						<></>
						{isSigningUp && (
							<>
								<div>
									<p className="text-sm lg:text-md text-center font-poppins">
										Please fill out the form with your
										center details
									</p>
								</div>
								<Formik
									initialValues={{
										name: "",
										location: "",
										contactNumber: "",
										email: "",
									}}
									validationSchema={Yup.object({
										name: Yup.string(),
										location: Yup.string(),
										contactNumber: Yup.string(),
										email: Yup.string()
											.email("Invalid email format")
											.required("Email is required"),
									})}
									onSubmit={(values, { setSubmitting }) => {
										console.log(
											values.message,
											"SEND TO ME TO SIGN UP ADD SEND EMAIL HERE"
										);
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
											Center location
										</p>
										{/* UPDATE THIS FOR ADDRESS FIELDS*/}
										<Field
											className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
											type="text"
											id="location"
											name="location"
											placeholder="Location"
										/>
										<p className="block text-md text-oxfordBlue font-sans">
											Contact number
										</p>

										<Field
											className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 font-sans"
											type="text"
											id="contactNumber"
											name="contactNumber"
											placeholder="Contact number"
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

										<div className="flex items-center justify-center mt-4 md:mt-0 pb-6">
											<button
												onClick={() =>
													setIsSigningUp(true)
												}
												className="text-blue-500 hover:underline"
											>
												Send
											</button>
										</div>
									</Form>
								</Formik>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
