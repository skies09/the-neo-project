import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faDog } from "@fortawesome/free-solid-svg-icons";
import { Breed } from "../../services/api";
import { breedDetailPath } from "../../helpers/breedRoutes";
import { getSizeDisplayName } from "../../helpers/sizeUtils";

export interface BreedCardLinkState {
	matchRate?: number;
}

/** Fixed card height — image uses 2/3, bottom strip 1/3 (flex-[2] : flex-1). */
const CARD_HEIGHT = "h-[16.5rem] sm:h-[18.5rem] md:h-[18rem]";

interface BreedCardProps {
	breed: Breed;
	calculatorMatch?: number | null;
}

const BreedCard = ({ breed, calculatorMatch }: BreedCardProps) => {
	const showMatch =
		calculatorMatch != null && Number.isFinite(calculatorMatch);
	const groupPillMaxClass = showMatch
		? "max-w-[calc(50%-0.625rem)] sm:max-w-[calc(50%-0.75rem)]"
		: "max-w-[min(calc(100%-5rem),12rem)] sm:max-w-[13rem]";
	const to = breedDetailPath(breed.breed);
	const state: BreedCardLinkState | undefined = showMatch
		? { matchRate: calculatorMatch }
		: undefined;

	const sizeLabel =
		breed.size && String(breed.size).trim()
			? getSizeDisplayName(String(breed.size))
			: null;
	const label = `View details for ${breed.breed}, ${breed.group}${
		sizeLabel ? `, ${sizeLabel}` : ""
	}`;

	return (
		<Link
			to={to}
			state={state}
			aria-label={label}
			className="group block w-full min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highland focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
		>
			<article
				className={`relative flex w-full flex-col overflow-hidden rounded-2xl border-2 border-highland/45 bg-gradient-to-b from-honeydew via-mintCream to-mintCream shadow-[0_10px_36px_rgba(11,37,69,0.08)] ring-1 ring-highland/10 transition duration-300 ease-out group-hover:border-highland/55 group-hover:shadow-[0_16px_44px_rgba(11,37,69,0.12)] group-hover:ring-highland/20 ${CARD_HEIGHT}`}
			>
				{/* Top 2/3 — photo only (no scrim / no extra dark band under the image) */}
				<div className="relative min-h-0 flex-[2] overflow-hidden bg-gradient-to-b from-mintCream to-tara/40">
					{breed.portrait_image ? (
						<img
							src={breed.portrait_image}
							alt=""
							className="h-full w-full border-0 object-cover object-center transition duration-500 ease-out group-hover:scale-[1.04]"
						/>
					) : (
						<div
							className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sprout/50 via-tara to-mintCream"
							aria-hidden="true"
						>
							<FontAwesomeIcon
								icon={faDog}
								className="text-[3.25rem] text-highland/40 sm:text-6xl"
							/>
						</div>
					)}

					<span
						className={`pointer-events-none absolute right-3 top-3 z-10 inline-block max-w-full truncate rounded-full bg-gradient-to-r from-highland to-sark px-3.5 py-2 text-center font-poppins text-xs font-bold tracking-wide text-honeydew shadow-md ring-1 ring-honeydew/25 sm:right-4 sm:top-4 sm:px-4 sm:py-2.5 sm:text-sm ${groupPillMaxClass}`}
						title={breed.group}
						aria-hidden="true"
					>
						{breed.group}
					</span>

					{showMatch && (
						<div className="pointer-events-none absolute left-3 top-3 z-10 max-w-[calc(50%-0.625rem)] sm:left-4 sm:top-4 sm:max-w-[calc(50%-0.75rem)]">
							<span
								className="inline-block w-full truncate rounded-full bg-gradient-to-r from-highland to-sark px-3.5 py-2 text-center font-poppins text-xs font-bold tracking-wide text-honeydew shadow-md ring-1 ring-honeydew/25 tabular-nums normal-case sm:px-4 sm:py-2.5 sm:text-sm"
								title={`${Math.round(calculatorMatch)}% match`}
							>
								{Math.round(calculatorMatch)}% match
							</span>
						</div>
					)}
				</div>

				{/* Bottom 1/3 — mint→sprout→bayleaf strip (View is absolutely positioned so name layer does not cover it) */}
				<div className="relative z-[5] min-h-0 w-full flex-1 bg-[linear-gradient(180deg,rgba(244,253,243,0.92)_0%,#EAFAEA_14%,#CAE0BC_46%,#84AE92_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-12px_32px_rgba(11,37,69,0.07)] transition-[filter,box-shadow] duration-300 ease-out group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.62),inset_0_-14px_36px_rgba(11,37,69,0.09)] group-hover:brightness-[1.02]" />

				{/* Name: half on image, half on the green strip — centred on the seam only */}
				<div className="absolute inset-x-0 top-[calc(100%*2/3)] z-20 flex -translate-y-1/2 justify-center px-1.5 sm:px-2">
					<div className="w-max max-w-[calc(100%-0.75rem)] rounded-3xl border-2 border-highland/50 bg-honeydew px-3 py-1.5 text-center shadow-[0_8px_28px_rgba(11,37,69,0.12)] ring-1 ring-white/70 backdrop-blur-sm sm:px-4 sm:py-2">
						<div className="flex flex-col items-center gap-0.5">
							<h2 className="w-full text-center font-delius text-lg font-bold leading-snug tracking-tight text-oxfordBlue sm:text-xl md:text-2xl">
								<span className="inline-block max-w-full break-words text-balance">
									{breed.breed}
								</span>
							</h2>
							{sizeLabel ? (
								<p className="w-full text-center font-poppins text-xs font-semibold text-sark sm:text-sm">
									{sizeLabel}
								</p>
							) : null}
						</div>
					</div>
				</div>

				<span
					className="absolute bottom-2 right-3 z-30 inline-flex items-center gap-1.5 rounded-full border border-oxfordBlue/12 bg-honeydew/95 px-3 py-1 font-fredoka text-base font-semibold text-oxfordBlue shadow-md ring-1 ring-white/60 transition duration-300 group-hover:border-highland/40 group-hover:bg-white group-hover:shadow-lg sm:bottom-3 sm:right-4 sm:px-3 sm:py-1"
					aria-hidden="true"
				>
					View
					<FontAwesomeIcon
						icon={faChevronRight}
						className="text-sm text-highland transition duration-300 group-hover:translate-x-0.5"
					/>
				</span>
			</article>
		</Link>
	);
};

export default BreedCard;
