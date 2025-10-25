import React, { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faUser,
	faMessage,
	faPhone,
	faMapMarkerAlt,
	faBuilding,
	faCheckCircle,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons";

interface ContactFormData {
	name: string;
	email: string;
	contact_number: string;
	address_line_1?: string;
	town?: string;
	city?: string;
	postcode?: string;
	contact_type:
		| "general"
		| "rescue_signup"
		| "adoption_inquiry"
		| "support"
		| "other";
	subject?: string;
	message: string;
	priority?: "low" | "medium" | "high" | "urgent";
}

interface ContactResponse {
	message: string;
	contact_id: string;
	status: "success" | "error";
}

class ContactApiService {
	private baseUrl: string;

	constructor() {
		this.baseUrl = process.env.REACT_APP_NEO_PROJECT_BASE_URL || "";
	}

	async submitContact(
		contactData: ContactFormData
	): Promise<ContactResponse> {
		try {
			const response = await fetch(`${this.baseUrl}api/contacts/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contactData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Failed to submit contact form"
				);
			}

			return data;
		} catch (error) {
			console.error("Contact submission error:", error);
			throw error;
		}
	}
}

const contactApiService = new ContactApiService();

interface ContactFormProps {
	contactType: "general" | "rescue_signup" | "adoption_inquiry" | "support";
	title: string;
	description: string;
	showAddressFields?: boolean;
	customFields?: React.ReactNode;
	onSuccess?: (response: any) => void;
	onError?: (error: any) => void;
	className?: string;
}

interface FormValues {
	name: string;
	email: string;
	contact_number: string;
	address_line_1?: string;
	town?: string;
	city?: string;
	postcode?: string;
	subject?: string;
	message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
	contactType,
	title,
	description,
	showAddressFields = false,
	customFields,
	onSuccess,
	onError,
	className = "",
}) => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		contact_number: Yup.string()
			.required("Contact number is required")
			.min(10, "Contact number must be at least 10 digits"),
		address_line_1: showAddressFields ? Yup.string() : Yup.string(),
		town: showAddressFields ? Yup.string() : Yup.string(),
		city: showAddressFields ? Yup.string() : Yup.string(),
		postcode: showAddressFields ? Yup.string() : Yup.string(),
		subject: Yup.string(),
		message: Yup.string()
			.required("Message is required")
			.min(10, "Message must be at least 10 characters"),
	});

	const initialValues: FormValues = {
		name: "",
		email: "",
		contact_number: "",
		address_line_1: "",
		town: "",
		city: "",
		postcode: "",
		subject: "",
		message: "",
	};

	const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
		setIsLoading(true);
		setSubmitError(null);

		try {
			const contactData: ContactFormData = {
				...values,
				contact_type: contactType,
				priority: contactType === "rescue_signup" ? "high" : "medium",
				subject: values.subject || getDefaultSubject(contactType),
			};

			const response = await contactApiService.submitContact(contactData);

			setIsSubmitted(true);
			onSuccess?.(response);
		} catch (error: any) {
			setSubmitError(
				error.message || "Failed to submit form. Please try again."
			);
			onError?.(error);
		} finally {
			setIsLoading(false);
			setSubmitting(false);
		}
	};

	const getDefaultSubject = (type: string): string => {
		switch (type) {
			case "rescue_signup":
				return "Rescue Center Signup Request";
			case "adoption_inquiry":
				return "Dog Adoption Inquiry";
			case "support":
				return "Support Request";
			default:
				return "General Inquiry";
		}
	};

	const getIcon = () => {
		switch (contactType) {
			case "rescue_signup":
				return faBuilding;
			case "adoption_inquiry":
				return faUser;
			case "support":
				return faEnvelope;
			default:
				return faEnvelope;
		}
	};

	if (isSubmitted) {
		return (
			<motion.div
				className={`text-center ${className}`}
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
					<FontAwesomeIcon
						icon={faCheckCircle}
						className="text-2xl text-white"
					/>
				</div>
				<h3 className="text-2xl font-bold text-oxfordBlue mb-3 font-poppins">
					Thank You!
				</h3>
				<p className="text-oxfordBlue/80 font-poppins">
					Your message has been sent successfully. We'll get back to
					you soon!
				</p>
			</motion.div>
		);
	}

	return (
		<div className={className}>
			<div className="text-center mb-6">
				<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center mx-auto mb-3">
					<FontAwesomeIcon
						icon={getIcon()}
						className="text-2xl text-sunset"
					/>
				</div>
				<h2 className="text-2xl font-bold text-oxfordBlue mb-2 font-poppins">
					{title}
				</h2>
				<p className="text-oxfordBlue/70 font-poppins">{description}</p>
			</div>

			{submitError && (
				<motion.div
					className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<p className="text-red-600 font-poppins text-sm">
						{submitError}
					</p>
				</motion.div>
			)}

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form className="w-full space-y-6">
					{/* Name Field */}
					<div>
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 items-center">
							<FontAwesomeIcon
								icon={faUser}
								className="mr-2 text-oxfordBlue"
							/>
							Full Name *
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="text"
							name="name"
							placeholder="Enter your full name"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-poppins"
							name="name"
							component="div"
						/>
					</div>

					{/* Email Field */}
					<div>
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 items-center">
							<FontAwesomeIcon
								icon={faEnvelope}
								className="mr-2 text-oxfordBlue"
							/>
							Email Address *
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="email"
							name="email"
							placeholder="Enter your email address"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-poppins"
							name="email"
							component="div"
						/>
					</div>

					{/* Contact Number Field */}
					<div>
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 items-center">
							<FontAwesomeIcon
								icon={faPhone}
								className="mr-2 text-oxfordBlue"
							/>
							Contact Number *
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="tel"
							name="contact_number"
							placeholder="Enter your contact number"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-poppins"
							name="contact_number"
							component="div"
						/>
					</div>

					{/* Address Fields (conditional) */}
					{showAddressFields && (
						<>
							<div>
								<label className="block text-sm font-semibold text-oxfordBlue mb-2 items-center">
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className="mr-2 text-oxfordBlue"
									/>
									Address Line 1
								</label>
								<Field
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
									type="text"
									name="address_line_1"
									placeholder="Enter your address"
								/>
								<ErrorMessage
									className="text-red-500 text-sm mt-1 font-poppins"
									name="address_line_1"
									component="div"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-semibold text-oxfordBlue mb-2">
										Town
									</label>
									<Field
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
										type="text"
										name="town"
										placeholder="Enter your town"
									/>
									<ErrorMessage
										className="text-red-500 text-sm mt-1 font-poppins"
										name="town"
										component="div"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-oxfordBlue mb-2">
										City
									</label>
									<Field
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
										type="text"
										name="city"
										placeholder="Enter your city"
									/>
									<ErrorMessage
										className="text-red-500 text-sm mt-1 font-poppins"
										name="city"
										component="div"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-semibold text-oxfordBlue mb-2">
									Postcode
								</label>
								<Field
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
									type="text"
									name="postcode"
									placeholder="Enter your postcode"
								/>
								<ErrorMessage
									className="text-red-500 text-sm mt-1 font-poppins"
									name="postcode"
									component="div"
								/>
							</div>
						</>
					)}

					{/* Subject Field (optional) */}
					<div>
						<label className="block text-sm font-semibold text-oxfordBlue mb-2">
							Subject
						</label>
						<Field
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200"
							type="text"
							name="subject"
							placeholder="Enter a subject (optional)"
						/>
						<ErrorMessage
							className="text-red-500 text-sm mt-1 font-poppins"
							name="subject"
							component="div"
						/>
					</div>

					{/* Custom Fields */}
					{customFields}

					{/* Message Field */}
					<div>
						<label className="block text-sm font-semibold text-oxfordBlue mb-2 items-center">
							<FontAwesomeIcon
								icon={faMessage}
								className="mr-2 text-oxfordBlue"
							/>
							Message *
						</label>
						<Field
							as="textarea"
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-oxfordBlue focus:ring-2 focus:ring-oxfordBlue/20 font-poppins transition-all duration-200 resize-none"
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

					{/* Submit Button */}
					<div className="flex items-center justify-center pt-4">
						<motion.button
							type="submit"
							disabled={isLoading}
							className="group relative overflow-hidden from-sark to-bayleaf text-oxfordBlue px-8 py-3 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-highland disabled:opacity-50 disabled:cursor-not-allowed"
							whileHover={{ scale: isLoading ? 1 : 1.05 }}
							whileTap={{ scale: isLoading ? 1 : 0.95 }}
						>
							<div className="flex items-center space-x-3 relative z-10">
								{isLoading ? (
									<FontAwesomeIcon
										icon={faSpinner}
										className="text-lg animate-spin"
									/>
								) : (
									<FontAwesomeIcon
										icon={getIcon()}
										className="text-lg"
									/>
								)}
								<span>
									{isLoading ? "Sending..." : "Send Message"}
								</span>
							</div>
						</motion.button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default ContactForm;
