import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckCircle,
	faExclamationTriangle,
	faInfoCircle,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
	id: string;
	type: ToastType;
	title: string;
	message: string;
	onClose: (id: string) => void;
	duration?: number;
}

const Toast: React.FC<ToastProps> = ({
	id,
	type,
	title,
	message,
	onClose,
	duration = 5000,
}) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose(id);
		}, duration);

		return () => clearTimeout(timer);
	}, [id, duration, onClose]);

	const getIcon = () => {
		switch (type) {
			case "success":
				return faCheckCircle;
			case "error":
				return faExclamationTriangle;
			case "warning":
				return faExclamationTriangle;
			case "info":
				return faInfoCircle;
			default:
				return faInfoCircle;
		}
	};

	const getIconColor = () => {
		switch (type) {
			case "success":
				return "text-oxfordBlue";
			case "error":
				return "text-red-500";
			case "warning":
				return "text-yellow-500";
			case "info":
				return "text-blue-500";
			default:
				return "text-oxfordBlue";
		}
	};

	const getBgColor = () => {
		switch (type) {
			case "success":
				return "bg-sprout border-oxfordBlue";
			case "error":
				return "bg-sprout border-red-200";
			case "warning":
				return "bg-yellow-50 border-yellow-200";
			case "info":
				return "bg-blue-50 border-blue-200";
			default:
				return "bg-sprout border-oxfordBlue";
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 300, scale: 0.3 }}
			animate={{ opacity: 1, x: 0, scale: 1 }}
			exit={{ opacity: 0, x: 300, scale: 0.5 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className={`${getBgColor()} border rounded-2xl shadow-xl p-4 max-w-sm w-full backdrop-blur-sm`}
		>
			<div className="flex items-start space-x-3">
				<div className={`flex-shrink-0 ${getIconColor()}`}>
					<FontAwesomeIcon
						icon={getIcon()}
						className="text-xl text-tomThumb"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between">
						<h4 className="text-sm font-semibold text-oxfordBlue font-poppins">
							{title}
						</h4>
						<button
							onClick={() => onClose(id)}
							className="flex-shrink-0 ml-2 text-oxfordBlue font-poppins transition-colors"
						>
							<FontAwesomeIcon
								icon={faTimes}
								className="text-sm text-oxford"
							/>
						</button>
					</div>
					<p className="text-sm text-oxfordBlue font-poppins mt-1">
						{message}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default Toast;
