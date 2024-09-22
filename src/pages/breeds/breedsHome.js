import React, { useEffect, useState } from "react";

export default function Breeds() {
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		const fetchGroups = async () => {
			const url = process.env.REACT_APP_NEO_PROJECT_CF_GROUPS_URL;
			console.log(url, "URL");

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

				const groupsData = await response.json();
				setGroups(groupsData);
			} catch (error) {
				console.error("Error fetching groups:", error.message);
			}
		};

		fetchGroups();
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
