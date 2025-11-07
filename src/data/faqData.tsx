import {
	faPaw,
	faHeart,
	faHome,
	faUsers,
	faShieldAlt,
	faCalendar,
	faPhone,
	faPoundSign,
} from "@fortawesome/free-solid-svg-icons";

export interface FAQItem {
	id: number;
	question: string;
	answer: string;
	category: string;
	icon: any;
}

export const faqData: FAQItem[] = [
	{
		id: 1,
		question: "How do I adopt a dog?",
		answer: "Our adoption process is simple! Browse our available dogs, find one you connect with, and contact the rescue center directly. You'll need to fill out an adoption application and may be asked to provide references. The rescue center will guide you through the rest of the process.",
		category: "Adoption Process",
		icon: faPaw,
	},
	{
		id: 2,
		question: "What are the adoption fees?",
		answer: "Adoption fees vary by rescue center and typically range from £150-£300. This usually includes vaccinations, microchipping, and spaying/neutering. Some rescue centers may offer reduced fees for older dogs or special circumstances.",
		category: "Adoption Process",
		icon: faPoundSign,
	},
	{
		id: 3,
		question: "Can I meet the dog before adopting?",
		answer: "Absolutely! We encourage potential adopters to meet their chosen dog before making a commitment. Most rescue centers offer meet-and-greet sessions where you can spend time with the dog and ask questions about their personality and needs.",
		category: "Adoption Process",
		icon: faUsers,
	},
	{
		id: 4,
		question: "What if the dog doesn't work out?",
		answer: "Rescue centers understand that sometimes adoptions don't work out. Most have a return policy and will take the dog back if needed. It's important to discuss this with the rescue center before adoption and understand their specific policies.",
		category: "Adoption Process",
		icon: faShieldAlt,
	},
	{
		id: 5,
		question: "How long does the adoption process take?",
		answer: "The adoption process typically takes 1-2 weeks from application to bringing your new dog home. This includes application review, home visits (if required), and finalizing paperwork. Some adoptions may be faster or slower depending on the rescue center's procedures.",
		category: "Adoption Process",
		icon: faCalendar,
	},
	{
		id: 6,
		question: "Do you have puppies available?",
		answer: "Yes! We work with rescue centers that have dogs of all ages, including puppies. However, puppies are often in high demand and may have longer waiting lists. We also have many wonderful adult and senior dogs looking for loving homes.",
		category: "Available Dogs",
		icon: faPaw,
	},
	{
		id: 7,
		question: "What breeds do you have?",
		answer: "We have a wide variety of breeds and mixed breeds available. From popular breeds like Labradors and Golden Retrievers to unique mixes and purebred dogs, there's something for everyone. Use our breed calculator to find the perfect match for your lifestyle!",
		category: "Available Dogs",
		icon: faHeart,
	},
	{
		id: 8,
		question: "Are the dogs healthy?",
		answer: "All dogs in our network receive veterinary care including vaccinations, health checks, and any necessary medical treatment. Rescue centers provide detailed health information for each dog, and you can discuss any concerns directly with them.",
		category: "Dog Care",
		icon: faShieldAlt,
	},
	{
		id: 9,
		question: "What if I have other pets?",
		answer: "Many of our dogs are good with other pets! Each dog's profile includes information about their compatibility with other dogs, cats, and children. Rescue centers can help match you with a dog that will fit well with your existing pets.",
		category: "Dog Care",
		icon: faUsers,
	},
	{
		id: 10,
		question: "How can I help if I can't adopt?",
		answer: "There are many ways to help! You can volunteer at local rescue centers, foster dogs temporarily, donate supplies or money, or simply share our platform with others. Every little bit helps save more dogs and find them loving homes.",
		category: "How to Help",
		icon: faHeart,
	},
	{
		id: 11,
		question: "Is there a home visit required?",
		answer: "Some rescue centers require home visits as part of their adoption process to ensure the dog will be going to a safe and suitable environment. This is a standard practice that helps ensure successful adoptions and the well-being of the dogs.",
		category: "Adoption Process",
		icon: faHome,
	},
	{
		id: 12,
		question: "How do I contact a rescue center?",
		answer: "Each dog's profile includes contact information for their rescue center. You can reach out directly via phone or email. Our contact page also has general information if you need help getting in touch with a specific rescue center.",
		category: "Contact",
		icon: faPhone,
	},
];

export const faqCategories = [
	"All",
	"Adoption Process",
	"Available Dogs",
	"Dog Care",
	"How to Help",
	"Contact",
];
