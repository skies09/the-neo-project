import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKennelActions } from "../../hooks/kennel.actions.tsx";
import { Kennel } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "../ToastContainer.tsx";
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

const ProfileCard = ({ kennelData, setProfileEdited, onPasswordChange }: ProfileCardProps) => {
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
				duration: 4000
			});
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "An error occurred while saving";
			setError(errorMessage);
			showToast({
				type: "error",
				title: "Update Failed",
				message: errorMessage,
				duration: 5000
			});
		}
	};

	return (
		<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20">
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-t-3xl">
					{error}
				</div>
			)}

			{isEditing ? (
				<div className="p-8">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-oxfordBlue mb-2">
							Edit Profile
						</h2>
						<p className="text-oxfordBlue/70">
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
											<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faEnvelope}
													className="mr-2 text-oxfordBlue"
												/>
												Email
											</label>
											<Field
												className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
												type="email"
												id="email"
												name="email"
											/>
											<ErrorMessage
												name="email"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faUser}
													className="mr-2 text-oxfordBlue"
												/>
												Username
											</label>
											<Field
												className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
												type="text"
												id="username"
												name="username"
											/>
											<ErrorMessage
												name="username"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faHome}
													className="mr-2 text-oxfordBlue"
												/>
												Kennel Name
											</label>
											<Field
												className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
												type="text"
												id="name"
												name="name"
											/>
											<ErrorMessage
												name="name"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faMapMarkerAlt}
													className="mr-2 text-oxfordBlue"
												/>
												Address Line 1
											</label>
											<Field
												className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
												type="text"
												id="address_line_1"
												name="address_line_1"
											/>
											<ErrorMessage
												name="address_line_1"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
										</div>
									</div>

									{/* Right Column */}
									<div className="space-y-6">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
													<FontAwesomeIcon
														icon={faBuilding}
														className="mr-2 text-oxfordBlue"
													/>
													Town
												</label>
												<Field
													className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
													type="text"
													id="town"
													name="town"
												/>
												<ErrorMessage
													name="town"
													component="div"
													className="text-red-500 text-sm mt-1"
												/>
											</div>
											<div>
												<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
													<FontAwesomeIcon
														icon={faCity}
														className="mr-2 text-oxfordBlue"
													/>
													City
												</label>
												<Field
													className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
													type="text"
													id="city"
													name="city"
												/>
												<ErrorMessage
													name="city"
													component="div"
													className="text-red-500 text-sm mt-1"
												/>
											</div>
										</div>

										<div>
											<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faAddressCard}
													className="mr-2 text-oxfordBlue"
												/>
												Postcode
											</label>
											<Field
												className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
												type="text"
												id="postcode"
												name="postcode"
											/>
											<ErrorMessage
												name="postcode"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
												<FontAwesomeIcon
													icon={faPhone}
													className="mr-2 text-oxfordBlue"
												/>
												Contact Number
											</label>
											<Field
												className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
												type="text"
												id="contact_number"
												name="contact_number"
											/>
											<ErrorMessage
												name="contact_number"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
										</div>
									</div>
								</div>

								<div className="flex justify-center space-x-4 pt-6">
									<button
										type="button"
										onClick={() => setIsEditing(false)}
										className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-oxfordBlue rounded-xl font-semibold transition-all duration-200"
									>
										<FontAwesomeIcon
											icon={faTimes}
											className="mr-2"
										/>
										Cancel
									</button>
									<button
										type="submit"
										className="px-8 py-3 bg-oxfordBlue hover:bg-oxfordBlue/90 text-honeydew rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
									>
										<FontAwesomeIcon
											icon={faSave}
											className="mr-2"
										/>
										Save Changes
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			) : (
				<div className="p-8">
					<div className="text-center mb-8">
						<div className="w-20 h-20 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-4">
							<FontAwesomeIcon
								icon={faHome}
								className="text-3xl text-honeydew"
							/>
						</div>
						<h2 className="text-3xl font-bold text-oxfordBlue mb-2">
							{kennelData.name}
						</h2>
						<p className="text-oxfordBlue/70">Kennel Profile</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-4">
							<div className="bg-gray-50 rounded-xl p-4">
								<h3 className="text-lg font-semibold text-oxfordBlue mb-3 flex items-center">
									<FontAwesomeIcon
										icon={faAddressCard}
										className="mr-2 text-oxfordBlue"
									/>
									Contact Information
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-gray-600 flex items-center">
											<FontAwesomeIcon
												icon={faEnvelope}
												className="mr-2 text-oxfordBlue"
											/>
											Email:
										</span>
										<span className="font-medium">
											{kennelData.email}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600 flex items-center">
											<FontAwesomeIcon
												icon={faUser}
												className="mr-2 text-oxfordBlue"
											/>
											Username:
										</span>
										<span className="font-medium">
											{kennelData.username}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600 flex items-center">
											<FontAwesomeIcon
												icon={faPhone}
												className="mr-2 text-oxfordBlue"
											/>
											Phone:
										</span>
										<span className="font-medium">
											{kennelData.contact_number}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="bg-gray-50 rounded-xl p-4">
								<h3 className="text-lg font-semibold text-oxfordBlue mb-3 flex items-center">
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className="mr-2 text-oxfordBlue"
									/>
									Address
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-gray-600 flex items-center">
											<FontAwesomeIcon
												icon={faMapMarkerAlt}
												className="mr-2 text-oxfordBlue"
											/>
											Address:
										</span>
										<span className="font-medium">
											{kennelData.address_line_1}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600 flex items-center">
											<FontAwesomeIcon
												icon={faBuilding}
												className="mr-2 text-oxfordBlue"
											/>
											Town:
										</span>
										<span className="font-medium">
											{kennelData.town}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600 flex items-center">
											<FontAwesomeIcon
												icon={faCity}
												className="mr-2 text-oxfordBlue"
											/>
											City:
										</span>
										<span className="font-medium">
											{kennelData.city}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600 flex items-center">
											<FontAwesomeIcon
												icon={faAddressCard}
												className="mr-2 text-oxfordBlue"
											/>
											Postcode:
										</span>
										<span className="font-medium">
											{kennelData.postcode}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="text-center mt-8">
						<div className="flex justify-center space-x-4">
							{onPasswordChange && (
								<button
									onClick={onPasswordChange}
									className="px-8 py-3 bg-oxfordBlue hover:bg-oxfordBlue/90 text-honeydew rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
								>
									<FontAwesomeIcon icon={faLock} className="mr-2" />
									Change Password
								</button>
							)}
							<button
								onClick={() => setIsEditing(true)}
								className="px-8 py-3 bg-oxfordBlue hover:bg-oxfordBlue/90 text-honeydew rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
							>
								<FontAwesomeIcon icon={faEdit} className="mr-2" />
								Edit Profile
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileCard;
