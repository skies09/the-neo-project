import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKennelActions } from "../../hooks/kennel.actions";

const ProfileCard = ({ kennelData, setProfileEdited }) => {
	const [isEditing, setIsEditing] = useState(false);
	const kennelActions = useKennelActions();

	// Handle the form submission to save the changes
	const handleSave = (values) => {
		console.log("Saved kennel details:", values);
		kennelActions.edit(values, kennelData.id).catch((err) => {
			if (err.message) {
				console.log(err.message, "Error msg");
				// Toasty
				// setErrorMessage(err.request.response);
			}
		});
		setProfileEdited(true);
		setIsEditing(false);
	};

	return (
		<div className="relative w-full flex items-center justify-center">
			{isEditing ? (
				<Formik
					initialValues={{
						email: kennelData.email || "",
						username: kennelData.username || "",
						name: kennelData.name || "",
						address_line_1: kennelData.address_line_1 || "",
						city: kennelData.city || "",
						town: kennelData.town || "",
						postcode: kennelData.postcode || "",
						contact_number: kennelData.contact_number || "",
					}}
					validationSchema={Yup.object({
						email: Yup.string()
							.email("Invalid email")
							.required("Email is required"),
						username: Yup.string().required("Username is required"),
						name: Yup.string().required("Name is required"),
						address_line_1: Yup.string().required(
							"Address Line 1 is required"
						),
						city: Yup.string().required("City is required"),
						town: Yup.string().required("Town is required"),
						postcode: Yup.string().required("Postcode is required"),
						contact_number: Yup.string()
							.matches(/^\d+$/, "Contact Number must be numeric")
							.required("Contact Number is required"),
					})}
					onSubmit={handleSave}
				>
					{({ values, handleChange, handleBlur }) => (
						<Form className="flex flex-col items-start w-full">
							<div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
								{/* Left Column */}
								<div className="flex flex-col w-full lg:w-1/2 space-y-4">
									<div>
										<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
											Email:
										</p>
										<Field
											className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
											type="email"
											id="email"
											name="email"
										/>
										<ErrorMessage
											name="email"
											component="div"
											className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
										/>
									</div>
									<div>
										<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
											Username:
										</p>
										<Field
											className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
											type="text"
											id="username"
											name="username"
										/>
										<ErrorMessage
											name="username"
											component="div"
											className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
										/>
									</div>
									<div>
										<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
											Name:
										</p>
										<Field
											className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
											type="text"
											id="name"
											name="name"
										/>
										<ErrorMessage
											name="name"
											component="div"
											className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
										/>
									</div>
									<div>
										<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
											Contact Number:
										</p>
										<Field
											className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
											type="text"
											id="contact_number"
											name="contact_number"
										/>
										<ErrorMessage
											name="contact_number"
											component="div"
											className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
										/>
									</div>
								</div>

								{/* Right Column */}
								<div className="flex flex-col w-full lg:w-1/2 space-y-4">
									<div>
										<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
											Address Line 1:
										</p>
										<Field
											className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
											type="text"
											id="address_line_1"
											name="address_line_1"
										/>
										<ErrorMessage
											name="address_line_1"
											component="div"
											className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
										/>
									</div>
									<div>
										<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
											City:
										</p>
										<Field
											className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
											type="text"
											id="city"
											name="city"
										/>
										<ErrorMessage
											name="city"
											component="div"
											className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
										/>
									</div>
									<div>
										<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
											Town:
										</p>
										<Field
											className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
											type="text"
											id="town"
											name="town"
										/>
										<ErrorMessage
											name="town"
											component="div"
											className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
										/>
									</div>
									<div>
										<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
											Postcode:
										</p>
										<Field
											className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
											type="text"
											id="postcode"
											name="postcode"
										/>
										<ErrorMessage
											name="postcode"
											component="div"
											className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
										/>
									</div>
								</div>
							</div>

							{/* Buttons */}
							<div className="flex flex-row justify-center space-x-4 mt-4">
								<button
									type="submit"
									className="bg-oxfordBlue text-honeydew px-4 py-2 rounded-md shadow-md font-monoTwo"
								>
									Save
								</button>
								<button
									type="button"
									onClick={() => setIsEditing(false)}
									className="bg-honeydew text-oxfordBlue px-4 py-2 rounded-md shadow-md font-monoTwo"
								>
									Cancel
								</button>
							</div>
						</Form>
					)}
				</Formik>
			) : (
				<div className="flex flex-col w-full items-start">
					<p className="text:lg font-poppins font-normal text-oxfordBlue mb-2">
						<strong>Email:</strong> {kennelData.email}
					</p>
					<p className="text:lg font-poppins font-normal text-oxfordBlue mb-2">
						<strong>Username:</strong> {kennelData.username}
					</p>
					<p className="text:lg font-poppins font-normal text-oxfordBlue mb-2">
						<strong>Name:</strong> {kennelData.name}
					</p>
					<p className="text:lg font-poppins font-normal text-oxfordBlue mb-2">
						<strong>Address Line 1:</strong>{" "}
						{kennelData.address_line_1}
					</p>
					<p className="text:lg font-poppins font-normal text-oxfordBlue mb-2">
						<strong>City:</strong> {kennelData.city}
					</p>
					<p className="text:lg font-poppins font-normal text-oxfordBlue mb-2">
						<strong>Town:</strong> {kennelData.town}
					</p>
					<p className="text:lg font-poppins font-normal text-oxfordBlue mb-2">
						<strong>Postcode:</strong> {kennelData.postcode}
					</p>
					<p className="text:lg font-poppins font-normal text-oxfordBlue mb-2">
						<strong>Contact Number:</strong>{" "}
						{kennelData.contact_number}
					</p>
					<div className="flex justify-center items-center mx-auto pt-4">
						<button
							onClick={() => setIsEditing(true)}
							className="px-6 py-2 mx-2 bg-oxfordBlue text-honeydew rounded-lg transition-all shadow-md font-poppins font-normal"
						>
							Edit
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileCard;
