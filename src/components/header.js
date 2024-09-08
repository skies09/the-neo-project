// import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone, faPaw } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
	return (
		<div className="w-screen overflow-hidden h-auto items-center justify-center flex py-8 bg-colorThree">
			<div className="relative flex flex-row justify-center items-center">
				<div className="flex flex-row items-center">
					<FontAwesomeIcon
						icon={faBone}
						size="md lg:xl"
						className="text-colorFour"
					/>
				</div>

				<div className="flex flex-row items-center mx-4">
					<FontAwesomeIcon
						icon={faPaw}
						size="md lg:xl"
						className="text-colorFour"
					/>
				</div>
				<h1 className="font-greatVibes text-center font-bold text-xl lg:text-5xl text-colorFour mx-2">
					The Neo Project
				</h1>
				<div className="flex flex-row items-center mx-4">
					<FontAwesomeIcon
						icon={faPaw}
						size="md lg:xl"
						className="text-colorFour"
					/>
				</div>
				<div className="flex flex-row items-center">
					<FontAwesomeIcon
						icon={faBone}
						size="md lg:xl"
						className="text-colorFour"
					/>
				</div>
			</div>
		</div>
	);
}
