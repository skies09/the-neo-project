import React, { useState } from "react";
import { Dog } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faImage } from "@fortawesome/free-solid-svg-icons";
import KennelModal from "../modals/KennelModal";

interface AdoptionCardProps {
	dog: Dog;
}

const AdoptionCard = ({ dog }: AdoptionCardProps) => {
	const [showContactModal, setShowContactModal] = useState(false);

	const getDogName = (string: string) => {
		if (!string) return "";
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const traitPills = [
		{
			id: "dogs",
			label: "Good with dogs",
			active: dog.good_with_dogs === true,
		},
		{
			id: "cats",
			label: "Good with cats",
			active: dog.good_with_cats === true,
		},
		{
			id: "kids",
			label: "Good with children",
			active: dog.good_with_children === true,
		},
	].filter((trait) => trait.active);

	return (
		<>
			<div className="w-full max-w-md mx-auto h-full flex">
				<div className="overflow-hidden rounded-3xl bg-gradient-to-br from-tara to-mintCream shadow-xl border border-oxfordBlue/15 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full">
					<div className="relative aspect-[4/3] bg-oxfordBlue/10">
						<div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
							<span className="bg-gradient-to-r from-highland to-sark text-honeydew text-xs font-poppins font-bold px-3 py-1 rounded-full shadow-md">
								{dog.age} yrs
							</span>
							<span className="bg-gradient-to-r from-highland to-sark text-honeydew text-xs font-poppins font-bold px-3 py-1 rounded-full shadow-md">
								{dog.breed || "Unknown breed"}
							</span>
						</div>
						<div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-highland to-sark text-honeydew text-xs font-poppins font-bold px-3 py-1 rounded-full shadow-md">
							{dog.gender}
						</div>
						<div className="w-full h-full flex items-center justify-center">
							{dog.image ? (
								<img
									className="w-full h-full object-cover"
									src={
										process.env.REACT_APP_LOCAL +
										dog.image
									}
									alt={dog.name}
								/>
							) : (
								<FontAwesomeIcon
									icon={faImage}
									className="text-4xl text-oxfordBlue/40"
								/>
							)}
						</div>
						<div className="absolute left-3 bottom-3 z-10">
							<div className="backdrop-blur-md bg-oxfordBlue/45 border border-honeydew/20 rounded-xl px-3 py-1.5 shadow-md">
								<h2 className="font-delius font-bold text-xl text-honeydew leading-tight">
									{getDogName(dog.name)}
								</h2>
							</div>
						</div>
					</div>

					<div className="p-5 md:p-6 flex-1 flex flex-col">
						{traitPills.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-5">
								{traitPills.map((trait) => (
									<span
										key={trait.id}
										className="text-xs font-poppins font-semibold px-3 py-1 rounded-full bg-highland/20 text-oxfordBlue border border-highland/40"
									>
										{trait.label}
									</span>
								))}
							</div>
						)}

						<div className="mt-auto pt-4 border-t border-oxfordBlue/20">
							<button
								type="button"
								onClick={() => setShowContactModal(true)}
								className="btn-primary w-full px-6 py-3 text-base"
							>
								<FontAwesomeIcon icon={faHeart} className="mr-2 text-lg" />
								Adopt Me
							</button>
						</div>
					</div>
				</div>
			</div>

			<KennelModal
				isOpen={showContactModal}
				onClose={() => setShowContactModal(false)}
				dog={dog}
			/>
		</>
	);
};

export default AdoptionCard;
