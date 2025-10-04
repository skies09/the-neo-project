import React from "react";
import Hero from "../components/homepage/Hero";
import DogOfTheDay from "../components/homepage/DogOfTheDay";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonials";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import Footer from "../components/homepage/Footer";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen">
			<Hero />
			<WhyChooseUs />
			<HowItWorks />
			<DogOfTheDay />
			<Testimonials />
			<Footer />
		</div>
	);
};

export default Home;