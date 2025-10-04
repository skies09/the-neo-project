import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Toast, { ToastType } from "./Toast";

export interface ToastMessage {
	id: string;
	type: ToastType;
	title: string;
	message: string;
	duration?: number;
}

interface ToastContextType {
	showToast: (toast: Omit<ToastMessage, "id">) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};

interface ToastContainerProps {
	children: React.ReactNode;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastMessage[]>([]);

	const showToast = useCallback((toast: Omit<ToastMessage, "id">) => {
		const id = Date.now().toString();
		const newToast: ToastMessage = { ...toast, id };
		setToasts(prev => [...prev, newToast]);
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ showToast, removeToast }}>
			{children}
			<div className="fixed bottom-4 right-4 z-50 space-y-2">
				<AnimatePresence>
					{toasts.map((toast) => (
						<Toast
							key={toast.id}
							{...toast}
							onClose={removeToast}
						/>
					))}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	);
};
