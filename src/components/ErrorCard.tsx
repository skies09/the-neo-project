import React from "react";
import { Link } from "react-router-dom";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Preset actions rendered with shared card button styles. */
export type ErrorCardButton =
	| { type: "home" }
	| { type: "blogIndex" }
	| { type: "goBack"; onClick: () => void };

export interface ErrorCardProps {
	icon?: IconDefinition;
	title: React.ReactNode;
	/** Refresh + contact copy under the title. */
	showSubtitle?: boolean;
	/** Extra classes on the subtitle block. */
	subtitleClassName?: string;
	/** Optional supporting line under the title (e.g. short empty-state note). */
	detail?: string;
	/** Which preset buttons to show, in order. */
	buttons?: ErrorCardButton[];
	/** Extra classes on the outer card (e.g. max-w-2xl mx-auto) */
	className?: string;
	cardPaddingClass?: string;
	titleClassName?: string;
}

/**
 * Gradient card for fetch errors and similar states: icon, title, optional refresh/contact subtitle, optional detail line, preset actions.
 */
export const ErrorCard: React.FC<ErrorCardProps> = ({
	icon,
	title,
	showSubtitle = false,
	subtitleClassName = "",
	detail,
	buttons,
	className = "",
	cardPaddingClass = "px-4 sm:px-6 py-8",
	titleClassName = "font-delius text-xl font-bold text-oxfordBlue sm:text-2xl",
}) => {
	const actions = buttons ?? [];
	const hasActions = actions.length > 0;
	const hasDetail = detail != null && detail.length > 0;

	const renderActionButton = (
		button: ErrorCardButton,
		index: number,
	): React.ReactNode => {
		switch (button.type) {
			case "home":
				return (
					<Link
						key={index}
						to="/"
						className="btn-primary inline-flex items-center justify-center px-8 py-3"
					>
						Back to home
					</Link>
				);
			case "blogIndex":
				return (
					<Link
						key={index}
						to="/blog"
						className="btn-secondary inline-flex items-center justify-center px-6 py-3"
					>
						View All Posts
					</Link>
				);
			case "goBack":
				return (
					<button
						key={index}
						type="button"
						onClick={button.onClick}
						className="btn-primary px-6 py-3"
					>
						Go Back
					</button>
				);
		}
	};

	return (
		<div
			className={`w-full rounded-2xl border-2 border-oxfordBlue/10 bg-gradient-to-br from-tara to-mintCream text-center shadow-xl ${cardPaddingClass} ${className}`.trim()}
		>
			<div className="flex flex-col items-center gap-3">
				{icon != null && (
					<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-highland to-sark shadow-lg">
						<FontAwesomeIcon
							icon={icon}
							className="text-2xl text-honeydew"
							aria-hidden
						/>
					</div>
				)}
				<h2
					className={`w-full max-w-lg px-1 leading-snug ${titleClassName}`}
				>
					{title}
				</h2>
				{(showSubtitle || hasDetail) && (
					<div className="mb-2 flex w-full max-w-lg flex-col gap-3">
						{showSubtitle && (
							<div
								className={`mx-auto w-full text-center font-poppins text-oxfordBlue/80 md:text-lg ${subtitleClassName.trim()}`.trim()}
							>
								<p className="w-full leading-relaxed">
									Please refresh the page or try again in a
									few minutes.
								</p>
								<p className="w-full leading-relaxed">
									If you are still having issues, you can
									contact us{" "}
									<Link
										to="/contact"
										className="font-semibold text-highland underline decoration-highland/40 underline-offset-2 transition-colors hover:text-sark"
									>
										here
									</Link>
									.
								</p>
							</div>
						)}
						{hasDetail ? (
							<p className="font-poppins leading-relaxed text-oxfordBlue/80 md:text-lg">
								{detail}
							</p>
						) : null}
					</div>
				)}
				{hasActions ? (
					<div
						className={
							actions.length > 1
								? "flex w-full flex-col justify-center gap-4 sm:flex-row sm:flex-wrap"
								: "flex w-full justify-center"
						}
					>
						{actions.map((b, i) => renderActionButton(b, i))}
					</div>
				) : null}
			</div>
		</div>
	);
};
