import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendar,
	faArrowRight,
	faEye,
	faHeart,
	faComment,
	faClock,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { blogAPI, BlogPost } from "../../services/blogApi";
import BlogCard from "./BlogCard";

const BlogHomepage: React.FC = () => {
	const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
	const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBlogData();
	}, []);

	const fetchBlogData = async () => {
		try {
			setLoading(true);

			console.log("BlogHomepage: Starting to fetch blog data...");

			// Get recent posts first (this is a public endpoint)
			const recentResponse = await blogAPI.getRecentPosts();
			console.log(
				"BlogHomepage: Received recent posts response:",
				recentResponse
			);
			setRecentPosts(recentResponse.results.slice(0, 3));

			// Try to get featured posts, but don't fail if it's not available
			try {
				const featuredResponse = await blogAPI.getFeaturedPosts();
				console.log(
					"BlogHomepage: Received featured posts response:",
					featuredResponse
				);
				setFeaturedPosts(featuredResponse.results.slice(0, 3));
			} catch (featuredError) {
				console.warn(
					"Featured posts endpoint not available, using recent posts instead:",
					featuredError
				);
				// Use recent posts as featured if featured endpoint fails
				setFeaturedPosts(recentResponse.results.slice(0, 3));
			}
		} catch (error) {
			console.error("Error fetching blog data:", error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<section className="py-20 bg-gradient-to-br from-skyBlue/10 to-aquamarine/10">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin w-16 h-16 border-4 border-skyBlue border-t-transparent rounded-full"></div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-gradient-to-br from-skyBlue/10 to-aquamarine/10">
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex justify-center items-center mb-4">
						<FontAwesomeIcon
							icon={faCalendar}
							className="text-4xl text-skyBlue mr-4"
						/>
						<h2 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Latest from Our Blog
						</h2>
						<FontAwesomeIcon
							icon={faCalendar}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto mb-8">
						Stories, tips, and updates from our dog rescue community
					</p>
					<Link
						to="/blog"
						className="inline-flex items-center space-x-2 bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
					>
						<span>View All Posts</span>
						<FontAwesomeIcon icon={faArrowRight} />
					</Link>
				</motion.div>

				{/* Featured Posts */}
				{featuredPosts.length > 0 && (
					<motion.div
						className="mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<h3 className="text-3xl font-bold text-oxfordBlue font-poppins mb-8 text-center">
							Featured Stories
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{featuredPosts.map((post, index) => (
								<BlogCard
									key={post.public_id}
									post={post}
									index={index}
								/>
							))}
						</div>
					</motion.div>
				)}

				{/* Recent Posts */}
				{recentPosts.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<div className="flex items-center justify-between mb-8">
							<h3 className="text-3xl font-bold text-oxfordBlue font-poppins">
								Recent Posts
							</h3>
							<Link
								to="/blog"
								className="flex items-center space-x-2 text-skyBlue hover:text-oxfordBlue transition-colors font-poppins font-semibold"
							>
								<span>View All</span>
								<FontAwesomeIcon icon={faArrowRight} />
							</Link>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{recentPosts.map((post, index) => (
								<BlogCard
									key={post.public_id}
									post={post}
									index={index}
								/>
							))}
						</div>
					</motion.div>
				)}

				{/* Call to Action */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					<div className="bg-ghost rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
						<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-4">
							Stay Updated with Our Stories
						</h3>
						<p className="text-oxfordBlue/70 font-poppins mb-6">
							Get the latest adoption stories, care tips, and
							rescue updates delivered to your inbox.
						</p>
						<Link
							to="/blog"
							className="inline-flex items-center space-x-2 bg-gradient-to-r from-skyBlue to-aquamarine text-ghost px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
						>
							<span>Explore Our Blog</span>
							<FontAwesomeIcon icon={faArrowRight} />
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default BlogHomepage;
