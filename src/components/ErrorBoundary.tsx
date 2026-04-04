import React, { Component, ErrorInfo, ReactNode } from "react";

type Props = { children: ReactNode };

type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false, error: null };

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: ErrorInfo): void {
		console.error("ErrorBoundary:", error, info.componentStack);
	}

	handleRetry = (): void => {
		this.setState({ hasError: false, error: null });
	};

	render(): ReactNode {
		if (this.state.hasError && this.state.error) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-honeydew px-4 pt-20">
					<div className="max-w-md rounded-2xl border-2 border-oxfordBlue/20 bg-white p-8 text-center shadow-xl">
						<h1 className="font-delius text-2xl font-bold text-oxfordBlue mb-3">
							Something went wrong
						</h1>
						<p className="text-oxfordBlue/80 font-poppins text-sm mb-6">
							This page hit an unexpected error. You can try again or go
							home.
						</p>
						<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
							<button
								type="button"
								onClick={this.handleRetry}
								className="rounded-full bg-gradient-to-r from-highland to-sark px-6 py-3 font-fredoka font-semibold text-honeydew shadow-md hover:opacity-95"
							>
								Try again
							</button>
							<a
								href="/"
								className="rounded-full border-2 border-oxfordBlue px-6 py-3 font-fredoka font-semibold text-oxfordBlue hover:bg-oxfordBlue/5"
							>
								Home
							</a>
						</div>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}
