import React from "react";
import Hero from "../components/homepage/Hero";
import DogOfTheDay from "../components/homepage/DogOfTheDay";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonials";
import DonationSection from "../components/homepage/DonationSection";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import TransitionCTA from "../components/homepage/TransitionCTA";
import BlogHomepage from "../components/blog/BlogHomepage";
import Footer from "../components/homepage/Footer";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen">
			<Hero />
			<WhyChooseUs />
			<TransitionCTA simplified={true} />
			<HowItWorks />
			<DogOfTheDay />
			<Testimonials />
			<TransitionCTA />
			<BlogHomepage />
			<DonationSection />
			<Footer />
		</div>
	);
};

export default Home;
