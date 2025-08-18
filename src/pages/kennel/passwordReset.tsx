import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKennelActions } from "../../hooks/kennel.actions.tsx";

const PasswordReset = () => {
	const { resetPassword } = useKennelActions();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (values: { new_password: string; confirm_password: string }) => {
		setError(null);
		try {
			await resetPassword(values);
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred during password reset");
		}
	};

	if (success) {
		return (
			<div className="w-screen overflow-hidden h-auto mt-4">
				<div className="flex justify-center items-center mx-auto">
					<p className="text-xl md:text-2xl font-poppins font-semibold text-green-600 mb-2">
						Password set successfully! Redirecting...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-screen overflow-hidden h-auto mt-4">
			<div className="flex justify-center items-center mx-auto">
				<p className="text-xl md:text-2xl font-poppins font-semibold text-oxfordBlue mb-2">
					Set Your Password
				</p>
			</div>
			
			{error && (
				<div className="flex justify-center items-center mt-4">
					<p className="text-red-600 font-semibold">{error}</p>
				</div>
			)}
			
			<div className="flex justify-center items-center mt-8">
				<div className="w-96 p-6 bg-honeydew rounded-xl shadow-lg">
					<p className="text-center text-oxfordBlue mb-6">
						Welcome! Please set your password to continue.
					</p>
					
					<Formik
						initialValues={{
							new_password: "",
							confirm_password: "",
						}}
						validationSchema={Yup.object({
							new_password: Yup.string()
								.min(8, "Password must be at least 8 characters")
								.required("Password is required"),
							confirm_password: Yup.string()
								.oneOf([Yup.ref("new_password")], "Passwords must match")
								.required("Please confirm your password"),
						})}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form className="space-y-4">
								<div>
									<label htmlFor="new_password" className="block text-sm font-medium text-oxfordBlue mb-1">
										New Password
									</label>
									<Field
										type="password"
										id="new_password"
										name="new_password"
										className="w-full h-10 rounded-lg pl-3 font-monoTwo border border-oxfordBlue"
										placeholder="Enter new password"
									/>
									<ErrorMessage
										name="new_password"
										component="div"
										className="text-sm text-red-600 mt-1"
									/>
								</div>
								
								<div>
									<label htmlFor="confirm_password" className="block text-sm font-medium text-oxfordBlue mb-1">
										Confirm Password
									</label>
									<Field
										type="password"
										id="confirm_password"
										name="confirm_password"
										className="w-full h-10 rounded-lg pl-3 font-monoTwo border border-oxfordBlue"
										placeholder="Confirm new password"
									/>
									<ErrorMessage
										name="confirm_password"
										component="div"
										className="text-sm text-red-600 mt-1"
									/>
								</div>
								
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-oxfordBlue text-honeydew py-2 rounded-lg shadow-md font-monoTwo hover:bg-blue-700 disabled:opacity-50"
								>
									{isSubmitting ? "Setting Password..." : "Set Password"}
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default PasswordReset;
