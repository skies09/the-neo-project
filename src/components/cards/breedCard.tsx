import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faDog } from "@fortawesome/free-solid-svg-icons";
import { Breed } from "../../services/api";
import { breedDetailPath } from "../../helpers/breedRoutes";

export interface BreedCardLinkState {
	matchRate?: number;
}

interface BreedCardProps {
	breed: Breed;
	/** When set, passed to the detail page (e.g. breed calculator match %). */
	calculatorMatch?: number | null;
}

const BreedCard = ({ breed, calculatorMatch }: BreedCardProps) => {
	const showMatch =
		calculatorMatch != null && Number.isFinite(calculatorMatch);
	const to = breedDetailPath(breed.breed);
	const state: BreedCardLinkState | undefined = showMatch
		? { matchRate: calculatorMatch }
		: undefined;

	const label = `View details for ${breed.breed}, ${breed.group}`;

	return (
		<Link
			to={to}
			state={state}
			aria-label={label}
			className="group block w-full max-w-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highland focus-visible:ring-offset-2"
		>
			<article className="overflow-hidden rounded-3xl border border-oxfordBlue/10 bg-oxfordBlue shadow-[0_8px_30px_rgba(11,37,69,0.08)] transition duration-300 hover:-translate-y-1 hover:border-highland/25 hover:shadow-[0_16px_40px_rgba(11,37,69,0.12)]">
				<div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-tara to-sprout/60">
					{breed.portrait_image ? (
						<img
							src={breed.portrait_image}
							alt=""
							className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
						/>
					) : (
						<div className="flex h-full items-center justify-center">
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-highland to-tomThumb shadow-lg">
								<FontAwesomeIcon
									icon={faDog}
									className="text-3xl text-sunset"
								/>
							</div>
						</div>
					)}
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-oxfordBlue/75 via-oxfordBlue/15 to-transparent" />

					{/* Group — top-left soft frosted chip */}
					<span
						className="pointer-events-none absolute left-3 top-3 z-[2] inline-flex max-w-[min(100%,11rem)] items-center truncate rounded-xl border border-honeydew/15 bg-oxfordBlue/45 px-3 py-1.5 font-poppins text-[10px] font-bold uppercase tracking-wider text-honeydew/90 shadow-md shadow-black/25 backdrop-blur-md backdrop-saturate-100 sm:left-4 sm:top-4 sm:max-w-[13rem] sm:text-xs"
						aria-hidden="true"
						title={breed.group}
					>
						{breed.group}
					</span>

					{showMatch && (
						<div className="absolute right-3 top-3 z-[2] rounded-full border border-oxfordBlue/30 bg-gradient-to-r from-highland/80 to-sark/80 px-3 py-1 text-xs font-bold text-honeydew/95 shadow-md shadow-black/20 backdrop-blur-sm sm:right-4 sm:top-4">
							{Math.round(calculatorMatch)}% match
						</div>
					)}

					<div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-3 sm:p-4">
						{/* Glass panel — breed name (blur + tint so the photo reads through) */}
						<div
							className="max-w-[min(100%,18rem)] rounded-2xl border border-white/18 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-oxfordBlue/[0.48] p-3 shadow-[0_10px_36px_rgba(11,37,69,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-lg backdrop-saturate-100 sm:p-3.5"
							aria-hidden="true"
						>
							<p className="font-delius text-lg font-bold leading-snug text-honeydew drop-shadow-[0_1px_3px_rgba(11,37,69,0.65)] sm:text-xl md:text-2xl">
								{breed.breed}
							</p>
						</div>

						{/* View — bottom-right */}
						<span
							className="pointer-events-none mb-0.5 inline-flex flex-shrink-0 items-center gap-1.5 self-end rounded-full border border-honeydew/12 bg-oxfordBlue/45 px-3.5 py-2 font-poppins text-xs font-bold uppercase tracking-wide text-honeydew/90 shadow-md shadow-black/25 backdrop-blur-md backdrop-saturate-100 sm:px-4 sm:py-2.5 sm:text-sm"
							aria-hidden="true"
						>
							View
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-[10px] opacity-90 transition duration-300 group-hover:translate-x-0.5 sm:text-xs"
							/>
						</span>
					</div>
				</div>
			</article>
		</Link>
	);
};

export default BreedCard;
