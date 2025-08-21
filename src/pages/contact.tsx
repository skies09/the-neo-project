import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faMessage } from "@fortawesome/free-solid-svg-icons";

interface ContactProps {
	form?: any;
}

interface FormValues {
	user_name: string;
	user_email: string;
	message: string;
	from?: string;
}

const Contact = (form: ContactProps) => {
	const containerRef = useRef(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	function sendEmail(values: FormValues) {
		values.from = "Neo Project";
		const serviceKey = process.env.REACT_APP_EMAIL_SERVICE_KEY;
		const templateKey = process.env.REACT_APP_EMAIL_TEMPLATE_KEY;
		const emailKey = process.env.REACT_APP_EMAIL_KEY;

		if (serviceKey && templateKey && emailKey) {
			emailjs
				.send(
					serviceKey,
					templateKey,
					values as unknown as Record<string, unknown>,
					emailKey
				)
				.then(
					(result: any) => {
						setFormSubmitted(true);
						setLoading(false);
					},
					(error: any) => {
						setLoading(false);
					}
				);
		}
	}

	const validationSchema = Yup.object({
		user_name: Yup.string().required("Name is required"),
		user_email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		message: Yup.string().required("Message is required"),
	});

	const ContactForm = () => {
		const initialValues = {
			user_name: "",
			user_email: "",
			message: "",
		};

		const handleSubmit = (
			values: FormValues,
			{
				setSubmitting,
			}: { setSubmitting: (isSubmitting: boolean) => void }
		) => {
			setLoading(true);

			sendEmail(values);
			setSubmitting(false);
		};

		return (
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form className="w-full space-y-6">
					<div>
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
							<FontAwesomeIcon icon={faUser} className="mr-2 text-oxfordBlue" />
							Name
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="text"
							id="user_name"
							name="user_name"
							placeholder="Enter your name"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-poppins"
							name="user_name"
							component="div"
						/>
					</div>
					
					<div>
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
							<FontAwesomeIcon icon={faEnvelope} className="mr-2 text-oxfordBlue" />
							Email
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="email"
							id="user_email"
							name="user_email"
							placeholder="Enter your email"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-poppins"
							name="user_email"
							component="div"
						/>
					</div>
					
					<div>
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 flex items-center">
							<FontAwesomeIcon icon={faMessage} className="mr-2 text-oxfordBlue" />
							Message
						</label>
						<Field
							as="textarea"
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200 resize-none"
							id="message"
							name="message"
							rows="4"
							placeholder="Enter your message"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-poppins"
							name="message"
							component="div"
						/>
					</div>
					
					<div className="flex items-center justify-center pt-4">
						<motion.button
							type="submit"
							disabled={loading}
							className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-3 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-oxfordBlue/30 disabled:opacity-50 disabled:cursor-not-allowed"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<div className="flex items-center space-x-3 relative z-10">
								<FontAwesomeIcon icon={faEnvelope} className="text-lg" />
								<span>{loading ? "Sending..." : "Send Message"}</span>
							</div>
							<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</motion.button>
					</div>
				</Form>
			</Formik>
		);
	};

	return (
		<motion.div
			ref={containerRef}
			id="contact"
			className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-20 pb-8 px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<motion.div 
					className="text-center mb-8"
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
					<p className="text-lg text-oxfordBlue/70 font-poppins">
						Need help? Get in touch with us
					</p>
				</motion.div>

				{/* Contact Form */}
				<motion.div
					className="w-full"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					<div className="bg-gradient-to-br from-skyBlue to-aquamarine backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-2xl mx-auto">
						{!formSubmitted && (
							<div>
								<div className="text-center mb-6">
									<div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-3">
										<FontAwesomeIcon
											icon={faEnvelope}
											className="text-2xl text-honeydew"
										/>
									</div>
									<h2 className="text-2xl font-bold text-oxfordBlue mb-2">
										Send us a Message
									</h2>
									<p className="text-oxfordBlue/70">
										We'd love to hear from you. Send us a message and we'll respond as soon as possible.
									</p>
								</div>
								<ContactForm />
							</div>
						)}
						{formSubmitted && (
							<motion.div 
								className="text-center"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
							>
								<div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue to-skyBlue rounded-full flex items-center justify-center mx-auto mb-4">
									<FontAwesomeIcon
										icon={faEnvelope}
										className="text-2xl text-honeydew"
									/>
								</div>
								<h3 className="text-2xl font-bold text-oxfordBlue mb-3">
									Thank you!
								</h3>
								<p className="text-oxfordBlue/80 font-poppins">
									Thanks, I'll get back to you shortly!
								</p>
							</motion.div>
						)}
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Contact;
