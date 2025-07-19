import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/cards/ProfileCard.tsx";
import UploadDogForm from "../../components/form/uploadDogForm.tsx";
import { RootState } from "../../store/store";

interface KennelData {
	id: string | number;
	name: string;
	email: string;
	username: string;
	address_line_1: string;
	city: string;
	town: string;
	postcode: string;
	contact_number: string;
}

interface Dog {
	id: string | number;
	name: string;
	[key: string]: any;
}

const KennelAccount = () => {
	const { kennel: kennelId } = useSelector(
		(state: RootState) => state.kennel
	);
	const [showProfile, setShowProfile] = useState(false);
	const [profileEdited, setProfileEdited] = useState(false);
	const [showDogUploadForm, setShowDogUploadForm] = useState(false);
	const [dogAdded, setDogAdded] = useState(false);
	const [kennelData, setKennelData] = useState<KennelData | null>(null);
	const [dogData, setDogData] = useState<Dog[]>([]);
	const [dogToEdit, setDogToEdit] = useState<Dog | null>(null);
	const [loadingDogs, setLoadingDogs] = useState(false);
	const [loadingKennel, setLoadingKennel] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (dogAdded) {
			setShowDogUploadForm(false);
			setDogAdded(false);
			setDogToEdit(null);
		}
	}, [dogAdded]);

	useEffect(() => {
		const fetchKennelDetails = async () => {
			setLoadingKennel(true);
			const authData = localStorage.getItem("auth");
			const auth = authData ? JSON.parse(authData) : null;
			const idToUse = kennelId || auth?.kennel?.id;

			if (!idToUse) {
				setLoadingKennel(false);
				setError("Kennel ID not found.");
				return;
			}

			const url =
				process.env.REACT_APP_NEO_PROJECT_BASE_URL +
				`api/kennels/${idToUse}/`;

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
				setError(null);
			} catch (err) {
				setError(
					"Error fetching kennel details: " +
						(err instanceof Error ? err.message : String(err))
				);
			} finally {
				setLoadingKennel(false);
			}
		};

		fetchKennelDetails();
	}, [kennelId, profileEdited]);

	useEffect(() => {
		const fetchDogs = async () => {
			setLoadingDogs(true);
			const authData = localStorage.getItem("auth");
			const auth = authData ? JSON.parse(authData) : null;
			const token = auth?.access;
			const idToUse = kennelId || auth?.kennel?.public_id;

			if (!idToUse || !token) {
				setError("Missing kennel ID or token.");
				setLoadingDogs(false);
				return;
			}

			const url =
				process.env.REACT_APP_NEO_PROJECT_BASE_URL +
				`api/kennels/${idToUse}/dogs/`;

			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					credentials: "include",
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						`HTTP error! status: ${
							response.status
						}, message: ${JSON.stringify(errorData)}`
					);
				}

				const data = await response.json();
				setDogData(data);
				setError(null);
			} catch (err) {
				setError(
					"Error fetching dogs: " +
						(err instanceof Error ? err.message : String(err))
				);
			} finally {
				setLoadingDogs(false);
			}
		};

		fetchDogs();
	}, [kennelId, dogAdded, showProfile]);

	const handleDeleteDog = async (dogId: string | number) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this dog?"
		);
		if (!confirmDelete) return;

		const authData = localStorage.getItem("auth");
		const auth = authData ? JSON.parse(authData) : null;
		const token = auth?.access;
		const idToUse = kennelId || auth?.kennel?.public_id;

		if (!idToUse || !token) {
			setError("Missing kennel ID or token.");
			setLoadingDogs(false);
			return;
		}
		try {
			const url =
				process.env.REACT_APP_NEO_PROJECT_BASE_URL +
				`api/kennels/${idToUse}/dogs/${dogId}/`;

			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				credentials: "include",
			});

			if (response.status === 204) {
				setDogData((prevDogs) =>
					prevDogs.filter((dog) => dog.id !== dogId)
				);
			} else {
				throw new Error(`Delete failed with status ${response.status}`);
			}
		} catch (error) {
			console.error(
				"Error deleting dog:",
				error instanceof Error ? error.message : String(error)
			);
		}
	};

	return (
		<div id="kennelAdmin" className="w-screen overflow-hidden h-auto mt-4">
			<div className="flex justify-center items-center mx-auto">
				<p className="text-xl md:text-2xl font-poppins font-semibold text-oxfordBlue mb-2">
					{loadingKennel ? "Loading kennel..." : kennelData?.name}
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

			{error && (
				<p className="text-red-600 text-center font-semibold mb-4">
					{error}
				</p>
			)}

			{showProfile && kennelData && (
				<div className="w-5/6 mx-auto p-6 bg-honeydew rounded-xl shadow-lg my-4 flex flex-col justify-between">
					<ProfileCard
						kennelData={kennelData}
						setProfileEdited={setProfileEdited}
					/>
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
					{showDogUploadForm && kennelData && (
						<UploadDogForm
							kennelData={kennelData}
							setDogAdded={setDogAdded}
							dogToEdit={dogToEdit || undefined}
						/>
					)}
					{!showDogUploadForm && (
						<div className="w-5/6 mx-auto p-6 bg-honeydew rounded-xl shadow-lg my-4 flex flex-col justify-between">
							{loadingDogs ? (
								<p className="text-center font-semibold text-oxfordBlue">
									Loading dogs...
								</p>
							) : dogData.length === 0 ? (
								<p className="text-center font-semibold text-oxfordBlue">
									No dogs found.
								</p>
							) : (
								<ul className="flex flex-wrap justify-center mt-2">
									{dogData.map((dog) => (
										<li className="m-2" key={dog.id}>
											<div className="flex flex-col font-mono text-base text-oxfordBlue p-2 border rounded-lg">
												<div>Name: {dog.name}</div>
												<div>Gender: {dog.gender}</div>
												<div>Breed: {dog.breed}</div>
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
															setDogToEdit(dog);
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
					)}
				</div>
			)}
		</div>
	);
};

export default KennelAccount;
