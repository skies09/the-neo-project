import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaw,
	faHeart,
	faEnvelope,
	faPhone,
	faMapMarkerAlt,
	// faFacebook,
	// faTwitter,
	// faInstagram,
} from "@fortawesome/free-solid-svg-icons";
import {
	faFacebook as faFacebookBrand,
	faTwitter as faTwitterBrand,
	faInstagram as faInstagramBrand,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
	const quickLinks = [
		{ name: "Browse Dogs", href: "/dogs" },
		{ name: "Adoption Process", href: "/adoption" },
		{ name: "Rescue Centers", href: "/rescues" },
		{ name: "Success Stories", href: "/stories" },
	];

	const supportLinks = [
		{ name: "Help Center", href: "/help" },
		{ name: "Contact Us", href: "/contact" },
		{ name: "FAQ", href: "/faq" },
		{ name: "Support", href: "/support" },
	];

	return (
		<footer className="bg-gradient-to-br from-oxfordBlue to-skyBlue text-honeydew py-16">
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
									className="text-2xl text-white"
								/>
							</div>
							<span className="text-2xl font-bold font-poppins">
								Neo Project
							</span>
						</div>
						<p className="text-honeydew/80 font-poppins leading-relaxed mb-6">
							Connecting loving families with amazing dogs. Every
							adoption is a new beginning filled with joy,
							companionship, and unconditional love.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="w-10 h-10 bg-skyBlue/20 rounded-full flex items-center justify-center hover:bg-skyBlue/30 transition-colors"
							>
								<FontAwesomeIcon
									icon={faFacebookBrand as any}
									className="text-skyBlue"
								/>
							</a>
							<a
								href="#"
								className="w-10 h-10 bg-skyBlue/20 rounded-full flex items-center justify-center hover:bg-skyBlue/30 transition-colors"
							>
								<FontAwesomeIcon
									icon={faTwitterBrand as any}
									className="text-skyBlue"
								/>
							</a>
							<a
								href="#"
								className="w-10 h-10 bg-skyBlue/20 rounded-full flex items-center justify-center hover:bg-skyBlue/30 transition-colors"
							>
								<FontAwesomeIcon
									icon={faInstagramBrand as any}
									className="text-skyBlue"
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
						<h3 className="text-xl font-bold font-poppins mb-6">
							Quick Links
						</h3>
						<ul className="space-y-3">
							{quickLinks.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="text-honeydew/80 hover:text-honeydew font-poppins transition-colors duration-200 flex items-center space-x-2"
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
						<h3 className="text-xl font-bold font-poppins mb-6">
							Support
						</h3>
						<ul className="space-y-3">
							{supportLinks.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="text-honeydew/80 hover:text-honeydew font-poppins transition-colors duration-200 flex items-center space-x-2"
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
						<h3 className="text-xl font-bold font-poppins mb-6">
							Get in Touch
						</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<FontAwesomeIcon
									icon={faPhone}
									className="text-aquamarine"
								/>
								<span className="text-honeydew/80 font-poppins">
									07777777777
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<FontAwesomeIcon
									icon={faEnvelope}
									className="text-aquamarine"
								/>
								<span className="text-honeydew/80 font-poppins">
									contact@neoproject.com
								</span>
							</div>
							<div className="flex items-start space-x-3">
								<FontAwesomeIcon
									icon={faMapMarkerAlt}
									className="text-aquamarine mt-1"
								/>
								<span className="text-honeydew/80 font-poppins">
									123 Dog Street,
									<br />
									Pet City, PC1 2AB
								</span>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Bottom Bar */}
				<motion.div
					className="border-t border-skyBlue/30 mt-12 pt-8 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
				>
					<p className="text-honeydew/60 font-poppins">
						© 2025 Neo Project. All rights reserved. Made with{" "}
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
