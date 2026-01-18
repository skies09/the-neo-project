import React from "react";

const PawLoading: React.FC = () => {
	return (
		<div className="flex items-center justify-center">
			<img
				src="/images/pawsLoading.gif"
				alt="Loading paw prints"
				className="w-auto transform rotate-45"
			/>
		</div>
	);
};

export default PawLoading;
