import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { blogAPI, BlogPost } from "../../services/blogApi";
import { formatDateShort } from "../../helpers/dateUtils";

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
			<section className="py-20 bg-gradient-to-br from-skyBlue/10 to-aquamarine/10">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center">
						<div className="animate-spin w-12 h-12 border-4 border-skyBlue border-t-transparent rounded-full mx-auto mb-4"></div>
						<p className="text-oxfordBlue/70 font-poppins">
							Loading blog posts...
						</p>
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
					<h2 className="text-3xl lg:text-4xl font-bold text-oxfordBlue font-poppins mb-4">
						Latest from Our Blog
					</h2>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto">
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
									className="bg-lace rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: 0.3 + index * 0.1,
									}}
								>
									<Link to={`/blog/${post.public_id}`}>
										<div className="relative">
											{/* Placeholder for featured image */}
											<div className="h-48 bg-gradient-to-br from-skyBlue/20 to-aquamarine/20 flex items-center justify-center">
												<FontAwesomeIcon
													icon={faCalendar}
													className="text-4xl text-skyBlue/50"
												/>
											</div>

											{/* Category Badge */}
											<div className="absolute top-4 left-4">
												<span className="bg-skyBlue text-ghost px-3 py-1 rounded-full text-xs font-bold">
													{post.category}
												</span>
											</div>
										</div>

										<div className="p-6">
											<h3 className="text-xl font-bold text-oxfordBlue mb-3 line-clamp-2">
												{post.title}
											</h3>

											<p className="text-oxfordBlue/70 mb-4 line-clamp-3">
												{post.excerpt}
											</p>

											<div className="flex items-center text-sm text-oxfordBlue/60 mb-3">
												<span className="flex items-center">
													<FontAwesomeIcon
														icon={faCalendar}
														className="mr-1"
													/>
													{formatDateShort(
														post.published_at ||
															post.created
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
																	tag: string
																) => (
																	<span
																		key={
																			tag
																		}
																		className="bg-gray-100 text-oxfordBlue/70 px-2 py-1 rounded text-xs"
																	>
																		#{tag}
																	</span>
																)
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
					<div className="bg-lace rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
						<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-4">
							Explore More Stories
						</h3>
						<p className="text-oxfordBlue/70 font-poppins mb-6">
							Discover more helpful tips, heartwarming adoption
							stories, and expert advice about caring for your
							furry friends.
						</p>
						<Link
							to="/blog"
							className="group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
						>
							<span>View All Posts</span>
							<FontAwesomeIcon
								className="ml-2"
								icon={faArrowRight}
							/>
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default BlogHomepage;
