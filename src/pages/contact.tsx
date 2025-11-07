import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faPhone,
	faClock,
} from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../components/forms/ContactForm";

interface ContactProps {
	form?: any;
}

const Contact = (form: ContactProps) => {
	const containerRef = useRef(null);

	return (
		<motion.div
			ref={containerRef}
			id="contact"
			className="min-h-screen bg-mintCream py-16 px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-6xl mx-auto pt-10">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<h1 className="font-comic text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Contact Us
						</h1>
					</div>
					<p className="text-md lg:text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto">
						Need help? Have questions about adoption? <br></br>Get
						in touch with us and we'll be happy to help!
					</p>
				</motion.div>

				<div className="max-w-4xl mx-auto">
					{/* Contact Information */}
					<motion.div
						className="mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.3,
							ease: "easeOut",
						}}
					>
						<div className="bg-tara rounded-3xl shadow-xl p-6 lg:p-8">
							<h2 className="text-2xl font-bold text-oxfordBlue mb-6 font-comic text-center">
								Get in Touch
							</h2>

							<div className="space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
								<div className="flex items-center space-x-4 md:flex-col md:text-center md:space-x-0">
									<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center flex-shrink-0">
										<FontAwesomeIcon
											icon={faPhone}
											className="text-sunset text-xl"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-oxfordBlue font-poppins mb-2">
											Phone
										</h3>
										<p className="text-oxfordBlue/70 font-poppins text-xs md:text-sm">
											07777777777
										</p>
										<p className="text-xs md:text-sm text-oxfordBlue/60 font-poppins">
											Mon-Fri 9AM-6PM
										</p>
									</div>
								</div>

								<div className="flex items-center space-x-4 md:flex-col md:text-center md:space-x-0">
									<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center flex-shrink-0">
										<FontAwesomeIcon
											icon={faEnvelope}
											className="text-sunset text-xl"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-oxfordBlue font-poppins mb-2">
											Email
										</h3>
										<p className="text-oxfordBlue/70 font-poppins text-xs md:text-sm">
											contact@neoproject.com
										</p>
										<p className="text-xs md:text-sm text-oxfordBlue/60 font-poppins">
											24hr response
										</p>
									</div>
								</div>

								<div className="flex items-center space-x-4 md:flex-col md:text-center md:space-x-0">
									<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center flex-shrink-0">
										<FontAwesomeIcon
											icon={faClock}
											className="text-sunset text-xl"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-oxfordBlue font-poppins mb-2">
											Hours
										</h3>
										<p className="text-oxfordBlue/70 font-poppins text-xs md:text-sm">
											Mon-Fri: 9AM-6PM
										</p>
										<p className="text-xs md:text-xs text-oxfordBlue/60 font-poppins">
											Sat: 10AM-4PM
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.4,
							ease: "easeOut",
						}}
					>
						<div className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-10">
							<ContactForm
								contactType="general"
								title="Send us a Message"
								description="Have a question or need help? Send us a message and we'll get back to you as soon as possible."
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default Contact;
