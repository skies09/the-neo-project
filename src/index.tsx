// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { AuthProvider } from "./AuthContext.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider>
				{" "}
				<App />
			</AuthProvider>
		</Provider>
	</React.StrictMode>
);
