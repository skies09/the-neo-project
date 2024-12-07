import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosService from "../../helpers/axios";

const UploadDogForm = ({ kennelData, setDogAdded }) => {
	// Upload dogs
	const handleSave = (values) => {
		const data = {
			name: values.name,
			gender: values.gender,
			age: values.age,
			weight: values.weight,
			good_with_dogs: values.goodWithDogs === "true" ? true : false,
			good_with_cats: values.goodWithCats === "true" ? true : false,
			good_with_children:
				values.goodWithChildren === "true" ? true : false,
			breed: values.breed,
			is_crossbreed: values.isCrossbreed === "true" ? true : false,
			extra_information: values.additionalInformation,
			kennel: kennelData.id,
		};
		console.log("Save dog details:", data);

		axiosService
			.post("/api/dog/", data)
			.then((res) => {
				console.log("Response ", res);
			})
			.catch((err) => {
				console.log("Error ", err);
			});

		setDogAdded(true);
	};

	return (
		<div className="relative w-11/12 flex items-center justify-center h-full mb-20">
			<Formik
				initialValues={{
					name: "",
					breed: "",
					isCrossbreed: "",
					gender: "",
					age: "",
					weight: "",
					goodWithDogs: "",
					goodWithCats: "",
					goodWithChildren: "",
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
										Is crossbreed
									</p>
									<Field
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
										as="select"
										id="isCrossbreed"
										name="isCrossbreed"
									>
										<option
											value=""
											disabled
											selected
											hidden
										></option>
										<option value="true">Yes</option>
										<option value="false">No</option>
									</Field>
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
									<Field
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
										as="select"
										id="gender"
										name="gender"
									>
										<option
											value=""
											disabled
											selected
											hidden
										>
											Select gender
										</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
									</Field>
									<ErrorMessage
										name="gender"
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
										Good with other dogs
									</p>
									<Field
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
										as="select"
										id="goodWithDogs"
										name="goodWithDogs"
									>
										<option
											value=""
											disabled
											selected
											hidden
										></option>
										<option value="true">Yes</option>
										<option value="false">No</option>
										<option value="unknown">Unknown</option>
									</Field>
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
									<Field
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
										as="select"
										id="goodWithCats"
										name="goodWithCats"
									>
										<option
											value=""
											disabled
											selected
											hidden
										></option>
										<option value="true">Yes</option>
										<option value="false">No</option>
										<option value="unknown">Unknown</option>
									</Field>
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
									<Field
										className="w-full h-8 rounded-xl my-1 pl-2 font-monoTwo border border-oxfordBlue"
										as="select"
										id="goodWithChildren"
										name="goodWithChildren"
									>
										<option
											value=""
											disabled
											selected
											hidden
										></option>
										<option value="true">Yes</option>
										<option value="false">No</option>
										<option value="unknown">Unknown</option>
									</Field>
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
