import React from "react";

interface PawLoadingProps {
	message?: string;
	className?: string;
}

const PawLoading: React.FC<PawLoadingProps> = ({ message, className = "" }) => {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div className="rounded-2xl bg-gradient-to-br from-tara/80 to-mintCream/80 px-6 py-5">
				<div className="flex flex-col items-center gap-3">
					{message && (
						<p className="text-center font-poppins text-sm lg:text-lg font-bold tracking-wide text-oxfordBlue/80">
							{message}
						</p>
					)}
					<div className="relative">
						<div className="absolute inset-0 animate-pulse rounded-full bg-highland/20 blur-md" />
						<img
							src="/images/pawsLoading.gif"
							alt="Loading paw prints"
							className="relative h-20 w-20 rotate-12 object-contain"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PawLoading;
