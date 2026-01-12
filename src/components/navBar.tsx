import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { motion } from "framer-motion";
import { faPaw, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const auth = useAuth();
	const navigate = useNavigate();
	const isLoggedIn = auth?.isLoggedIn ?? false;
	const logout = auth?.logout ?? (() => {});

	return (
		<div className="w-full h-16 bg-tomThumb fixed top-0 z-50">
			<div className="flex justify-between items-center h-full px-4 md:px-6">
				{/* Company Logo */}
				<div className="flex items-center">
					<button
						onClick={() => navigate("/")}
						className="font-delius text-xl font-bold text-twilight tracking-wider drop-shadow-md hover:text-sunset transition-colors cursor-pointer"
					>
						The Neo Project
					</button>
				</div>

				{/* Desktop Links */}
				<div className="hidden md:flex space-x-6 items-center">
					<Link
						to="/all-dogs"
						className="text-twilight hover:text-sunset font-comic font-semibold"
					>
						Adopt a dog
					</Link>
					<Link
						to="/adopt"
						className="text-twilight hover:text-sunset font-comic font-semibold"
					>
						Find your dog
					</Link>
					<Link
						to="/breed-calculator"
						className="text-twilight hover:text-sunset font-comic font-semibold"
					>
						Breed calculator
					</Link>
					<Link
						to="/breeds"
						className="text-twilight hover:text-sunset font-comic font-semibold"
					>
						Dog breeds
					</Link>

					{isLoggedIn ? (
						<div>
							<Link
								to="/kennel-account"
								className="text-twilight hover:text-sunset font-comic font-semibold mr-6"
							>
								Kennels
							</Link>
							<button
								onClick={() => {
									logout();
									navigate("/");
								}}
								className="text-twilight hover:text-sunset font-comic font-semibold cursor-pointer"
							>
								Logout
							</button>
						</div>
					) : (
						<Link
							to="/kennel-admin"
							className="text-twilight hover:text-sunset font-comic font-semibold"
						>
							Kennels
						</Link>
					)}
				</div>

				{/* Hamburger Icon for Mobile */}
				<div className="mr-2 -mt-2 w-8 h-8 flex items-center md:hidden">
					<div
						className="relative w-8 h-6 flex flex-col justify-between cursor-pointer"
						onClick={() => setIsOpen(!isOpen)}
					>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: isOpen ? 0 : 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="absolute top-0 left-0"
						>
							<FontAwesomeIcon
								icon={faPaw}
								size="2x"
								className="mb-2 text-twilight"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: isOpen ? 1 : 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="absolute top-0 left-[0.25rem]"
						>
							<FontAwesomeIcon
								icon={faXmark}
								size="2x"
								className="mb-2 text-twilight"
							/>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden bg-tomThumb">
					<Link
						to="/all-dogs"
						className="block px-4 py-2 text-twilight hover:text-sunset font-comic font-semibold"
						onClick={() => setIsOpen(!isOpen)}
					>
						Adopt a dog
					</Link>
					<Link
						to="/adopt"
						className="block px-4 py-2 text-twilight hover:text-sunset font-comic font-semibold"
						onClick={() => setIsOpen(!isOpen)}
					>
						Find your dog
					</Link>
					<Link
						to="/breed-calculator"
						className="block px-4 py-2 text-twilight hover:text-sunset font-comic font-semibold"
						onClick={() => setIsOpen(!isOpen)}
					>
						Breed calculator
					</Link>
					<Link
						to="/breeds"
						className="block px-4 py-2 text-twilight hover:text-sunset font-comic font-semibold"
						onClick={() => setIsOpen(!isOpen)}
					>
						Dog breeds
					</Link>

					{isLoggedIn ? (
						<div>
							<Link
								to="/kennel-account"
								className="block px-4 py-2 text-twilight hover:text-sunset font-comic font-semibold"
								onClick={() => setIsOpen(!isOpen)}
							>
								Kennels
							</Link>
							<button
								onClick={() => {
									logout();
									navigate("/");
									setIsOpen(false);
								}}
								className="block px-4 py-2 text-twilight hover:text-sunset font-comic font-semibold cursor-pointer w-full text-left"
							>
								Logout
							</button>
						</div>
					) : (
						<Link
							to="/kennel-admin"
							className="block px-4 py-2 text-twilight hover:text-sunset font-comic font-semibold"
							onClick={() => setIsOpen(!isOpen)}
						>
							Kennels
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default Navbar;
