import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Contact = (form) => {
	const containerRef = useRef(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	function sendEmail(values) {
		values.from = "Neo Project";
		emailjs
			.send(
				process.env.REACT_APP_EMAIL_SERVICE_KEY,
				process.env.REACT_APP_EMAIL_TEMPLATE_KEY,
				values,
				process.env.REACT_APP_EMAIL_KEY
			)
			.then(
				(result) => {
					console.log(result.text);
					setFormSubmitted(true);
					setLoading(false);
				},
				(error) => {
					console.log(error.text);
					setLoading(false);
				}
			);
	}

	const validationSchema = Yup.object({
		user_name: Yup.string(),
		user_email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		message: Yup.string(),
	});

	const ContactForm = () => {
		const initialValues = {
			user_name: "",
			user_email: "",
			message: "",
		};

		const handleSubmit = (values, { setSubmitting }) => {
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
				<Form className="flex flex-col justify-start items-start w-full lg:w-10/12">
					<p className="text-lg lg:text-xl text-colorFive font-bold flex justify-center text-center font-monoTwo opacity-90">
						Name
					</p>
					<Field
						className="w-full h-8 z-10 rounded-xl my-2 lg:my-4 pl-2 font-monoTwo border border-oxfordBlue"
						type="text"
						id="user_name"
						name="user_name"
					/>
					<p className="text-lg lg:text-xl text-colorFive font-bold flex justify-center text-center font-monoTwo opacity-90">
						Email
					</p>
					<Field
						className="w-full h-8 z-10 rounded-xl my-2 lg:my-4 pl-2 font-monoTwo border border-oxfordBlue"
						type="email"
						id="user_email"
						name="user_email"
					/>
					<ErrorMessage
						className="text-sm text-colorOne font-bold flex justify-center text-center font-monoTwo opacity-90 -mt-2"
						name="user_email"
						component="div"
					/>
					<p className="text-lg lg:text-xl text-colorFive font-bold flex justify-center text-center font-monoTwo">
						Message
					</p>
					<Field
						as="textarea"
						className="w-full lg:h-24 z-10 rounded-xl my-2 lg:my-4 pl-2 pt-2 font-monoTwo border border-oxfordBlue"
						id="message"
						name="message"
						rows="3"
					/>
					<button
						className="flex justify-center items-center mx-auto px-6 py-1 mt-1 bg-colorTwo font-racing text-colorFive font-medium border border-colorFive rounded-xl hover:bg-colorTwo hover:text-colorFive hover:border-2 hover:border-solid hover:border-colorFour"
						type="submit"
					>
						{loading ? "Sending..." : "Send"}
					</button>
				</Form>
			</Formik>
		);
	};

	return (
		<div
			ref={containerRef}
			id="contact"
			className="w-screen overflow-hidden h-auto mt-4"
		>
			<div className="flex justify-center items-center flex-col">
				<p className="text-xl font-poppins font-semibold text-oxfordBlue mb-2">
					Need help?
				</p>
				<p className="text-xl font-poppins font-semibold text-oxfordBlue mb-2">
					Contact us here
				</p>
			</div>
			<div className="w-5/6 lg:w-1/2 mx-auto p-6 bg-honeydew rounded-xl shadow-lg my-4 flex flex-col justify-between">
				<motion.div
					className="w-10/12 mx-auto flex justify-center items-start bg-colorThree h-80 lg:h-96"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
				>
					{!formSubmitted && <ContactForm />}
					{formSubmitted && (
						<p className="pt-16 lg:pt-28 text-lg lg:text-xl text-colorFive font-bold flex justify-center text-center font-monoTwo">
							Thanks, I'll get back to you shortly!
						</p>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default Contact;
