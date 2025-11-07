import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faDog,
	faUsers,
	faHome,
	faShareAlt,
	faEnvelope,
	faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "../components/homepage/Footer";

const Support: React.FC = () => {
	const sectionRef = useRef(null);
	const sectionInView = useInView(sectionRef, {
		once: true,
		margin: "-100px",
	});

	const waysToHelp = [
		{
			icon: faHome,
			title: "Foster a Dog",
			description:
				"Provide a temporary loving home for a rescue dog. We cover all expenses including food, vet care, and supplies.",
			action: "Learn More",
			link: "/contact",
		},
		{
			icon: faHeart,
			title: "Make a Donation",
			description:
				"Every contribution helps rescue dogs get the care they need. From £25 to feed a dog for a week, to £500 to sponsor multiple rescues.",
			action: "Donate Now",
			link: "/donate",
		},
		{
			icon: faDog,
			title: "Sponsor a Dog",
			description:
				"Commit to monthly support for a specific rescue dog, covering their food, medical care, and essentials until they find a home.",
			action: "Find a Dog to Sponsor",
			link: "/allDogs",
		},
		{
			icon: faShareAlt,
			title: "Spread the Word",
			description:
				"Share our rescue dogs on social media, tell friends and family about The Neo Project, and help us reach more potential adopters.",
			action: "Share on Social Media",
			link: "#",
		},
		{
			icon: faEnvelope,
			title: "Organize a Fundraiser",
			description:
				"Host a charity event, bake sale, or sponsored walk to raise funds for rescue dogs in your community.",
			action: "Contact Us",
			link: "/contact",
		},
		{
			icon: faCalendarAlt,
			title: "Volunteer Your Time",
			description:
				"Help with dog walking, facility maintenance, admin work, or event organization. Every hour makes a difference.",
			action: "View Vacancies",
			link: "#vacancies",
		},
	];

	return (
		<div className="min-h-screen bg-mintCream">
			<motion.div
				ref={sectionRef}
				className="pt-20 pb-8 px-4"
				initial={{ opacity: 0 }}
				animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<motion.div
						className="text-center mb-4"
						initial={{ opacity: 0, y: -20 }}
						animate={
							sectionInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: -20 }
						}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						<div className="flex justify-center items-center my-4">
							<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center">
								Support Rescue Dogs
							</h1>
						</div>
						<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto mb-8">
							Join our community of supporters helping rescue dogs
							find their forever homes. From volunteering to
							fostering, there are many ways to make a difference.
						</p>
					</motion.div>

					{/* Ways to Help Section */}
					<motion.div
						className="mb-20"
						initial={{ opacity: 0, y: 20 }}
						animate={
							sectionInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{
							duration: 0.6,
							delay: 0.3,
							ease: "easeOut",
						}}
					>
						<h2 className="text-3xl text-oxfordBlue font-delius font-semibold mb-8 text-center">
							Ways You Can Help
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{waysToHelp.map((way, index) => (
								<motion.div
									key={index}
									className="bg-tomThumb rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
									initial={{ opacity: 0, y: 20 }}
									animate={
										sectionInView
											? { opacity: 1, y: 0 }
											: { opacity: 0, y: 20 }
									}
									transition={{
										duration: 0.6,
										delay: 0.4 + index * 0.1,
									}}
								>
									<div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
										<FontAwesomeIcon
											icon={way.icon}
											className="text-2xl text-sunset"
										/>
									</div>
									<h3 className="text-xl font-bold text-tara font-delius mb-3">
										{way.title}
									</h3>
									<p className="text-tara/80 font-poppins mb-4 leading-relaxed">
										{way.description}
									</p>
									{way.link !== "#" ? (
										<Link
											to={way.link}
											className="inline-flex items-center space-x-2 text-sunset hover:text-tara font-poppins font-semibold transition-colors"
										>
											<span>{way.action}</span>
											<FontAwesomeIcon
												icon={faHeart}
												className="text-sm"
											/>
										</Link>
									) : (
										<a
											href={way.link}
											className="inline-flex items-center space-x-2 text-sunset hover:text-tara font-poppins font-semibold transition-colors"
										>
											<span>{way.action}</span>
											<FontAwesomeIcon
												icon={faHeart}
												className="text-sm"
											/>
										</a>
									)}
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Vacancies Section */}
					<motion.div
						id="vacancies"
						className="mb-20"
						initial={{ opacity: 0, y: 20 }}
						animate={
							sectionInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{
							duration: 0.6,
							delay: 0.5,
							ease: "easeOut",
						}}
					>
						<div className="text-center mb-12">
							<div className="flex justify-center items-center mb-4">
								<h2 className="font-delius text-3xl lg:text-4xl font-bold text-oxfordBlue drop-shadow-md text-center">
									Rescue Center Vacancies
								</h2>
							</div>
							<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto">
								Join our network of rescue centers! Find
								volunteer opportunities, paid positions, and
								foster opportunities near you.
							</p>
						</div>

						<motion.div
							className="bg-bayleaf rounded-3xl shadow-xl p-8 lg:p-12 text-center"
							initial={{ opacity: 0, y: 20 }}
							animate={
								sectionInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{
								duration: 0.6,
								delay: 0.6,
								ease: "easeOut",
							}}
						>
							<FontAwesomeIcon
								icon={faUsers}
								className="text-5xl text-sunset/70 mb-4"
							/>
							<h3 className="text-2xl font-bold text-oxfordBlue font-delius mb-3">
								No Vacancies at This Time
							</h3>
							<p className="text-mintCream font-poppins max-w-2xl mx-auto">
								We currently don't have any open positions, but
								we're always looking for passionate people to
								join our mission. Check back soon or contact us
								to express your interest!
							</p>
						</motion.div>

						<motion.div
							className="mt-12 text-center bg-gradient-to-br from-aquamarine/10 to-turquoise/10 rounded-3xl p-8"
							initial={{ opacity: 0, y: 20 }}
							animate={
								sectionInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.6, delay: 1.2 }}
						>
							<h3 className="text-2xl font-bold text-oxfordBlue font-delius mb-4">
								Don't See What You're Looking For?
							</h3>
							<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto mb-8">
								We're always looking for passionate people to
								join our mission. Even if you don't see a
								specific role listed, we'd love to hear from
								you! Many of our best team members started by
								reaching out with their own ideas.
							</p>
							<Link
								to="/contact"
								className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset whitespace-nowrap text-xl"
							>
								<FontAwesomeIcon
									className="mr-2"
									icon={faEnvelope}
								/>
								<span>Contact Us About Opportunities</span>
							</Link>
						</motion.div>
					</motion.div>

					{/* Call to Action */}
					<motion.div
						className="bg-bayleaf rounded-3xl shadow-2xl p-8 lg:p-12 text-center text-white mb-12"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={
							sectionInView
								? { opacity: 1, scale: 1 }
								: { opacity: 0, scale: 0.95 }
						}
						transition={{ duration: 0.6, delay: 0.7 }}
					>
						<FontAwesomeIcon
							icon={faHeart}
							className="text-5xl mb-4 text-yellowOrange"
						/>
						<h2 className="text-3xl lg:text-4xl font-bold font-delius text-oxfordBlue mb-4">
							Ready to Make a Difference?
						</h2>
						<p className="text-lg lg:text-xl text-mintCream font-fredoka max-w-3xl mx-auto mb-6">
							Every act of support, no matter how big or small,
							helps rescue dogs find their forever homes. Join us
							in creating happy endings for dogs in need.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/donate"
								className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset whitespace-nowrap text-xl"
							>
								<FontAwesomeIcon
									className="mr-2"
									icon={faHeart}
								/>
								<span>Make a Donation</span>
							</Link>
							<Link
								to="/contact"
								className="group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
							>
								<FontAwesomeIcon
									className="mr-2"
									icon={faUsers}
								/>
								<span>Get Involved</span>
							</Link>
						</div>
					</motion.div>
				</div>
			</motion.div>

			<Footer />
		</div>
	);
};

export default Support;
