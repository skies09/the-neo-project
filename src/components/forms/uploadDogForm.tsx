import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { dogAPI, Kennel } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "../ToastContainer";
import {
	faDog,
	faEdit,
	faSave,
	faTimes,
	faUser,
	faPaw,
	faBirthdayCake,
	faWeightHanging,
	faRuler,
	faVenusMars,
	faQuestionCircle,
	faHeart,
	faCat,
	faBaby,
	faFileAlt,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface DogToEdit {
	id?: string;
	public_id?: string;
	name?: string;
	breed?: string;
	is_crossbreed?: boolean;
	gender?: string;
	age?: number | string;
	weight?: string;
	size?: string;
	good_with_dogs?: boolean;
	good_with_cats?: boolean;
	good_with_children?: boolean;
	extra_information?: string;
}

interface UploadDogFormProps {
	kennelData: Kennel;
	kennelId: string;
	setDogAdded: (added: boolean) => void;
	dogToEdit?: DogToEdit;
	setDogToEdit?: (dog: DogToEdit | null) => void;
}

const UploadDogForm = ({
	kennelData,
	kennelId,
	setDogAdded,
	dogToEdit,
	setDogToEdit,
}: UploadDogFormProps) => {
	const { showToast } = useToast();

	// Upload/Edit dogs
	const handleSave = async (values: any) => {
		const data = {
			name: values.name,
			gender: values.gender,
			age: values.age,
			weight: values.weight,
			size: values.size,
			good_with_dogs:
				values.goodWithDogs === "yes"
					? true
					: values.goodWithDogs === "no"
					? false
					: null,
			good_with_cats:
				values.goodWithCats === "yes"
					? true
					: values.goodWithCats === "no"
					? false
					: null,
			good_with_children:
				values.goodWithChildren === "yes"
					? true
					: values.goodWithChildren === "no"
					? false
					: null,
			breed: values.breed,
			is_crossbreed:
				values.isCrossbreed === "yes"
					? true
					: values.isCrossbreed === "no"
					? false
					: null,
			extra_information: values.additionalInformation,
		};

		try {
			if (dogToEdit?.id) {
				// Update existing dog
				await dogAPI.updateKennelDog(kennelId, dogToEdit.id, data);
				showToast({
					type: "success",
					title: "Dog Updated!",
					message: `${values.name} has been successfully updated.`,
					duration: 4000,
				});
			} else {
				// Create new dog
				await dogAPI.createKennelDog(kennelId, data);
				showToast({
					type: "success",
					title: "Dog Added!",
					message: `${values.name} has been successfully added to your kennel.`,
					duration: 4000,
				});
			}
			setDogAdded(true);
			// Reset the form state
			setDogToEdit && setDogToEdit(null);
		} catch (err) {
			console.error("Error saving dog:", err);
			showToast({
				type: "error",
				title: "Error",
				message: "Failed to save dog. Please try again.",
				duration: 5000,
			});
		}
	};

	return (
		<div className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-10">
			<div className="text-center mb-8">
				<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
					<FontAwesomeIcon
						icon={dogToEdit ? faEdit : faPlus}
						className="text-2xl text-sunset"
					/>
				</div>
				<h2 className="text-3xl font-bold text-tara font-delius mb-8 text-center">
					{dogToEdit ? "Edit Dog" : "Add New Dog"}
				</h2>
				<p className="text-lg lg:text-xl text-tara/90 font-fredoka max-w-3xl mx-auto mb-8">
					{dogToEdit
						? "Update dog information"
						: "Add a new dog to your kennel"}
				</p>
			</div>

			<Formik
				initialValues={{
					name: dogToEdit?.name || "",
					breed: dogToEdit?.breed || "",
					isCrossbreed:
						dogToEdit?.is_crossbreed === true
							? "yes"
							: dogToEdit?.is_crossbreed === false
							? "no"
							: dogToEdit &&
							  (dogToEdit.is_crossbreed === null ||
									dogToEdit.is_crossbreed === undefined)
							? ""
							: undefined,
					gender: dogToEdit?.gender || "",
					age: dogToEdit?.age || "",
					weight: dogToEdit?.weight || "",
					size: dogToEdit?.size || "",
					goodWithDogs:
						dogToEdit?.good_with_dogs === true
							? "yes"
							: dogToEdit?.good_with_dogs === false
							? "no"
							: dogToEdit &&
							  (dogToEdit.good_with_dogs === null ||
									dogToEdit.good_with_dogs === undefined)
							? ""
							: undefined,
					goodWithCats:
						dogToEdit?.good_with_cats === true
							? "yes"
							: dogToEdit?.good_with_cats === false
							? "no"
							: dogToEdit &&
							  (dogToEdit.good_with_cats === null ||
									dogToEdit.good_with_cats === undefined)
							? ""
							: undefined,
					goodWithChildren:
						dogToEdit?.good_with_children === true
							? "yes"
							: dogToEdit?.good_with_children === false
							? "no"
							: dogToEdit &&
							  (dogToEdit.good_with_children === null ||
									dogToEdit.good_with_children === undefined)
							? ""
							: undefined,
					additionalInformation: dogToEdit?.extra_information || "",
				}}
				enableReinitialize={true}
				onSubmit={handleSave}
				validationSchema={Yup.object({
					name: Yup.string().required("Name is required"),
					breed: Yup.string().required("Breed is required"),
					isCrossbreed: Yup.string().required(
						"Crossbreed is Required"
					),
					gender: Yup.string().required("Gender is required"),
					age: Yup.number(),
					weight: Yup.string().required("Weight is required"),
					size: Yup.string().required("Size is required"),
					goodWithDogs: Yup.string(),
					goodWithCats: Yup.string(),
					goodWithChildren: Yup.string(),
					additionalInformation: Yup.string(),
				})}
			>
				{({ values, handleChange, handleBlur }) => (
					<Form className="space-y-8">
						{/* Basic Information */}
						<div className="rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-tara font-poppins mb-6 flex items-center">
								<FontAwesomeIcon
									icon={faDog}
									className="mr-3 text-tara"
								/>
								Basic Information
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-tara font-poppins font-semibold mb-2 flex items-center">
										<FontAwesomeIcon
											icon={faUser}
											className="mr-2 text-tara"
										/>
										Name *
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
									<label className="block text-tara font-poppins font-semibold mb-2 flex items-center">
										<FontAwesomeIcon
											icon={faPaw}
											className="mr-2 text-tara"
										/>
										Breed *
									</label>
									<Field
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
										type="text"
										id="breed"
										name="breed"
									/>
									<ErrorMessage
										name="breed"
										component="div"
										className="text-red-500 text-sm mt-1 font-poppins"
									/>
								</div>

								<div>
									<label className="block text-tara font-poppins font-semibold mb-2 flex items-center">
										<FontAwesomeIcon
											icon={faBirthdayCake}
											className="mr-2 text-tara"
										/>
										Age (years)
									</label>
									<Field
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
										as="select"
										id="age"
										name="age"
									>
										<option value="">Select age</option>
										{[...Array(20)].map((_, i) => (
											<option key={i + 1} value={i + 1}>
												{i + 1}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="age"
										component="div"
										className="text-red-500 text-sm mt-1 font-poppins"
									/>
								</div>

								<div>
									<label className="block text-tara font-poppins font-semibold mb-2 flex items-center">
										<FontAwesomeIcon
											icon={faWeightHanging}
											className="mr-2 text-tara"
										/>
										Weight (kg) *
									</label>
									<Field
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
										as="select"
										id="weight"
										name="weight"
									>
										<option value="">Select weight</option>
										{[...Array(100)].map((_, i) => (
											<option key={i + 1} value={i + 1}>
												{i + 1} kg
											</option>
										))}
									</Field>
									<ErrorMessage
										name="weight"
										component="div"
										className="text-red-500 text-sm mt-1 font-poppins"
									/>
								</div>

								<div>
									<label className="block text-tara font-poppins font-semibold mb-2 flex items-center">
										<FontAwesomeIcon
											icon={faRuler}
											className="mr-2 text-tara"
										/>
										Size *
									</label>
									<Field
										as="select"
										name="size"
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
									>
										<option value="">Select size</option>
										<option value="XS">X-Small</option>
										<option value="S">Small</option>
										<option value="M">Medium</option>
										<option value="L">Large</option>
										<option value="XL">X-Large</option>
									</Field>
									<ErrorMessage
										name="size"
										component="div"
										className="text-red-500 text-sm mt-1 font-poppins"
									/>
								</div>
							</div>
						</div>

						{/* Characteristics */}
						<div className="rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-tara font-poppins mb-6 flex items-center">
								<FontAwesomeIcon
									icon={faQuestionCircle}
									className="mr-3 text-tara"
								/>
								Characteristics
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="space-y-6">
									<div>
										<label className="block text-tara font-poppins font-semibold mb-3 flex items-center">
											<FontAwesomeIcon
												icon={faVenusMars}
												className="mr-2 text-tara"
											/>
											Gender *
										</label>
										<div className="flex space-x-6">
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="gender"
													value="Male"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Male
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="gender"
													value="Female"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Female
												</span>
											</label>
										</div>
										<ErrorMessage
											name="gender"
											component="div"
											className="text-red-500 text-sm mt-1 font-poppins"
										/>
									</div>

									<div>
										<label className="block text-tara font-poppins font-semibold mb-3 flex items-center">
											<FontAwesomeIcon
												icon={faPaw}
												className="mr-2 text-tara"
											/>
											Is Crossbreed *
										</label>
										<div className="flex space-x-6">
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="isCrossbreed"
													value="yes"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Yes
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="isCrossbreed"
													value="no"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													No
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="isCrossbreed"
													value=""
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Don't know
												</span>
											</label>
										</div>
										<ErrorMessage
											name="isCrossbreed"
											component="div"
											className="text-red-500 text-sm mt-1 font-poppins"
										/>
									</div>
								</div>

								<div className="space-y-6">
									<div>
										<label className="block text-tara font-poppins font-semibold mb-3 flex items-center">
											<FontAwesomeIcon
												icon={faHeart}
												className="mr-2 text-tara"
											/>
											Good with other dogs
										</label>
										<div className="flex space-x-6">
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithDogs"
													value="yes"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Yes
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithDogs"
													value="no"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													No
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithDogs"
													value=""
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Don't know
												</span>
											</label>
										</div>
									</div>

									<div>
										<label className="block text-tara font-poppins font-semibold mb-3 flex items-center">
											<FontAwesomeIcon
												icon={faCat}
												className="mr-2 text-tara"
											/>
											Good with cats
										</label>
										<div className="flex space-x-6">
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithCats"
													value="yes"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Yes
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithCats"
													value="no"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													No
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithCats"
													value=""
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Don't know
												</span>
											</label>
										</div>
									</div>

									<div>
										<label className="block text-tara font-poppins font-semibold mb-3 flex items-center">
											<FontAwesomeIcon
												icon={faBaby}
												className="mr-2 text-tara"
											/>
											Good with children
										</label>
										<div className="flex space-x-6">
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithChildren"
													value="yes"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Yes
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithChildren"
													value="no"
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													No
												</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="goodWithChildren"
													value=""
													className="w-4 h-4 text-oxfordBlue border-gray-300 focus:ring-oxfordBlue"
												/>
												<span className="text-sm font-medium text-tara font-poppins">
													Don't know
												</span>
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Additional Information */}
						<div className="rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-tara font-poppins mb-6 flex items-center">
								<FontAwesomeIcon
									icon={faFileAlt}
									className="mr-3 text-tara"
								/>
								Additional Information
							</h3>
							<div>
								<label className="block text-tara font-poppins font-semibold mb-2 flex items-center">
									<FontAwesomeIcon
										icon={faFileAlt}
										className="mr-2 text-tara"
									/>
									Extra Information
								</label>
								<Field
									as="textarea"
									className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-xl font-poppins focus:outline-none transition-colors resize-none"
									id="additionalInformation"
									name="additionalInformation"
									rows="4"
									placeholder="Any additional information about the dog..."
								/>
								<ErrorMessage
									name="additionalInformation"
									component="div"
									className="text-red-500 text-sm mt-1 font-poppins"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<div className="flex justify-center space-x-4 pt-6">
							<button
								type="button"
								onClick={() => {
									setDogToEdit && setDogToEdit(null);
									setDogAdded(true);
								}}
								className="group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-8 py-4 rounded-full text-lg font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
								className="group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-8 py-4 rounded-full text-lg font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
							>
								<div className="flex items-center justify-center space-x-3 relative z-10">
									<FontAwesomeIcon
										icon={dogToEdit ? faSave : faPlus}
										className="text-lg"
									/>
									<span>{dogToEdit ? "Update Dog" : "Add Dog"}</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UploadDogForm;
