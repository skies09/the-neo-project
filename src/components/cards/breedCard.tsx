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

interface BreedCardProps {
	breed: Breed;
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
	const sizeLabel =
		breed.size && String(breed.size).trim()
			? getSizeDisplayName(String(breed.size))
			: null;

	return (
		<Link
			to={to}
			state={state}
			aria-label={label}
			className="group block w-full min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highland focus-visible:ring-offset-2 focus-visible:ring-offset-mintCream"
		>
			<article className="relative aspect-[4/3] w-full rounded-2xl border border-oxfordBlue/10 bg-tomThumb shadow-[0_8px_32px_rgba(11,37,69,0.1)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-oxfordBlue/15 hover:shadow-[0_14px_44px_rgba(11,37,69,0.14)]">
				<div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
					<div className="absolute inset-0">
						{breed.portrait_image ? (
							<img
								src={breed.portrait_image}
								alt=""
								className="h-full w-full border-0 object-cover object-center transition duration-700 ease-out group-hover:scale-[1.06]"
							/>
						) : (
							<div
								className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sprout via-tara to-mintCream"
								aria-hidden="true"
							>
								<FontAwesomeIcon
									icon={faDog}
									className="text-[3.25rem] text-highland/35 sm:text-6xl"
								/>
							</div>
						)}
					</div>

					{/* Neutral dark scrim — inside same clipped stack as photo */}
					<div
						className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/55 via-black/20 to-transparent"
						aria-hidden="true"
					/>
				</div>

				{/* Group — dark green pill (decorative; whole card is the link) */}
				<span
					className="pointer-events-none absolute right-3 top-3 z-10 max-w-[min(calc(100%-5rem),12rem)] truncate rounded-full bg-tomThumb px-3 py-1.5 text-center font-poppins text-[10px] font-semibold uppercase tracking-wide text-[#ffffff] shadow-md sm:right-4 sm:top-4 sm:max-w-[13rem] sm:px-3.5 sm:py-2 sm:text-[11px]"
					title={breed.group}
					aria-hidden="true"
				>
					{breed.group}
				</span>

				{showMatch && (
					<div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
						<span className="inline-block rounded-lg bg-sunset px-2.5 py-1 text-[11px] font-bold tabular-nums text-oxfordBlue sm:text-xs">
							{Math.round(calculatorMatch)}% match
						</span>
					</div>
				)}

				<div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4 pb-14 pt-10 sm:p-5 sm:pb-16">
					{/*
					  Duplicate photo + CSS filter:blur (not backdrop-filter) so the fuzzy image
					  always fills the title strip; in-flow title sets height, blur layer matches inset-0.
					*/}
					<div className="relative w-full min-w-0 overflow-hidden rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
						{breed.portrait_image ? (
							<img
								src={breed.portrait_image}
								alt=""
								aria-hidden
								className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-bottom scale-110 object-cover object-bottom"
								style={{ filter: "blur(14px)" }}
							/>
						) : (
							<div
								className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-sprout/70 via-tara/50 to-transparent"
								aria-hidden
							/>
						)}
						<div className="relative z-10 bg-white/[0.32] px-3 py-2 text-center sm:px-3.5 sm:py-2.5">
							<h2
								className="line-clamp-2 font-delius text-xl font-bold leading-snug text-[#0a0a0a] sm:text-2xl"
								title={breed.breed}
							>
								{breed.breed}
							</h2>
						</div>
					</div>
					{sizeLabel && (
						<p className="mt-2 text-center font-poppins text-xs text-[#0a0a0a]/75 sm:text-sm">
							{sizeLabel}
						</p>
					)}

					<span
						className="pointer-events-none absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-oxfordBlue/12 bg-honeydew px-3 py-2 font-poppins text-sm font-semibold text-oxfordBlue shadow-[0_2px_12px_rgba(11,37,69,0.2)] transition duration-300 group-hover:border-highland/25 group-hover:bg-[#ffffff] group-hover:shadow-[0_4px_16px_rgba(11,37,69,0.22)] sm:bottom-4 sm:right-4"
						aria-hidden="true"
					>
						View
						<FontAwesomeIcon
							icon={faChevronRight}
							className="text-xs text-highland transition duration-300 group-hover:translate-x-0.5"
						/>
					</span>
				</div>
			</article>
		</Link>
	);
};

export default BreedCard;
