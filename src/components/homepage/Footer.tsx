import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaw,
	faHeart,
	faEnvelope,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
	faFacebook,
	faTiktok,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
	const quickLinks = [
		{ name: "Browse Dogs", href: "/allDogs" },
		{ name: "Adoption Process", href: "/adopt" },
		{ name: "Dog Breeds", href: "/breeds" },
		{ name: "Shop", href: "/shop" },
		{ name: "Blog", href: "/blog" },
	];

	const supportLinks = [
		{ name: "Help Center", href: "/help" },
		{ name: "Contact Us", href: "/contact" },
		{ name: "FAQ", href: "/faq" },
		{ name: "Support", href: "/support" },
	];

	return (
		<footer className="bg-gradient-to-br from-tomThumb to-bayleaf text-honeydew py-16">
			<div className="max-w-7xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<motion.div
						className="lg:col-span-1"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						<div className="flex items-center space-x-3 mb-6">
							<div className="w-12 h-12 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center">
								<FontAwesomeIcon
									icon={faPaw}
									className="text-2xl text-cherokee"
								/>
							</div>
							<span className="text-2xl font-bold font-delius">
								The Neo Project
							</span>
						</div>
						<p className="text-honeydew font-poppins leading-relaxed mb-6">
							Connecting loving families with amazing dogs. Every
							adoption is a new beginning filled with joy,
							companionship, and unconditional love.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="w-12 h-12 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faInstagram as any}
									className="text-cherokee text-2xl"
								/>
							</a>
							<a
								href="#"
								className="w-12 h-12 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faFacebook as any}
									className="text-cherokee text-2xl"
								/>
							</a>
							<a
								href="#"
								className="w-12 h-12 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faTiktok as any}
									className="text-cherokee text-2xl"
								/>
							</a>
						</div>
					</motion.div>

					{/* Quick Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<h3 className="text-xl font-bold font-poppins mb-6 text-cherokee">
							Quick Links
						</h3>
						<ul className="space-y-3">
							{quickLinks.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="transition-colors duration-200 flex items-center space-x-2 text-twilight hover:text-sunset font-comic font-medium"
									>
										<FontAwesomeIcon
											icon={faPaw}
											className="text-xs text-aquamarine"
										/>
										<span>{link.name}</span>
									</a>
								</li>
							))}
						</ul>
					</motion.div>

					{/* Support */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<h3 className="text-xl font-bold font-poppins mb-6 text-cherokee">
							Support
						</h3>
						<ul className="space-y-3">
							{supportLinks.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="transition-colors duration-200 flex items-center space-x-2 text-twilight hover:text-sunset font-comic font-medium"
									>
										<FontAwesomeIcon
											icon={faHeart}
											className="text-xs text-aquamarine"
										/>
										<span>{link.name}</span>
									</a>
								</li>
							))}
						</ul>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<h3 className="text-xl font-bold font-poppins mb-6 text-cherokee">
							Get in Touch
						</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<FontAwesomeIcon
									icon={faPhone}
									className="text-twilight hover:text-sunset"
								/>
								<span className="text-twilight hover:text-sunset font-comic">
									07777777777
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<FontAwesomeIcon
									icon={faEnvelope}
									className="text-twilight hover:text-sunset"
								/>
								<span className="text-twilight hover:text-sunset font-comic">
									contact@neoproject.com
								</span>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Bottom Bar */}
				<motion.div
					className="border-t border-twilight mt-12 pt-8 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
				>
					<p className="text-twilight/80 font-delius">
						© 2025 The Neo Project. All rights reserved. Made with{" "}
						<FontAwesomeIcon
							icon={faHeart}
							className="text-aquamarine mx-1"
						/>{" "}
						for dogs and their families.
					</p>
				</motion.div>
			</div>
		</footer>
	);
};

export default Footer;
