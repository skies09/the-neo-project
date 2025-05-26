import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/cards/ProfileCard";
import UploadDogForm from "../../components/form/uploadDogForm";

const KennelAccount = () => {
	const { kennel: kennelId } = useSelector((state) => state.kennel);
	const [showProfile, setShowProfile] = useState(false);
	const [profileEdited, setProfileEdited] = useState(false);
	const [showDogUploadForm, setShowDogUploadForm] = useState(false);
	const [dogAdded, setDogAdded] = useState(false);
	const [kennelData, setKennelData] = useState({});
	const [dogData, setDogData] = useState([]);
	const [dogToEdit, setDogToEdit] = useState(null);

	useEffect(() => {
		if (dogAdded) {
			setShowDogUploadForm(false);
			setDogAdded(false);
			setDogToEdit(null);
		}
	}, [dogAdded]);

	useEffect(() => {
		const fetchKennelDetails = async () => {
			const auth = JSON.parse(localStorage.getItem("auth"));
			let url =
				process.env.REACT_APP_NEO_PROJECT_BASE_URL +
				"api/kennel/" +
				kennelId;
			if (!kennelId) {
				url =
					process.env.REACT_APP_NEO_PROJECT_BASE_URL +
					"api/kennel/" +
					auth.kennel.id;
			}
			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setKennelData(data);
				setProfileEdited(false);
			} catch (error) {
				console.error("Error fetching groups:", error.message);
			}
		};

		fetchKennelDetails();
	}, [kennelId, profileEdited]);

	useEffect(() => {
		const fetchDogs = async () => {
			let url = process.env.REACT_APP_NEO_PROJECT_BASE_URL + "api/dog/";

			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setDogData(data.results);
			} catch (error) {
				console.error("Error fetching groups:", error.message);
			}
		};

		fetchDogs();
	}, []);

	const handleDeleteDog = async (dogId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this dog?"
		);
		if (!confirmDelete) return;

		const token = JSON.parse(localStorage.getItem("auth"))?.access;

		try {
			const response = await fetch(
				`${process.env.REACT_APP_NEO_PROJECT_BASE_URL}api/dog/${dogId}/`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 204) {
				// Remove the deleted dog from state
				setDogData((prevDogs) =>
					prevDogs.filter((dog) => dog.id !== dogId)
				);
			} else {
				throw new Error(`Delete failed with status ${response.status}`);
			}
		} catch (error) {
			console.error("Error deleting dog:", error.message);
		}
	};

	return (
		<div id="kennelAdmin" className="w-screen overflow-hidden h-auto mt-4">
			<div className="flex justify-center items-center mx-auto">
				<p className="text-xl md:text-2xl font-poppins font-semibold text-oxfordBlue mb-2">
					{kennelData.name}
				</p>
			</div>
			<div className="text-white py-4 flex justify-center">
				<button
					onClick={() => setShowProfile(false)}
					className={`px-6 py-2 mx-2 ${
						!showProfile
							? "bg-oxfordBlue text-honeydew"
							: "bg-honeydew text-oxfordBlue"
					} rounded-lg transition-all shadow-md font-poppins font-semibold`}
				>
					Dogs
				</button>
				<button
					onClick={() => setShowProfile(true)}
					className={`px-6 py-2 mx-2 ${
						showProfile
							? "bg-oxfordBlue text-honeydew"
							: "bg-honeydew text-oxfordBlue "
					} rounded-lg transition-all shadow-md font-poppins font-semibold`}
				>
					Profile
				</button>
			</div>
			{showProfile && (
				<div className="w-5/6 mx-auto p-6 bg-honeydew rounded-xl shadow-lg my-4 flex flex-col justify-between">
					<div>
						<ProfileCard
							kennelData={kennelData}
							setProfileEdited={setProfileEdited}
						/>
					</div>
				</div>
			)}
			{!showProfile && (
				<div className="flex flex-col justify-center items-center mx-auto mt-3">
					<button
						onClick={() => setShowDogUploadForm(true)}
						className={`px-6 py-2 mx-2 ${
							showDogUploadForm
								? "bg-oxfordBlue text-honeydew"
								: "bg-honeydew text-oxfordBlue "
						} rounded-lg transition-all shadow-md font-poppins font-semibold`}
					>
						Add Dogs
					</button>
					{showDogUploadForm && (
						<UploadDogForm
							kennelData={kennelData}
							setDogAdded={setDogAdded}
							dogToEdit={dogToEdit}
						/>
					)}
					{!showDogUploadForm && (
						<div className="w-5/6 mx-auto p-6 bg-honeydew rounded-xl shadow-lg my-4 flex flex-col justify-between">
							<div>
								{" "}
								{dogData && (
									<ul className="flex flex-wrap justify-center mt-2">
										{dogData.map((dog, index) => (
											<li className="m-2" key={index}>
												<div className="flex flex-col font-mono text-base text-oxfordBlue p-2 border rounded-lg">
													<div>Name: {dog.name}</div>
													<div>
														Gender: {dog.gender}
													</div>
													<div>
														Breed: {dog.breed}
													</div>
													<div>Age: {dog.age}</div>
													<div>
														Weight: {dog.weight}kg
													</div>
													<div className="flex flex-row justify-center space-x-4 mt-4">
														<button
															type="button"
															className="bg-oxfordBlue text-honeydew px-4 py-2 rounded-md shadow-md font-monoTwo"
															onClick={() => {
																setShowDogUploadForm(
																	true
																);
																setDogToEdit(
																	dog
																);
															}}
														>
															Edit
														</button>

														<button
															type="button"
															onClick={() =>
																handleDeleteDog(
																	dog.id
																)
															}
															className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md font-monoTwo hover:bg-red-600"
														>
															Delete
														</button>
													</div>
												</div>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default KennelAccount;
