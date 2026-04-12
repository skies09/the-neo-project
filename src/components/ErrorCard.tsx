import React from "react";
import { Link } from "react-router-dom";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const contactHereLinkClass =
	"font-semibold text-highland underline decoration-highland/40 underline-offset-2 transition-colors hover:text-sark";

export interface RefreshContactSubtitleProps {
	/** Merged with default spacing and typography */
	className?: string;
}

/**
 * Shared “refresh + contact here” copy used on blog/dogs error-style cards.
 */
export const RefreshContactSubtitle: React.FC<RefreshContactSubtitleProps> = ({
	className = "",
}) => (
	<div
		className={`mx-auto flex flex-col text-center font-poppins text-oxfordBlue/80 md:text-lg ${className}`.trim()}
	>
		<p className="leading-relaxed">
			Please refresh the page or try again in a few minutes.
		</p>
		<p className="leading-relaxed">
			If you are still having issues, you can contact us{" "}
			<Link to="/contact" className={contactHereLinkClass}>
				here
			</Link>
			.
		</p>
	</div>
);

export interface ErrorCardProps {
	icon?: IconDefinition;
	title: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
	/** Extra classes on the outer card (e.g. max-w-2xl mx-auto) */
	className?: string;
	cardPaddingClass?: string;
	titleClassName?: string;
}

/**
 * Gradient card for errors and empty states: optional FA icon, title, body, optional footer actions.
 */
export const ErrorCard: React.FC<ErrorCardProps> = ({
	icon,
	title,
	children,
	footer,
	className = "",
	cardPaddingClass = "px-6 py-9 sm:px-3 sm:py-6",
	titleClassName = "font-delius text-xl font-bold text-oxfordBlue sm:text-2xl",
}) => (
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
			<div className="w-full max-w-lg mb-2">{children}</div>
			{footer != null ? <div className="w-full">{footer}</div> : null}
		</div>
	</div>
);
