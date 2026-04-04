import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faDog,
	faFileLines,
	faGraduationCap,
	faHeart,
	faHome,
	faInfoCircle,
	faPaw,
	faRuler,
	faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import { breedsAPI, Breed } from "../../services/api";
import { getSizeDisplayName } from "../../helpers/sizeUtils";
import {
	parseTraitPercent,
	stringifyTraitValue,
} from "../../helpers/breedTraitDisplay";
import PawLoading from "../../components/PawLoading";

type LocationState = { matchRate?: number } | null;

/** Remove a leading "In depth" line often bundled with API long_description. */
function stripLeadingInDepthHeading(text: string): string {
	const lines = text.split(/\r?\n/);
	if (lines.length === 0) return text;
	const first = lines[0].trim();
	if (/^#{0,6}\s*in\s+depth\s*#*$/i.test(first)) {
		return lines.slice(1).join("\n").replace(/^\s+/, "");
	}
	return text;
}

function FactCard({
	label,
	value,
	icon,
}: {
	label: string;
	value: string;
	icon: typeof faRuler;
}) {
	return (
		<div className="flex gap-4 rounded-2xl border border-oxfordBlue/10 bg-white p-5 shadow-sm">
			<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sprout/80 text-highland">
				<FontAwesomeIcon icon={icon} className="text-lg" />
			</div>
			<div className="min-w-0">
				<p className="font-poppins text-xs font-semibold uppercase tracking-wide text-ink-muted">
					{label}
				</p>
				<p className="mt-1 font-poppins text-lg font-semibold text-oxfordBlue">
					{value}
				</p>
			</div>
		</div>
	);
}

/** Plain text trait when the API returns a label, not a number. */
function TraitTextCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-xl border border-oxfordBlue/10 bg-mintCream/80 px-4 py-3">
			<p className="font-poppins text-xs font-medium text-ink-muted">{label}</p>
			<p className="mt-0.5 font-poppins text-sm font-semibold text-oxfordBlue">
				{value}
			</p>
		</div>
	);
}

function TraitPercentMeter({ label, percent }: { label: string; percent: number }) {
	const id = React.useId();
	return (
		<div className="rounded-xl border border-oxfordBlue/10 bg-mintCream/80 px-4 py-3">
			<div className="flex items-baseline justify-between gap-2">
				<p
					className="font-poppins text-xs font-medium text-ink-muted"
					id={`${id}-label`}
				>
					{label}
				</p>
				<p
					className="font-poppins text-sm font-bold tabular-nums text-highland"
					aria-hidden="true"
				>
					{percent}%
				</p>
			</div>
			<div
				className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-oxfordBlue/10"
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={percent}
				aria-valuetext={`${percent} percent`}
				aria-labelledby={`${id}-label`}
			>
				<div
					className="h-full rounded-full bg-gradient-to-r from-highland to-sark transition-[width] duration-500 ease-out"
					style={{ width: `${percent}%` }}
				/>
			</div>
		</div>
	);
}

function TraitDisplayRow({ label, value }: { label: string; value: unknown }) {
	const pct = parseTraitPercent(value);
	if (pct !== null) {
		return <TraitPercentMeter label={label} percent={pct} />;
	}
	return (
		<TraitTextCard label={label} value={stringifyTraitValue(value)} />
	);
}

function Section({
	title,
	icon,
	children,
}: {
	title: string;
	icon: typeof faPaw;
	children: React.ReactNode;
}) {
	return (
		<section className="scroll-mt-24">
			<h2 className="mb-4 flex items-center gap-3 font-delius text-2xl font-bold text-oxfordBlue md:text-3xl">
				<span className="flex h-10 w-10 items-center justify-center rounded-full bg-highland/15 text-highland">
					<FontAwesomeIcon icon={icon} className="text-lg" />
				</span>
				{title}
			</h2>
			<div className="rounded-3xl border border-oxfordBlue/10 bg-white/90 p-6 shadow-sm md:p-8">
				{children}
			</div>
		</section>
	);
}

