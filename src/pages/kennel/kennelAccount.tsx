import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/cards/ProfileCard";
import UploadDogForm from "../../components/forms/uploadDogForm";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import { RootState } from "../../store/store";
import { kennelAPI, dogAPI, Kennel, Dog } from "../../services/api";
import { getKennel } from "../../hooks/kennel.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
	faPlus,
	faDog,
	faEdit,
	faTrash,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getSizeDisplayName } from "../../helpers/sizeUtils";

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

const KennelAccount = () => {
	const { kennel: kennelId } = useSelector(
		(state: RootState) => (state as any).kennel || {}
	);
	const [showProfile, setShowProfile] = useState(false);
	const [profileEdited, setProfileEdited] = useState(false);
	const [showDogUploadForm, setShowDogUploadForm] = useState(false);
	const [dogAdded, setDogAdded] = useState(false);
	const [kennelData, setKennelData] = useState<Kennel | null>(null);
	const [dogData, setDogData] = useState<Dog[]>([]);
	const [dogToEdit, setDogToEdit] = useState<DogToEdit | null>(null);
	const [loadingDogs, setLoadingDogs] = useState(false);
	const [loadingKennel, setLoadingKennel] = useState(false);
	const [profileError, setProfileError] = useState<string | null>(null);
	const [dogsError, setDogsError] = useState<string | null>(null);
	const [showPasswordModal, setShowPasswordModal] = useState(false);

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
			setProfileError(null);

			try {
				const authData = localStorage.getItem("auth");
				const auth = authData ? JSON.parse(authData) : null;
				const kennelFromStorage = getKennel();

				// The kennel data should be directly available from localStorage
				if (kennelFromStorage) {
					setKennelData(kennelFromStorage);
					setProfileEdited(false);
				} else {
					// Fallback: try to get kennel profile by public_id if available
					const kennelPublicId = auth?.kennel?.public_id;

					if (!kennelPublicId) {
						throw new Error(
							"Kennel data not found in localStorage."
						);
					}
					const data = await kennelAPI.getProfile(kennelPublicId);
					setKennelData(data);
					setProfileEdited(false);
				}
			} catch (err) {
				console.error("Error fetching kennel details:", err);
				setProfileError(
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
			// Only fetch dogs when the dogs tab is active (showProfile is false)
			if (showProfile) {
				return;
			}

			setLoadingDogs(true);
			setDogsError(null);

			try {
				const data = await dogAPI.getKennelDogs(kennelId);
				// Ensure data is always an array
				setDogData(Array.isArray(data) ? data : []);
			} catch (err) {
				console.error("Error fetching dogs:", err);
				setDogsError("Error fetching dogs");
				// Set empty array on error to prevent map errors
				setDogData([]);
			} finally {
				setLoadingDogs(false);
			}
		};

		fetchDogs();
	}, [kennelId, dogAdded, showProfile]);

	const handleDeleteDog = async (dogId: string) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this dog?"
		);
		if (!confirmDelete) return;

		try {
			await dogAPI.deleteKennelDog(kennelId, dogId);
			setDogData((prevDogs) =>
				prevDogs.filter((dog) => dog.id !== dogId)
			);
		} catch (error) {
			console.error(
				"Error deleting dog:",
				error instanceof Error ? error.message : String(error)
			);
			setDogsError("Error deleting dog. Please try again.");
		}
	};

	return (
		<motion.div
			className="min-h-screen bg-mintCream pt-16 pb-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div
					className="text-center my-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center my-4">
						<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center">
							{loadingKennel
								? "Loading..."
								: kennelData?.name || "Kennel Account"}
						</h1>
					</div>
					<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto">
						Manage your kennel profile and dogs
					</p>
				</motion.div>

				{/* Tab Navigation */}
				<motion.div
					className="flex justify-center mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					<div className="flex flex-wrap justify-center gap-4">
						<button
							onClick={() => {
								setShowProfile(false);
								setShowDogUploadForm(false);
								setDogToEdit(null);
							}}
							className={`px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 hover:text-yellowOrange ${
								!showProfile
									? "bg-gradient-to-r from-highland to-sark text-honeydew shadow-lg transform scale-105"
									: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue hover:bg-oxfordBlue"
							}`}
						>
							<FontAwesomeIcon icon={faDog} className="mr-2" />
							Dogs
						</button>
						<button
							onClick={() => {
								setShowProfile(true);
								setProfileEdited(false);
							}}
							className={`px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 hover:text-yellowOrange ${
								showProfile
									? "bg-gradient-to-r from-highland to-sark text-honeydew shadow-lg transform scale-105"
									: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue hover:bg-oxfordBlue"
							}`}
						>
							<FontAwesomeIcon icon={faUser} className="mr-2" />
							Profile
						</button>
					</div>
				</motion.div>

				{/* Error Messages */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
				>
					{showProfile && profileError && (
						<div className="max-w-2xl mx-auto mb-6">
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
								{profileError}
							</div>
						</div>
					)}
					{!showProfile && dogsError && (
						<div className="max-w-2xl mx-auto mb-6">
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
								{dogsError}
							</div>
						</div>
					)}
				</motion.div>

				{/* Content */}
				{showProfile && kennelData && (
					<div className="max-w-4xl mx-auto">
						<ProfileCard
							kennelData={kennelData}
							setProfileEdited={setProfileEdited}
							onPasswordChange={() => setShowPasswordModal(true)}
						/>
					</div>
				)}
				{!showProfile && (
					<div className="max-w-6xl mx-auto">
						{!showDogUploadForm && (
							<div className="text-center mb-8">
								<button
									onClick={() => setShowDogUploadForm(true)}
									className="group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-8 py-4 rounded-full text-lg font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
								>
									<div className="flex items-center justify-center space-x-3 relative z-10">
										<FontAwesomeIcon
											icon={faPlus}
											className="text-lg"
										/>
										<span>Add New Dog</span>
									</div>
									<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</button>
							</div>
						)}

						{/* Dog Upload Form */}
						{showDogUploadForm && kennelData && (
							<div className="mb-8">
								<UploadDogForm
									kennelData={kennelData}
									kennelId={kennelId}
									setDogAdded={setDogAdded}
									dogToEdit={dogToEdit || undefined}
									setDogToEdit={setDogToEdit}
								/>
							</div>
						)}

						{/* Dogs List */}
						{!showDogUploadForm && (
							<div className="bg-tomThumb rounded-3xl p-8 shadow-xl">
								{loadingDogs ? (
									<div className="text-center py-12">
										<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tara mx-auto mb-4"></div>
										<p className="text-lg text-tara font-semibold font-poppins">
											Loading dogs...
										</p>
									</div>
								) : dogData.length === 0 ? (
									<div className="text-center py-12">
										<div className="text-6xl mb-4">
											<FontAwesomeIcon
												icon={faDog}
												className="text-tara"
											/>
										</div>
										<h3 className="text-2xl font-bold text-tara font-delius mb-2">
											No dogs found
										</h3>
										<p className="text-tara/70 font-poppins">
											Add your first dog to get started!
										</p>
									</div>
								) : (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
										{dogData.map((dog) => (
											<div
												key={dog.id}
												className="bg-gradient-to-br from-tara to-mintCream rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
											>
												<div className="text-center mb-4">
													<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
														<FontAwesomeIcon
															icon={faDog}
															className="text-2xl text-sunset"
														/>
													</div>
													<h3 className="text-xl font-bold text-oxfordBlue font-delius">
														{dog.name}
													</h3>
													<p className="text-sm text-oxfordBlue/70 font-poppins">
														{dog.breed}
													</p>
												</div>

												<div className="space-y-2 mb-6">
													<div className="flex justify-between">
														<span className="text-sm text-oxfordBlue/70 font-poppins">
															Gender:
														</span>
														<span className="font-medium text-oxfordBlue font-poppins">
															{dog.gender}
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-oxfordBlue/70 font-poppins">
															Age:
														</span>
														<span className="font-medium text-oxfordBlue font-poppins">
															{dog.age} years
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-oxfordBlue/70 font-poppins">
															Weight:
														</span>
														<span className="font-medium text-oxfordBlue font-poppins">
															{dog.weight}kg
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-oxfordBlue/70 font-poppins">
															Size:
														</span>
														<span className="font-medium text-oxfordBlue font-poppins">
															{getSizeDisplayName(
																dog.size
															)}
														</span>
													</div>
												</div>

												<div className="flex space-x-3">
													<button
														type="button"
														className="flex-1 group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-4 py-2 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
														onClick={() => {
															setShowDogUploadForm(
																true
															);
															setDogToEdit({
																id: dog.id,
																public_id:
																	dog.public_id,
																name: dog.name,
																breed: dog.breed,
																is_crossbreed:
																	dog.is_crossbreed ===
																	null
																		? undefined
																		: dog.is_crossbreed,
																gender: dog.gender,
																age: dog.age,
																weight: dog.weight?.toString(),
																size: dog.size,
																good_with_dogs:
																	dog.good_with_dogs ===
																	null
																		? undefined
																		: dog.good_with_dogs,
																good_with_cats:
																	dog.good_with_cats ===
																	null
																		? undefined
																		: dog.good_with_cats,
																good_with_children:
																	dog.good_with_children ===
																	null
																		? undefined
																		: dog.good_with_children,
																extra_information:
																	dog.extra_information,
															});
														}}
													>
														<div className="flex items-center justify-center space-x-2 relative z-10">
															<FontAwesomeIcon
																icon={faEdit}
																className="text-sm"
															/>
															<span>Edit</span>
														</div>
														<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
													</button>
													<button
														type="button"
														onClick={() =>
															handleDeleteDog(
																dog.id
															)
														}
														className="flex-1 group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-4 py-2 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
													>
														<div className="flex items-center justify-center space-x-2 relative z-10">
															<FontAwesomeIcon
																icon={faTrash}
																className="text-sm"
															/>
															<span>Delete</span>
														</div>
														<div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
													</button>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>

			<ChangePasswordModal
				isOpen={showPasswordModal}
				onClose={() => setShowPasswordModal(false)}
			/>
		</motion.div>
	);
};

export default KennelAccount;
