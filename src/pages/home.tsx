import React from "react";
import Hero from "../components/homepage/Hero";
import DogOfTheDay from "../components/homepage/DogOfTheDay";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonials";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import TransitionCTA from "../components/homepage/TransitionCTA";
import BlogHomepage from "../components/blog/BlogHomepage";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen">
			<Hero />
			<WhyChooseUs />
			<TransitionCTA
				simplified
				title="Find Your Perfect Dog"
				firstButtonText="Start Your Journey"
				showFirstButtonIcon={true}
			/>
			<HowItWorks />
			<DogOfTheDay />
			<Testimonials />
			<TransitionCTA />
			<BlogHomepage />
		</div>
	);
};

export default Home;
