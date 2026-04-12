import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream px-4 pb-20 pt-28">
			<motion.div
				className="mx-auto max-w-xl text-center"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45, ease: "easeOut" }}
			>
				<p className="mb-2 font-poppins text-6xl font-bold text-highland/90 md:text-7xl">
					404
				</p>
				<h1 className="mb-4 font-delius text-2xl font-bold text-oxfordBlue md:text-3xl">
					Page not found
				</h1>
				<p className="mb-8 font-poppins text-oxfordBlue/80 md:text-lg">
					The page you are looking for does not exist, or the link may
					be out of date. Check the address or head back to the home
					page.
				</p>
				<div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
					<Link
						to="/"
						className="btn-primary inline-flex items-center justify-center px-8 py-3"
					>
						Back to home
					</Link>
					<Link
						to="/contact"
						className="inline-flex items-center justify-center rounded-full border-2 border-oxfordBlue/25 bg-white/80 px-8 py-3 font-fredoka font-semibold text-oxfordBlue transition-colors hover:border-highland/50 hover:bg-honeydew/80"
					>
						Contact us
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default NotFound;