export default function BreedDetailPage() {
	const { breedSlug } = useParams<{ breedSlug: string }>();
	const location = useLocation();
	const navigate = useNavigate();
	const state = location.state as LocationState;
	const calculatorMatch =
		state && typeof state.matchRate === "number" && Number.isFinite(state.matchRate)
			? state.matchRate
			: null;

	const [breed, setBreed] = useState<Breed | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const rawSlug = breedSlug?.trim() ?? "";
	const breedName = (() => {
		if (!rawSlug) return "";
		try {
			return decodeURIComponent(rawSlug);
		} catch {
			return rawSlug;
		}
	})();

	useEffect(() => {
		if (!breedName.trim()) {
			setError("Missing breed name.");
			setLoading(false);
			return;
		}

		let cancelled = false;
		setLoading(true);
		setError(null);

		breedsAPI
			.getBreedDetails(breedName)
			.then((data) => {
				if (!cancelled) {
					setBreed(data);
				}
			})
			.catch(() => {
				if (!cancelled) {
					setError(
						"We couldn’t load this breed. It may have been removed or the name may be incorrect.",
					);
					setBreed(null);
				}
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [breedName]);

	if (loading) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-mintCream pt-20">
				<p className="mb-4 font-poppins text-lg text-oxfordBlue">
					Loading breed…
				</p>
				<PawLoading />
			</div>
		);
	}

	if (error || !breed) {
		return (
			<div className="min-h-screen bg-mintCream px-4 pb-16 pt-24">
				<div className="mx-auto max-w-lg text-center">
					<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sark/20 text-sark">
						<FontAwesomeIcon icon={faDog} className="text-2xl" />
					</div>
					<h1 className="font-delius text-3xl font-bold text-oxfordBlue">
						Breed not found
					</h1>
					<p className="mt-3 font-poppins text-ink-muted">{error}</p>
					<Link
						to="/breeds"
						className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-highland to-sark px-8 py-3 font-fredoka font-semibold text-honeydew shadow-lg transition hover:opacity-95"
					>
						<FontAwesomeIcon icon={faArrowLeft} />
						Back to breeds
					</Link>
				</div>
			</div>
		);
	}

	const heroImage =
		breed.landscape_image || breed.portrait_image || null;

	const physicalFacts = [
		breed.lifespan && {
			label: "Typical lifespan",
			value: breed.lifespan,
			icon: faHeart,
		},
		breed.height && { label: "Height", value: breed.height, icon: faRuler },
		breed.weight && {
			label: "Weight",
			value: breed.weight,
			icon: faWeightHanging,
		},
	].filter(Boolean) as Array<{
		label: string;
		value: unknown;
		icon: typeof faRuler;
	}>;

	const temperament = [
		["Friendliness", breed.friendliness],
		["Family friendly", breed.family_friendly],
		["Good with children", breed.child_friendly],
		["Good with other pets", breed.pet_friendly],
		["Stranger friendly", breed.stranger_friendly],
		["Playfulness", breed.playfulness],
	].filter(
		([, v]) => v !== null && v !== undefined && v !== "",
	) as [string, unknown][];

	const care = [
		["Easy to groom", breed.easy_to_groom],
		["Easy to train", breed.easy_to_train],
		["Energy level", breed.energy_levels],
		["Shedding", breed.shedding_amount],
		["Barking / howling", breed.barks_howls],
	].filter(
		([, v]) => v !== null && v !== undefined && v !== "",
	) as [string, unknown][];

	const living = [
		["Apartment-friendly", breed.apartment_dog],
		["OK home alone", breed.can_be_alone],
		["Busy owners", breed.good_for_busy_owners],
		["New dog owners", breed.good_for_new_owners],
		["Watchdog / guard", breed.guard_dog],
	].filter(
		([, v]) => v !== null && v !== undefined && v !== "",
	) as [string, unknown][];

	const healthScorePct = breed.health
		? parseTraitPercent(breed.health)
		: null;

	return (
		<div className="min-h-screen bg-mintCream pb-20 pt-16">
			{/* Hero — name bar centered, half on image / half on page */}
			<div className="relative mb-8 sm:mb-10">
				<div className="relative h-[min(52vh,420px)] min-h-[240px] w-full overflow-hidden bg-gradient-to-br from-highland via-sark to-tomThumb">
					{heroImage ? (
						<img
							src={heroImage}
							alt=""
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full items-center justify-center">
							<FontAwesomeIcon
								icon={faDog}
								className="text-8xl text-honeydew/30"
							/>
						</div>
					)}
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-oxfordBlue/90 via-oxfordBlue/25 to-transparent" />
					{/* Group — same dark green pill as breed cards */}
					<div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4 md:right-5 md:top-5">
						<span className="inline-flex max-w-[min(calc(100vw-2.5rem),16rem)] rounded-full bg-tomThumb px-3 py-1.5 font-poppins text-[10px] font-semibold uppercase leading-tight tracking-wide text-[#ffffff] shadow-md sm:max-w-xs sm:px-3.5 sm:py-2 sm:text-[11px]">
							<span className="line-clamp-2 break-words text-center">
								{breed.group}
							</span>
						</span>
					</div>
					{(breed.size || calculatorMatch != null) && (
						<div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8 pt-24">
							<div className="mx-auto max-w-4xl">
								<div className="flex flex-wrap gap-2">
									{breed.size && (
										<span className="rounded-full bg-highland/90 px-4 py-1.5 font-poppins text-sm font-semibold text-honeydew">
											{getSizeDisplayName(breed.size)}
										</span>
									)}
									{calculatorMatch != null && (
										<span className="rounded-full bg-sunset/95 px-4 py-1.5 font-poppins text-sm font-bold text-oxfordBlue">
											Your match: {Math.round(calculatorMatch)}%
										</span>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="absolute left-0 right-0 top-full z-20 flex -translate-y-1/2 justify-center px-4">
					<div className="w-fit max-w-[min(100%,calc(100vw-2rem))] rounded-full border border-oxfordBlue/12 bg-honeydew/95 px-8 py-3.5 text-center shadow-[0_16px_48px_rgba(11,37,69,0.2)] backdrop-blur-md sm:px-12 sm:py-4 md:px-14 md:py-5">
						<motion.h1
							className="break-words text-center font-delius text-3xl font-bold leading-tight tracking-tight text-oxfordBlue sm:text-4xl md:text-5xl lg:text-6xl"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45 }}
						>
							{breed.breed}
						</motion.h1>
					</div>
				</div>
			</div>

			<div className="relative z-10 mx-auto max-w-4xl px-4 pt-10 sm:pt-14">
				<button
					type="button"
					onClick={() => navigate(-1)}
					className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border-2 border-oxfordBlue/15 bg-white px-5 py-2.5 font-poppins text-sm font-semibold text-oxfordBlue shadow-sm transition hover:border-highland/35 hover:bg-mintCream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highland focus-visible:ring-offset-2"
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					Back
				</button>
				<div className="flex flex-col gap-14">
					{physicalFacts.length > 0 && (
						<div>
							<h2 className="mb-4 font-delius text-2xl font-bold text-oxfordBlue md:text-3xl">
								At a glance
							</h2>
							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{physicalFacts.map((f) => (
									<FactCard
										key={f.label}
										label={f.label}
										value={stringifyTraitValue(f.value)}
										icon={f.icon}
									/>
								))}
							</div>
						</div>
					)}

					{breed.long_description && (
						<section>
							<h2 className="mb-4 flex items-center gap-3 font-delius text-2xl font-bold text-oxfordBlue md:text-3xl">
								<span className="flex h-10 w-10 items-center justify-center rounded-full bg-sprout text-highland">
									<FontAwesomeIcon icon={faInfoCircle} />
								</span>
								About this breed
							</h2>
							<div className="rounded-3xl border border-oxfordBlue/10 bg-white p-6 shadow-sm md:p-8">
								<p className="whitespace-pre-wrap font-poppins text-base leading-relaxed text-ink-muted md:text-lg">
									{stripLeadingInDepthHeading(breed.long_description)}
								</p>
							</div>
						</section>
					)}

					{temperament.length > 0 && (
						<Section title="Temperament & personality" icon={faHeart}>
							<div className="grid gap-3 sm:grid-cols-2">
								{temperament.map(([label, value]) => (
									<TraitDisplayRow key={label} label={label} value={value} />
								))}
							</div>
						</Section>
					)}

					{care.length > 0 && (
						<Section title="Care & training" icon={faGraduationCap}>
							<div className="grid gap-3 sm:grid-cols-2">
								{care.map(([label, value]) => (
									<TraitDisplayRow key={label} label={label} value={value} />
								))}
							</div>
						</Section>
					)}

					{living.length > 0 && (
						<Section title="Home & lifestyle fit" icon={faHome}>
							<div className="grid gap-3 sm:grid-cols-2">
								{living.map(([label, value]) => (
									<TraitDisplayRow key={label} label={label} value={value} />
								))}
							</div>
						</Section>
					)}

					{breed.health && (
						<Section title="Health" icon={faHeart}>
							<div>
								<h3 className="mb-2 font-poppins text-sm font-semibold text-oxfordBlue">
									General health
								</h3>
								{healthScorePct !== null ? (
									<TraitPercentMeter
										label="Compared with other breeds"
										percent={healthScorePct}
									/>
								) : (
									<p className="font-poppins leading-relaxed text-ink-muted">
										{breed.health}
									</p>
								)}
							</div>
						</Section>
					)}

					{breed.health_concerns && (
						<Section title="Extra information" icon={faFileLines}>
							<p className="whitespace-pre-wrap font-poppins leading-relaxed text-ink-muted">
								{breed.health_concerns}
							</p>
						</Section>
					)}

					<p className="mt-6 border-t border-oxfordBlue/10 pt-8 text-center font-poppins text-sm text-ink-muted">
						Something look off?{" "}
						<Link
							to="/contact"
							className="font-semibold text-highland underline decoration-highland/30 underline-offset-2 transition hover:text-oxfordBlue hover:decoration-oxfordBlue/40"
						>
							Report an issue with this breed’s data
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
