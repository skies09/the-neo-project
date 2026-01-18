import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { blogAPI, BlogPost } from "../../services/blogApi";
import { formatDateShort } from "../../helpers/dateUtils";
import TransitionCTA from "../homepage/TransitionCTA";
import PawLoading from "../PawLoading";

const BlogHomepage: React.FC = () => {
	const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchBlogData = async () => {
		try {
			setLoading(true);
			setError(null);

			// Fetch all posts and filter for featured ones
			const response = await blogAPI.getPosts({ page_size: 100 });

			// Filter for featured posts and take the first 2
			const featuredPosts = response.results
				.filter((post) => post.featured === true)
				.slice(0, 2);

			setFeaturedPosts(featuredPosts);
		} catch (err) {
			console.error("Error fetching blog data:", err);
			setError("Failed to load blog posts");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogData();
	}, []);

	// Don't render the section if there are no blog posts (regardless of error state)
	if (!loading && featuredPosts.length === 0) {
		return null;
	}

	if (loading) {
		return (
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center">
						<p className="text-oxfordBlue/70 font-poppins">
							Fetching blog posts...
						</p>
						<PawLoading />
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-10 bg-gradient-to-br from-honeydew to-mintCream">
			<div className="max-w-7xl mx-auto px-4 pb-8">
				{/* Section Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex justify-center items-center mb-4">
						<h2 className="font-delius text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Latest from Our Blog
						</h2>
					</div>
					<p className="text-lg text-highland font-fredoka max-w-5xl mx-auto">
						Discover helpful tips, heartwarming stories, and expert
						advice about dog care and adoption.
					</p>
				</motion.div>

				{/* Featured Posts */}
				{featuredPosts.length > 0 && (
					<motion.div
						className="mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{featuredPosts.map((post, index) => (
								<motion.article
									key={post.public_id}
									className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: 0.3 + index * 0.1,
									}}
									whileHover={{ scale: 1.02 }}
								>
									<Link to={`/blog/${post.public_id}`}>
										<div className="relative">
											{/* Placeholder for featured image */}
											<div className="h-48 bg-gradient-to-br from-highland/20 to-sark/20 flex items-center justify-center">
												<div className="w-16 h-16 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center shadow-lg">
													<FontAwesomeIcon
														icon={faCalendar}
														className="text-2xl text-honeydew"
													/>
												</div>
											</div>

											{/* Category Badge */}
											<div className="absolute top-4 left-4">
												<span className="bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-xs font-bold font-poppins shadow-md">
													{post.category}
												</span>
											</div>
										</div>

										<div className="p-6">
											<h3 className="text-xl font-bold text-oxfordBlue mb-3 line-clamp-2 font-delius group-hover:text-highland transition-colors">
												{post.title}
											</h3>

											<p className="text-oxfordBlue/70 mb-4 line-clamp-3 font-poppins">
												{post.excerpt}
											</p>

											<div className="flex items-center text-sm text-oxfordBlue/60 mb-3 font-poppins">
												<span className="flex items-center">
													<FontAwesomeIcon
														icon={faCalendar}
														className="mr-2 text-highland"
													/>
													{formatDateShort(
														post.published_at ||
															post.created,
													)}
												</span>
											</div>

											{/* Tags */}
											{post.tag_list &&
												post.tag_list.length > 0 && (
													<div className="flex flex-wrap gap-2">
														{post.tag_list
															.slice(0, 2)
															.map(
																(
																	tag: string,
																) => (
																	<span
																		key={
																			tag
																		}
																		className="bg-oxfordBlue/10 text-oxfordBlue px-2 py-1 rounded-full text-xs font-poppins font-medium border border-oxfordBlue/20"
																	>
																		#{tag}
																	</span>
																),
															)}
													</div>
												)}
										</div>
									</Link>
								</motion.article>
							))}
						</div>
					</motion.div>
				)}

				{/* Call to Action */}
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-2 border-oxfordBlue/10">
						<h3 className="text-2xl font-bold text-oxfordBlue font-delius mb-4">
							Explore More Stories
						</h3>
						<p className="text-oxfordBlue/70 font-poppins mb-6">
							Discover more helpful tips, heartwarming adoption
							stories, and expert advice about caring for your
							furry friends.
						</p>
						<Link
							to="/blog"
							className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset inline-flex items-center"
						>
							<span>View All Posts</span>
							<FontAwesomeIcon
								className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
								icon={faArrowRight}
							/>
						</Link>
					</div>
				</motion.div>
			</div>
			<TransitionCTA
				simplified
				title="Ready to find your perfect dog?"
				firstButtonText="Begin Your Journey Today"
				showFirstButtonIcon={true}
			/>
		</section>
	);
};

export default BlogHomepage;
