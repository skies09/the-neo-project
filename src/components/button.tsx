import { motion } from "framer-motion";

interface ButtonProps {
	text: string;
	className?: string;
	active?: boolean;
	action?: string;
}

export default function Button({ text, className, active = true, action }: ButtonProps) {
	const handleClick = (page: string | undefined) => {
		window.location.href = "#" + page;
	};

	return (
		<>
			{active && (
				<motion.button
					whileTap={{ scale: 0.9 }}
					whileHover={{
						scale: 1.1,
						backgroundColor: "#003459",
						color: "#F9F9F9",
						border: "solid #007EA7 2px",
					}}
					transition={{ bounceDamping: 10, bounceStiffness: 600 }}
					className={className}
					onClick={() => handleClick(action)}
				>
					{text}
				</motion.button>
			)}
		</>
	);
}
