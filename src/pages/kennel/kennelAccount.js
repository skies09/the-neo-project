import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const KennelAccount = () => {
	const { kennel: kennelId } = useSelector((state) => state.kennel);
	const [kennelData, setKennelData] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [formValues, setFormValues] = useState(kennelData);

	useEffect(() => {
		const fetchKennelDetails = async () => {
			const url =
				process.env.REACT_APP_NEO_PROJECT_BASE_URL +
				"api/kennel/" +
				kennelId;

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
			} catch (error) {
				console.error("Error fetching groups:", error.message);
			}
		};

		fetchKennelDetails();
	}, [kennelId]);

	// Handle form field changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	// Handle the form submission to save the changes
	const handleSave = () => {
		// Save the data (this could be a POST or PUT request to an API)
		console.log("Saved kennel details:", formValues);
		setIsEditing(false);
	};

	return (
		<div id="kennelAdmin" className="w-screen overflow-hidden h-auto mt-4">
			<h2>{kennelData.name}</h2>

			{isEditing ? (
				<div className="edit-form">
					<form>
						<div>
							<label>Email:</label>
							<input
								type="email"
								name="email"
								value={kennelData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label>Username:</label>
							<input
								type="text"
								name="username"
								value={kennelData.username}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label>Name:</label>
							<input
								type="text"
								name="name"
								value={kennelData.name}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label>Address Line 1:</label>
							<input
								type="text"
								name="address_line_1"
								value={kennelData.address_line_1}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label>City:</label>
							<input
								type="text"
								name="city"
								value={kennelData.city}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label>Town:</label>
							<input
								type="text"
								name="town"
								value={kennelData.town}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label>Postcode:</label>
							<input
								type="text"
								name="postcode"
								value={kennelData.postcode}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label>Contact Number:</label>
							<input
								type="text"
								name="contact_number"
								value={kennelData.contact_number}
								onChange={handleInputChange}
							/>
						</div>

						<button type="button" onClick={handleSave}>
							Save
						</button>
					</form>
				</div>
			) : (
				<div className="view-details">
					<p>
						<strong>Email:</strong> {kennelData.email}
					</p>
					<p>
						<strong>Username:</strong> {kennelData.username}
					</p>
					<p>
						<strong>Name:</strong> {kennelData.name}
					</p>
					<p>
						<strong>Address Line 1:</strong>{" "}
						{kennelData.address_line_1}
					</p>
					<p>
						<strong>City:</strong> {kennelData.city}
					</p>
					<p>
						<strong>Town:</strong> {kennelData.town}
					</p>
					<p>
						<strong>Postcode:</strong> {kennelData.postcode}
					</p>
					<p>
						<strong>Contact Number:</strong>{" "}
						{kennelData.contact_number}
					</p>

					<button onClick={() => setIsEditing(true)}>Edit</button>
				</div>
			)}
		</div>
	);
};

export default KennelAccount;
