import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { dogAPI, Kennel, Dog } from "../../services/api.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
	faPlus
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
	setDogAdded: (added: boolean) => void;
	dogToEdit?: DogToEdit;
	setDogToEdit?: (dog: DogToEdit | null) => void;
}

const UploadDogForm = ({
	kennelData,
	setDogAdded,
	dogToEdit,
	setDogToEdit,
}: UploadDogFormProps) => {
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
				await dogAPI.updateDog(dogToEdit.id, data);
			} else {
				// Create new dog
				await dogAPI.createDog(data);
			}
			setDogAdded(true);
			// Reset the form state
			setDogToEdit && setDogToEdit(null);
		} catch (err) {
			console.error("Error saving dog:", err);
			alert("Error saving dog. Please try again.");
		}
	};

	return (
		<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
			<div className="text-center mb-8">
				<div className="w-20 h-20 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-4">
					<FontAwesomeIcon 
						icon={dogToEdit ? faEdit : faPlus} 
						className="text-3xl text-honeydew" 
					/>
				</div>
				<h2 className="text-3xl font-bold text-oxfordBlue mb-2">
					{dogToEdit ? "Edit Dog" : "Add New Dog"}
				</h2>
				<p className="text-oxfordBlue/70">
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
							: dogToEdit && (dogToEdit.is_crossbreed === null || dogToEdit.is_crossbreed === undefined)
							? ""
							: undefined,
					gender: dogToEdit?.gender || "",
					age: dogToEdit?.age || "",
					weight: dogToEdit?.weight || "",
					size: dogToEdit?.size || "",
					goodWithDogs: dogToEdit?.good_with_dogs === true ? "yes" : dogToEdit?.good_with_dogs === false ? "no" : dogToEdit && (dogToEdit.good_with_dogs === null || dogToEdit.good_with_dogs === undefined) ? "" : undefined,
					goodWithCats: dogToEdit?.good_with_cats === true ? "yes" : dogToEdit?.good_with_cats === false ? "no" : dogToEdit && (dogToEdit.good_with_cats === null || dogToEdit.good_with_cats === undefined) ? "" : undefined,
					goodWithChildren: dogToEdit?.good_with_children === true ? "yes" : dogToEdit?.good_with_children === false ? "no" : dogToEdit && (dogToEdit.good_with_children === null || dogToEdit.good_with_children === undefined) ? "" : undefined,
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
						<div className="bg-gray-50 rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-oxfordBlue mb-6 flex items-center">
								<FontAwesomeIcon icon={faDog} className="mr-3 text-oxfordBlue" />
								Basic Information
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
										<FontAwesomeIcon icon={faUser} className="mr-2 text-oxfordBlue" />
										Name *
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
										<FontAwesomeIcon icon={faPaw} className="mr-2 text-oxfordBlue" />
										Breed *
									</label>
									<Field
										className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
										type="text"
										id="breed"
										name="breed"
									/>
									<ErrorMessage
										name="breed"
										component="div"
										className="text-red-500 text-sm mt-1"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
										<FontAwesomeIcon icon={faBirthdayCake} className="mr-2 text-oxfordBlue" />
										Age (years)
									</label>
									<Field
										className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
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
										className="text-red-500 text-sm mt-1"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
										<FontAwesomeIcon icon={faWeightHanging} className="mr-2 text-oxfordBlue" />
										Weight (kg) *
									</label>
									<Field
										className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
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
										className="text-red-500 text-sm mt-1"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
										<FontAwesomeIcon icon={faRuler} className="mr-2 text-oxfordBlue" />
										Size *
									</label>
									<Field
										as="select"
										name="size"
										className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200"
									>
										<option value="">Select size</option>
										<option value="XS">Extra Small</option>
										<option value="S">Small</option>
										<option value="M">Medium</option>
										<option value="L">Large</option>
										<option value="XL">Extra Large</option>
									</Field>
									<ErrorMessage
										name="size"
										component="div"
										className="text-red-500 text-sm mt-1"
									/>
								</div>
							</div>
						</div>

						{/* Characteristics */}
						<div className="bg-gray-50 rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-oxfordBlue mb-6 flex items-center">
								<FontAwesomeIcon icon={faQuestionCircle} className="mr-3 text-oxfordBlue" />
								Characteristics
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-semibold text-oxfordBlue mb-3 flex items-center">
											<FontAwesomeIcon icon={faVenusMars} className="mr-2 text-oxfordBlue" />
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
													Female
												</span>
											</label>
										</div>
										<ErrorMessage
											name="gender"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									<div>
										<label className="block text-sm font-semibold text-oxfordBlue mb-3 flex items-center">
											<FontAwesomeIcon icon={faPaw} className="mr-2 text-oxfordBlue" />
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
													Don't know
												</span>
											</label>
										</div>
										<ErrorMessage
											name="isCrossbreed"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>
								</div>

								<div className="space-y-6">
									<div>
										<label className="block text-sm font-semibold text-oxfordBlue mb-3 flex items-center">
											<FontAwesomeIcon icon={faHeart} className="mr-2 text-oxfordBlue" />
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
													Don't know
												</span>
											</label>
										</div>
									</div>

									<div>
										<label className="block text-sm font-semibold text-oxfordBlue mb-3 flex items-center">
											<FontAwesomeIcon icon={faCat} className="mr-2 text-oxfordBlue" />
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
													Don't know
												</span>
											</label>
										</div>
									</div>

									<div>
										<label className="block text-sm font-semibold text-oxfordBlue mb-3 flex items-center">
											<FontAwesomeIcon icon={faBaby} className="mr-2 text-oxfordBlue" />
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
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
												<span className="text-sm font-medium">
													Don't know
												</span>
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Additional Information */}
						<div className="bg-gray-50 rounded-2xl p-6">
							<h3 className="text-xl font-semibold text-oxfordBlue mb-6 flex items-center">
								<FontAwesomeIcon icon={faFileAlt} className="mr-3 text-oxfordBlue" />
								Additional Information
							</h3>
							<div>
								<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
									<FontAwesomeIcon icon={faFileAlt} className="mr-2 text-oxfordBlue" />
									Extra Information
								</label>
								<Field
									as="textarea"
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 transition-all duration-200 resize-none"
									id="additionalInformation"
									name="additionalInformation"
									rows="4"
									placeholder="Any additional information about the dog..."
								/>
								<ErrorMessage
									name="additionalInformation"
									component="div"
									className="text-red-500 text-sm mt-1"
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
								className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-oxfordBlue rounded-xl font-semibold transition-all duration-200"
							>
								<FontAwesomeIcon icon={faTimes} className="mr-2" />
								Cancel
							</button>
							<button
								type="submit"
								className="px-8 py-3 bg-oxfordBlue hover:bg-oxfordBlue/90 text-honeydew rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
							>
								<FontAwesomeIcon icon={dogToEdit ? faSave : faPlus} className="mr-2" />
								{dogToEdit ? "Update Dog" : "Add Dog"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UploadDogForm;
