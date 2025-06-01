import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosService from "../../helpers/axios";

const UploadDogForm = ({ kennelData, setDogAdded, dogToEdit }) => {
	// Upload/Edit dogs
	const handleSave = async (values) => {
		const data = {
			name: values.name,
			gender: values.gender,
			age: values.age,
			weight: values.weight,
			size: values.size,
			good_with_dogs:
				values.goodWithDogs === "unknown"
					? null
					: values.goodWithDogs === "true",
			good_with_cats:
				values.goodWithCats === "unknown"
					? null
					: values.goodWithCats === "true",
			good_with_children:
				values.goodWithChildren === "unknown"
					? null
					: values.goodWithChildren === "true",
			breed: values.breed,
			is_crossbreed:
				values.isCrossbreed === "unknown"
					? null
					: values.isCrossbreed === "true",
			extra_information: values.additionalInformation,
			kennel: kennelData.id,
		};

		try {
			if (dogToEdit?.id) {
				// Update existing dog (PUT) with kennel_pk and dog_pk
				await axiosService.put(
					`/api/kennels/${kennelData.id}/dogs/${dogToEdit.public_id}/`,
					data
				);
			} else {
				// Create new dog (POST) for kennel_pk
				await axiosService.post(
					`/api/kennels/${kennelData.id}/dogs/`,
					data
				);
			}
			setDogAdded(true);
		} catch (err) {
			console.error("Error saving dog:", err);
		}
	};

	return (
		<div className="relative w-11/12 flex items-center justify-center h-full mb-20">
			<Formik
				initialValues={{
					name: dogToEdit?.name || "",
					breed: dogToEdit?.breed || "",
					isCrossbreed: dogToEdit?.is_crossbreed?.toString() || "",
					gender: dogToEdit?.gender || "",
					age: dogToEdit?.age || "",
					weight: dogToEdit?.weight || "",
					size: dogToEdit?.size || "",
					goodWithDogs: dogToEdit?.good_with_dogs?.toString() || "",
					goodWithCats: dogToEdit?.good_with_cats?.toString() || "",
					goodWithChildren:
						dogToEdit?.good_with_children?.toString() || "",
					additionalInformation: dogToEdit?.extra_information || "",
				}}
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
				onSubmit={handleSave}
			>
				{({ values, handleChange, handleBlur }) => (
					<Form className="flex flex-col items-start w-full">
						<div className="flex flex-col justify-center items-center mx-auto py-8 w-1/2">
							<div className="w-1/2">
								<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
									Name
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
						</div>
						<div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
							{/* Left Column */}
							<div className="flex flex-col w-full lg:w-1/2 space-y-4">
								<div>
									{/* Turn this into dropdown with breed options */}
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Breed
									</p>
									<Field
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
										type="text"
										id="breed"
										name="breed"
									/>
									<ErrorMessage
										name="breed"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>
								<div>
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Age{" "}
										<span className="text-sm lg:text-base font-normal opacity-70">
											(if unknown leave blank)
										</span>
									</p>

									<Field
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
										as="select"
										id="age"
										name="age"
									>
										<option
											value=""
											disabled
											selected
											hidden
										>
											Select age
										</option>
										{[...Array(20)].map((_, i) => (
											<option key={i + 1} value={i + 1}>
												{i + 1}
											</option>
										))}
									</Field>

									<ErrorMessage
										name="age"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>
								<div>
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Is crossbreed
									</p>
									<div
										role="group"
										aria-labelledby="isCrossbreed-group"
										className="flex justify-center space-x-6 mt-1"
									>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="isCrossbreed"
												value="true"
											/>
											<span>Yes</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="isCrossbreed"
												value="false"
											/>
											<span>No</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="isCrossbreed"
												value="dontknow"
											/>
											<span>Don't know</span>
										</label>
									</div>
									<ErrorMessage
										name="isCrossbreed"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>

								<div>
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Gender
									</p>
									<div
										role="group"
										aria-labelledby="gender-group"
										className="flex justify-center space-x-6 mt-1"
									>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="gender"
												value="Male"
											/>
											<span>Male</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="gender"
												value="Female"
											/>
											<span>Female</span>
										</label>
									</div>
									<ErrorMessage
										name="gender"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>
							</div>

							{/* Right Column */}
							<div className="flex flex-col w-full lg:w-1/2 space-y-4">
								<div>
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Weight
									</p>
									<Field
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
										as="select"
										id="weight"
										name="weight"
									>
										<option
											value=""
											disabled
											selected
											hidden
										>
											Select weight
										</option>
										{[...Array(100)].map((_, i) => (
											<option key={i + 1} value={i + 1}>
												{i + 1} kg
											</option>
										))}
									</Field>
									<ErrorMessage
										name="weight"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>
								<div>
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Size
									</p>
									<Field
										as="select"
										name="size"
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
									>
										<option value="" disabled hidden>
											Select size
										</option>
										<option value="XS">Extra Small</option>
										<option value="S">Small</option>
										<option value="M">Medium</option>
										<option value="L">Large</option>
										<option value="XL">Extra Large</option>
									</Field>
									<ErrorMessage
										name="size"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>

								<div>
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Good with other dogs
									</p>
									<div
										role="group"
										aria-labelledby="goodWithDogs-group"
										className="flex justify-center space-x-6 mt-1"
									>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithDogs"
												value="true"
											/>
											<span>Yes</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithDogs"
												value="false"
											/>
											<span>No</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithDogs"
												value="unknown"
											/>
											<span>Don’t know</span>
										</label>
									</div>
									<ErrorMessage
										name="goodWithDogs"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>

								<div>
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Good with cats
									</p>
									<div
										role="group"
										aria-labelledby="goodWithCats-group"
										className="flex justify-center space-x-6 mt-1"
									>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithCats"
												value="true"
											/>
											<span>Yes</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithCats"
												value="false"
											/>
											<span>No</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithCats"
												value="unknown"
											/>
											<span>Don’t know</span>
										</label>
									</div>
									<ErrorMessage
										name="goodWithCats"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>

								<div>
									<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
										Good with children
									</p>
									<div
										role="group"
										aria-labelledby="goodWithChildren-group"
										className="flex justify-center space-x-6 mt-1"
									>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithChildren"
												value="true"
											/>
											<span>Yes</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithChildren"
												value="false"
											/>
											<span>No</span>
										</label>
										<label className="inline-flex items-center space-x-2 font-monoTwo">
											<Field
												type="radio"
												name="goodWithChildren"
												value="unknown"
											/>
											<span>Don’t know</span>
										</label>
									</div>
									<ErrorMessage
										name="goodWithChildren"
										component="div"
										className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
									/>
								</div>
							</div>
						</div>
						<div className="mt-4 w-full">
							<p className="text-lg lg:text-xl text-colorFive font-bold text-center font-monoTwo opacity-90">
								Additional Notes
							</p>
							<Field
								as="textarea"
								className="w-full h-24 rounded-xl my-1 p-2 font-monoTwo border border-oxfordBlue"
								id="additionalInformation"
								name="additionalInformation"
								placeholder="Enter any additional notes here..."
							/>
							<ErrorMessage
								name="additionalInformation"
								component="div"
								className="text-sm text-colorOne font-bold text-center font-monoTwo opacity-90 -mt-2"
							/>
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
								onClick={() => setDogAdded(true)}
								className="bg-honeydew text-oxfordBlue px-4 py-2 rounded-md shadow-md font-monoTwo"
							>
								Cancel
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UploadDogForm;
