import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/cards/ProfileCard";
import UploadDogForm from "../../components/form/uploadDogForm";

const KennelAccount = () => {
	const { kennel: kennelId } = useSelector((state) => state.kennel);
	const [showProfile, setShowProfile] = useState(true);
	const [profileEdited, setProfileEdited] = useState(false);
	const [showDogUploadForm, setShowDogUploadForm] = useState(false);
	const [dogAdded, setDogAdded] = useState(false);
	const [kennelData, setKennelData] = useState({});

	useEffect(() => {
		if (dogAdded) {
			setShowDogUploadForm(false);
			setDogAdded(false);
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

	return (
		<div id="kennelAdmin" className="w-screen overflow-hidden h-auto mt-4">
			<div className="flex justify-center items-center mx-auto">
				<p className="text-xl md:text-2xl font-poppins font-semibold text-oxfordBlue mb-2">
					{kennelData.name}
				</p>
			</div>
			<div className="text-white py-4 flex justify-center">
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
						/>
					)}
					{!showDogUploadForm && (
						<div className="w-5/6 mx-auto p-6 bg-honeydew rounded-xl shadow-lg my-4 flex flex-col justify-between">
							<div>DOGS IN KENNEL</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default KennelAccount;
