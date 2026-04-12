import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKennelActions } from "../../hooks/kennel.actions";
import { resolveApiErrorMessage } from "../../helpers/apiErrorMessage";
import { Kennel } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "../ToastContainer";
import {
	faHome,
	faEdit,
	faSave,
	faTimes,
	faEnvelope,
	faUser,
	faPhone,
	faMapMarkerAlt,
	faBuilding,
	faCity,
	faAddressCard,
	faLock,
} from "@fortawesome/free-solid-svg-icons";

interface ProfileCardProps {
	kennelData: Kennel;
	setProfileEdited: (edited: boolean) => void;
	onPasswordChange?: () => void;
}

const ProfileCard = ({
	kennelData,
	setProfileEdited,
	onPasswordChange,
}: ProfileCardProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const kennelActions = useKennelActions();
	const { showToast } = useToast();

	// Handle the form submission to save the changes
	const handleSave = async (values: Partial<Kennel>) => {
		setError(null);
		try {
			await kennelActions.edit(values, kennelData.public_id);
			setProfileEdited(true);
			setIsEditing(false);
			showToast({
				type: "success",
				title: "Profile Updated!",
				message: "Your kennel profile has been successfully updated.",
				duration: 4000,
			});
		} catch (err) {
			const errorMessage = resolveApiErrorMessage(
				err,
				"An error occurred while saving",
			);
			setError(errorMessage);
			showToast({
				type: "error",
				title: "Update Failed",
				message: errorMessage,
				duration: 5000,
			});
		}
	};

	return (
		<div className="rounded-3xl border-2 border-oxfordBlue/10 bg-gradient-to-br from-tara to-mintCream shadow-xl">
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-t-3xl">
					{error}
				</div>
			)}

			{isEditing ? (
				<div className="p-8 lg:p-10">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-oxfordBlue font-delius mb-8 text-center">
							Edit Profile
						</h2>
						<p className="text-lg lg:text-xl text-oxfordBlue/80 font-fredoka max-w-3xl mx-auto mb-8">
							Update your kennel information
						</p>
					</div>

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
							username: Yup.string().required(
								"Username is required"
							),
							name: Yup.string().required("Name is required"),
							address_line_1: Yup.string().required(
								"Address Line 1 is required"
							),
							city: Yup.string().required("City is required"),
							town: Yup.string().required("Town is required"),
							postcode: Yup.string().required(
								"Postcode is required"
							),
							contact_number: Yup.string()
								.matches(
									/^\d+$/,
									"Contact Number must be numeric"
								)
								.required("Contact Number is required"),
						})}
						onSubmit={handleSave}
					>
						{({ values, handleChange, handleBlur }) => (
							<Form className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Left Column */}
									<div className="space-y-6">
										<div>
											<label className="block text-oxfordBlue font-poppins font-semibold mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faEnvelope}
													className="mr-2 text-highland"
												/>
												Email
											</label>
											<Field
												className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
												type="email"
												id="email"
												name="email"
											/>
											<ErrorMessage
												name="email"
												component="div"
												className="text-red-500 text-sm mt-1 font-poppins"
											/>
										</div>

										<div>
											<label className="block text-oxfordBlue font-poppins font-semibold mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faUser}
													className="mr-2 text-highland"
												/>
												Username
											</label>
											<Field
												className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
												type="text"
												id="username"
												name="username"
											/>
											<ErrorMessage
												name="username"
												component="div"
												className="text-red-500 text-sm mt-1 font-poppins"
											/>
										</div>

										<div>
											<label className="block text-oxfordBlue font-poppins font-semibold mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faHome}
													className="mr-2 text-highland"
												/>
												Kennel Name
											</label>
											<Field
												className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
												type="text"
												id="name"
												name="name"
											/>
											<ErrorMessage
												name="name"
												component="div"
												className="text-red-500 text-sm mt-1 font-poppins"
											/>
										</div>

										<div>
											<label className="block text-oxfordBlue font-poppins font-semibold mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faMapMarkerAlt}
													className="mr-2 text-highland"
												/>
												Address Line 1
											</label>
											<Field
												className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
												type="text"
												id="address_line_1"
												name="address_line_1"
											/>
											<ErrorMessage
												name="address_line_1"
												component="div"
												className="text-red-500 text-sm mt-1 font-poppins"
											/>
										</div>
									</div>

									{/* Right Column */}
									<div className="space-y-6">
										<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="w-full">
												<label className="block text-oxfordBlue font-poppins font-semibold mb-2 flex items-center">
													<FontAwesomeIcon
														icon={faBuilding}
														className="mr-2 text-highland"
													/>
													Town
												</label>
												<Field
													className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
													type="text"
													id="town"
													name="town"
												/>
												<ErrorMessage
													name="town"
													component="div"
													className="text-red-500 text-sm mt-1 font-poppins"
												/>
											</div>
											<div className="w-full">
												<label className="block text-oxfordBlue font-poppins font-semibold mb-2 flex items-center">
													<FontAwesomeIcon
														icon={faCity}
														className="mr-2 text-highland"
													/>
													City
												</label>
												<Field
													className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
													type="text"
													id="city"
													name="city"
												/>
												<ErrorMessage
													name="city"
													component="div"
													className="text-red-500 text-sm mt-1 font-poppins"
												/>
											</div>
										</div>

										<div>
											<label className="block text-oxfordBlue font-poppins font-semibold mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faAddressCard}
													className="mr-2 text-highland"
												/>
												Postcode
											</label>
											<Field
												className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
												type="text"
												id="postcode"
												name="postcode"
											/>
											<ErrorMessage
												name="postcode"
												component="div"
												className="text-red-500 text-sm mt-1 font-poppins"
											/>
										</div>

										<div>
											<label className="block text-oxfordBlue font-poppins font-semibold mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faPhone}
													className="mr-2 text-highland"
												/>
												Contact Number
											</label>
											<Field
												className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
												type="text"
												id="contact_number"
												name="contact_number"
											/>
											<ErrorMessage
												name="contact_number"
												component="div"
												className="text-red-500 text-sm mt-1 font-poppins"
											/>
										</div>
									</div>
								</div>

								<div className="flex justify-center space-x-4 pt-6">
									<button
										type="button"
										onClick={() => setIsEditing(false)}
										className="btn-secondary bg-gradient-to-r from-tara to-mintCream px-8 py-4 text-lg shadow-lg hover:shadow-xl"
									>
										<div className="flex items-center justify-center space-x-3 relative z-10">
											<FontAwesomeIcon
												icon={faTimes}
												className="text-lg"
											/>
											<span>Cancel</span>
										</div>
									</button>
									<button
										type="submit"
										className="btn-secondary bg-gradient-to-r from-tara to-mintCream px-8 py-4 text-lg shadow-lg hover:shadow-xl"
									>
										<div className="flex items-center justify-center space-x-3 relative z-10">
											<FontAwesomeIcon
												icon={faSave}
												className="text-lg"
											/>
											<span>Save Changes</span>
										</div>
										<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			) : (
				<div className="p-8 lg:p-10">
					<div className="text-center mb-8">
						<div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-highland to-sark shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
							<FontAwesomeIcon
								icon={faHome}
								className="text-2xl text-sunset"
							/>
						</div>
						<h2 className="text-3xl font-bold text-oxfordBlue font-delius mb-8 text-center">
							{kennelData.name}
						</h2>
						<p className="text-lg lg:text-xl text-oxfordBlue/80 font-fredoka max-w-3xl mx-auto mb-8">
							Kennel Profile
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-4">
							<div className="rounded-xl p-4">
								<h3 className="text-lg font-semibold text-oxfordBlue font-poppins mb-3 flex items-center">
									<FontAwesomeIcon
										icon={faAddressCard}
										className="mr-2 text-highland"
									/>
									Contact Information
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins flex items-center">
											<FontAwesomeIcon
												icon={faEnvelope}
												className="mr-2 text-highland"
											/>
											Email:
										</span>
										<span className="font-medium text-oxfordBlue font-poppins">
											{kennelData.email}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins flex items-center">
											<FontAwesomeIcon
												icon={faUser}
												className="mr-2 text-highland"
											/>
											Username:
										</span>
										<span className="font-medium text-oxfordBlue font-poppins">
											{kennelData.username}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins flex items-center">
											<FontAwesomeIcon
												icon={faPhone}
												className="mr-2 text-highland"
											/>
											Phone:
										</span>
										<span className="font-medium text-oxfordBlue font-poppins">
											{kennelData.contact_number}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="rounded-xl p-4">
								<h3 className="text-lg font-semibold text-oxfordBlue font-poppins mb-3 flex items-center">
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className="mr-2 text-highland"
									/>
									Address
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins flex items-center">
											<FontAwesomeIcon
												icon={faMapMarkerAlt}
												className="mr-2 text-highland"
											/>
											Address:
										</span>
										<span className="font-medium text-oxfordBlue font-poppins">
											{kennelData.address_line_1}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins flex items-center">
											<FontAwesomeIcon
												icon={faBuilding}
												className="mr-2 text-highland"
											/>
											Town:
										</span>
										<span className="font-medium text-oxfordBlue font-poppins">
											{kennelData.town}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins flex items-center">
											<FontAwesomeIcon
												icon={faCity}
												className="mr-2 text-highland"
											/>
											City:
										</span>
										<span className="font-medium text-oxfordBlue font-poppins">
											{kennelData.city}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-oxfordBlue/70 font-poppins flex items-center">
											<FontAwesomeIcon
												icon={faAddressCard}
												className="mr-2 text-highland"
											/>
											Postcode:
										</span>
										<span className="font-medium text-oxfordBlue font-poppins">
											{kennelData.postcode}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="text-center mt-8">
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							{onPasswordChange && (
								<button
									onClick={onPasswordChange}
									className="btn-secondary bg-gradient-to-r from-tara to-mintCream px-8 py-4 text-lg shadow-lg hover:shadow-xl"
								>
									<div className="flex items-center justify-center space-x-3 relative z-10">
										<FontAwesomeIcon
											icon={faLock}
											className="text-lg"
										/>
										<span>Change Password</span>
									</div>
									<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</button>
							)}
							<button
								onClick={() => setIsEditing(true)}
								className="btn-secondary bg-gradient-to-r from-tara to-mintCream px-8 py-4 text-lg shadow-lg hover:shadow-xl"
							>
								<div className="flex items-center justify-center space-x-3 relative z-10">
									<FontAwesomeIcon
										icon={faEdit}
										className="text-lg"
									/>
									<span>Edit Profile</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileCard;
