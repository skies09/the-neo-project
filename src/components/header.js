// import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
	return (
		<div className="w-screen overflow-hidden h-auto items-center justify-center flex py-8 bg-skyBlue mt-16">
			<div className="relative flex flex-row justify-center items-center">
				<div className="flex flex-row items-center mx-4">
					<FontAwesomeIcon
						icon={faPaw}
						size="lg"
						className="text-flax drop-shadow-md"
					/>
				</div>
				<h1 className="font-satisfy text-2xl md:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
					The Neo Project
				</h1>
				<div className="flex flex-row items-center mx-4">
					<FontAwesomeIcon
						icon={faPaw}
						size="lg"
						className="text-flax drop-shadow-md"
					/>
				</div>
			</div>
		</div>
	);
}
