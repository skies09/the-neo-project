import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="w-full h-16 bg-oxfordBlue fixed top-0 z-50">
			<div className="flex justify-between items-center h-full px-4 md:px-6">
				{/* Company Logo */}
				<div className="flex items-center">
					<Link
						to="/"
						className="font-satisfy text-xl font-bold text-skyBlue tracking-wider drop-shadow-md"
					>
						The Neo Project
					</Link>
				</div>

				{/* Desktop Links */}
				<div className="hidden md:flex space-x-6">
					<Link
						to="/adopt"
						className="text-skyBlue hover:text-sunset font-poppins font-semibold"
					>
						Adopt a dog
					</Link>
					<Link
						to="/breedCalculator"
						className="text-skyBlue hover:text-sunset font-poppins font-semibold"
					>
						Breed calculator
					</Link>
					<Link
						to="/breeds"
						className="text-skyBlue hover:text-sunset font-poppins font-semibold"
					>
						Dog breeds
					</Link>
					<Link
						to="/kennelAdmin"
						className="text-skyBlue hover:text-sunset font-poppins font-semibold"
					>
						Kennel admin
					</Link>
				</div>

				{/* Hamburger Icon for Mobile */}
				<div className="md:hidden flex items-center">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="text-skyBlue focus:outline-none"
					>
						<svg
							className="w-8 h-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={
									isOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16M4 18h16"
								}
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden bg-oxfordBlue">
					<Link
						to="/adopt"
						className="block px-4 py-2 text-skyBlue hover:text-sunset font-poppins font-semibold"
					>
						Adopt a dog
					</Link>
					<Link
						to="/breedCalculator"
						className="block px-4 py-2 text-skyBlue hover:text-sunset font-poppins font-semibold"
					>
						Breed calculator
					</Link>
					<Link
						to="/breeds"
						className="block px-4 py-2 text-skyBlue hover:text-sunset font-poppins font-semibold"
					>
						Dog breeds
					</Link>
					<Link
						to="/kennelAdmin"
						className="block px-4 py-2 text-skyBlue hover:text-sunset font-poppins font-semibold"
					>
						Kennel admin
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
