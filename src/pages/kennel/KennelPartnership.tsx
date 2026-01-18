import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUsers,
	faChartLine,
	faClock,
	faHeart,
	faPaw,
	faCheckCircle,
	faBuilding,
	faHandshake,
	faGlobe,
	faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const KennelPartnership: React.FC = () => {
	const sectionRef = useRef(null);
	const sectionInView = useInView(sectionRef, {
		once: true,
		margin: "-100px",
	});
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (sectionInView && !hasAnimated) {
			setHasAnimated(true);
		}
	}, [sectionInView, hasAnimated]);

	const benefits = [
		{
			icon: faUsers,
			title: "Reach More Adopters",
			description:
				"Connect with thousands of potential adopters actively searching for their perfect dog. Expand your reach beyond your local area.",
		},
		{
			icon: faChartLine,
			title: "Increase Adoption Rates",
			description:
				"Our platform helps match dogs with the right families faster, reducing the time dogs spend waiting for their forever homes.",
		},
		{
			icon: faClock,
			title: "Save Time & Resources",
			description:
				"Streamline your adoption process. Manage all your dogs in one place and let our matching system do the work for you.",
		},
		{
			icon: faHeart,
			title: "Better Matches",
			description:
				"Our advanced matching system ensures dogs are paired with families that truly fit their needs, reducing returns and improving outcomes.",
		},
		{
			icon: faGlobe,
			title: "Wider Visibility",
			description:
				"Get your dogs seen by adopters across the country. No more relying solely on local advertising or word of mouth.",
		},
		{
			icon: faShieldAlt,
			title: "Secure & Trusted",
			description:
				"Join a trusted platform that prioritizes the safety and well-being of both dogs and adopters. We handle the technical side so you can focus on care.",
		},
	];

	const features = [
		"Easy dog profile management",
		"Automated matching with potential adopters",
		"Direct communication with interested families",
		"Track adoption applications and status",
		"Access to adoption analytics",
		"Free to join and use",
	];

	return (
		<div className="min-h-screen bg-mintCream">
			<motion.div
				ref={sectionRef}
				className="pt-24 pb-12 px-4"
				initial={{ opacity: 0 }}
				animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<div className="max-w-7xl mx-auto">
					{/* Hero Section */}
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: -20 }}
						animate={
							hasAnimated
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: -20 }
						}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						<div className="flex justify-center items-center mb-6">
							<div className="w-20 h-20 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center shadow-lg mb-4">
								<FontAwesomeIcon
									icon={faBuilding}
									className="text-3xl text-sunset"
								/>
							</div>
						</div>
						<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center mb-6">
							Rescue Centers & Kennels
						</h1>
						<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto mb-8">
							Join The Neo Project and help more dogs find their
							forever homes. Our platform connects you with
							thousands of potential adopters actively searching
							for their perfect match.
						</p>
						<Link
							to="/kennel-admin"
							className="inline-block group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset text-lg"
						>
							<div className="flex items-center space-x-3 relative z-10">
								<FontAwesomeIcon
									icon={faHandshake}
									className="text-lg"
								/>
								<span>Sign Up Today</span>
							</div>
							<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</Link>
					</motion.div>

					{/* Why Join Section */}
					<motion.div
						className="mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={
							hasAnimated
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{
							duration: 0.8,
							delay: 0.4,
							ease: "easeOut",
						}}
					>
						<div className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-12">
							<h2 className="text-3xl md:text-4xl font-bold text-tara font-delius mb-8 text-center">
								Why Join The Neo Project?
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{benefits.map((benefit, index) => (
									<motion.div
										key={index}
										className="bg-gradient-to-br from-tara to-mintCream rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
										initial={{ opacity: 0, y: 20 }}
										animate={
											hasAnimated
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 20 }
										}
										transition={{
											duration: 0.6,
											delay: 0.5 + index * 0.1,
											ease: "easeOut",
										}}
									>
										<div className="w-16 h-16 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mb-4">
											<FontAwesomeIcon
												icon={benefit.icon}
												className="text-2xl text-sunset"
											/>
										</div>
										<h3 className="text-xl font-bold text-oxfordBlue font-poppins mb-3">
											{benefit.title}
										</h3>
										<p className="text-oxfordBlue/80 font-poppins">
											{benefit.description}
										</p>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* Features Section */}
					<motion.div
						className="mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={
							hasAnimated
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{
							duration: 0.8,
							delay: 0.6,
							ease: "easeOut",
						}}
					>
						<div className="bg-gradient-to-br from-tara to-mintCream rounded-3xl shadow-xl p-8 lg:p-12">
							<h2 className="text-3xl md:text-4xl font-bold text-oxfordBlue font-delius mb-8 text-center">
								Everything You Need
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
								{features.map((feature, index) => (
									<motion.div
										key={index}
										className="flex items-center space-x-3"
										initial={{ opacity: 0, x: -20 }}
										animate={
											hasAnimated
												? { opacity: 1, x: 0 }
												: { opacity: 0, x: -20 }
										}
										transition={{
											duration: 0.6,
											delay: 0.7 + index * 0.1,
											ease: "easeOut",
										}}
									>
										<FontAwesomeIcon
											icon={faCheckCircle}
											className="text-oxfordBlue text-xl flex-shrink-0"
										/>
										<span className="text-oxfordBlue font-poppins text-lg">
											{feature}
										</span>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* How It Works Section */}
					<motion.div
						className="mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={
							hasAnimated
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{
							duration: 0.8,
							delay: 0.8,
							ease: "easeOut",
						}}
					>
						<div className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-12">
							<h2 className="text-3xl md:text-4xl font-bold text-tara font-delius mb-12 text-center">
								How It Works
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								<motion.div
									className="text-center"
									initial={{ opacity: 0, y: 20 }}
									animate={
										hasAnimated
											? { opacity: 1, y: 0 }
											: { opacity: 0, y: 20 }
									}
									transition={{
										duration: 0.6,
										delay: 0.9,
										ease: "easeOut",
									}}
								>
									<div className="w-20 h-20 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
										<span className="text-3xl font-bold text-sunset font-delius">
											1
										</span>
									</div>
									<h3 className="text-xl font-bold text-tara font-poppins mb-3">
										Sign Up
									</h3>
									<p className="text-tara font-poppins">
										Register your rescue center or kennel in
										just a few minutes. Our team will verify
										your credentials.
									</p>
								</motion.div>
								<motion.div
									className="text-center"
									initial={{ opacity: 0, y: 20 }}
									animate={
										hasAnimated
											? { opacity: 1, y: 0 }
											: { opacity: 0, y: 20 }
									}
									transition={{
										duration: 0.6,
										delay: 1.0,
										ease: "easeOut",
									}}
								>
									<div className="w-20 h-20 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
										<span className="text-3xl font-bold text-sunset font-delius">
											2
										</span>
									</div>
									<h3 className="text-xl font-bold text-tara font-poppins mb-3">
										Add Your Dogs
									</h3>
									<p className="text-tara font-poppins">
										Upload profiles of the dogs available
										for adoption. Include photos, details,
										and personality traits.
									</p>
								</motion.div>
								<motion.div
									className="text-center"
									initial={{ opacity: 0, y: 20 }}
									animate={
										hasAnimated
											? { opacity: 1, y: 0 }
											: { opacity: 0, y: 20 }
									}
									transition={{
										duration: 0.6,
										delay: 1.1,
										ease: "easeOut",
									}}
								>
									<div className="w-20 h-20 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
										<span className="text-3xl font-bold text-sunset font-delius">
											3
										</span>
									</div>
									<h3 className="text-xl font-bold text-tara font-poppins mb-3">
										Find Matches
									</h3>
									<p className="text-tara font-poppins">
										Our system automatically matches your
										dogs with potential adopters. Review and
										connect with interested families.
									</p>
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* CTA Section */}
					<motion.div
						className="text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={
							hasAnimated
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{
							duration: 0.8,
							delay: 1.2,
							ease: "easeOut",
						}}
					>
						<div className="bg-bayleaf rounded-3xl shadow-xl p-8 lg:p-12">
							<div className="w-20 h-20 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
								<FontAwesomeIcon
									icon={faPaw}
									className="text-3xl text-sunset"
								/>
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-cherokee font-delius mb-6">
								Ready to work together?
							</h2>
							<p className="text-lg text-titan font-poppins max-w-2xl mx-auto mb-8">
								Join The Neo Project today and start connecting
								your dogs with loving families. It's free to
								join, and together we can help more rescue dogs
								find their forever homes.
							</p>
							<Link
								to="/kennel-admin"
								className="inline-block group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-10 py-5 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset text-xl"
							>
								<div className="flex items-center space-x-3 relative z-10">
									<FontAwesomeIcon
										icon={faHandshake}
										className="text-xl"
									/>
									<span>Get Started Now</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</Link>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default KennelPartnership;

