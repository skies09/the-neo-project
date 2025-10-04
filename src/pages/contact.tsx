import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
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
			className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-20 pb-8 px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<motion.div 
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<FontAwesomeIcon icon={faEnvelope} className="text-4xl text-skyBlue mr-4" />
						<h1 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Contact Us
						</h1>
						<FontAwesomeIcon icon={faEnvelope} className="text-4xl text-skyBlue ml-4" />
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto">
						Need help? Have questions about adoption? Get in touch with us and we'll be happy to help!
					</p>
				</motion.div>

				<div className="max-w-4xl mx-auto">
					{/* Contact Information */}
					<motion.div
						className="mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
					>
						<div className="bg-white rounded-3xl shadow-xl p-8">
							<h2 className="text-2xl font-bold text-oxfordBlue mb-6 font-poppins text-center">
								Get in Touch
							</h2>
							
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-4">
										<FontAwesomeIcon icon={faPhone} className="text-white text-xl" />
									</div>
									<h3 className="font-semibold text-oxfordBlue font-poppins mb-2">Phone</h3>
									<p className="text-oxfordBlue/70 font-poppins text-sm">07777777777</p>
									<p className="text-xs text-oxfordBlue/60 font-poppins">Mon-Fri 9AM-6PM</p>
								</div>

								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
										<FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
									</div>
									<h3 className="font-semibold text-oxfordBlue font-poppins mb-2">Email</h3>
									<p className="text-oxfordBlue/70 font-poppins text-sm">contact@neoproject.com</p>
									<p className="text-xs text-oxfordBlue/60 font-poppins">24hr response</p>
								</div>

								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-turquoise to-skyBlue rounded-full flex items-center justify-center mx-auto mb-4">
										<FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl" />
									</div>
									<h3 className="font-semibold text-oxfordBlue font-poppins mb-2">Address</h3>
									<p className="text-oxfordBlue/70 font-poppins text-sm">123 Dog Street</p>
									<p className="text-xs text-oxfordBlue/60 font-poppins">Pet City</p>
								</div>

								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-skyBlue to-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
										<FontAwesomeIcon icon={faClock} className="text-white text-xl" />
									</div>
									<h3 className="font-semibold text-oxfordBlue font-poppins mb-2">Hours</h3>
									<p className="text-oxfordBlue/70 font-poppins text-sm">Mon-Fri: 9AM-6PM</p>
									<p className="text-xs text-oxfordBlue/60 font-poppins">Sat: 10AM-4PM</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
					>
						<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
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
