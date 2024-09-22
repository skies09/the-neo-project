import React, { useEffect, useState } from "react";

export default function Breeds() {
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		// Get the dog groups
		const fetchData = async () => {
			const url = `${process.env.REACT_APP_NEO_PROJECT_BASE_URL}breeds/groups`;

			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						// Add other headers if needed, like authorization
						// 'Authorization': 'Bearer <token>',
					},
				});

				// Check if response status is OK (status code 200-299)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const groupsData = await response.json();
				setGroups(groupsData);
			} catch (error) {
				console.error("Error fetching groups:", error.message);
			}
		};

		fetchData();
	}, []);

	return (
		<div id="breeds" className="w-screen overflow-hidden h-[80vh] mt-4 ">
			<div className="flex justify-center items-center font-poppins text-2xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
				Breeds
			</div>
			<div className="group-list">
				{groups && (
					<ul>
						{" "}
						{groups.map((group, index) => (
							<li
								className="m-6 flex justify-center items-center w-1/3"
								key={index}
							>
								<button
									className="font-mono text-base text-oxfordBlue bg-sunset p-4 rounded-md"
									onClick={() => {
										console.log(group);
									}}
								>
									{group}
								</button>
							</li>
						))}{" "}
					</ul>
				)}{" "}
			</div>
		</div>
	);
}
