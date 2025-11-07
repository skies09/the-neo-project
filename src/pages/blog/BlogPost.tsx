import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faCalendar,
	faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { blogAPI, BlogPost } from "../../services/blogApi";
import { formatDateLong } from "../../helpers/dateUtils";

// Utility function to convert line breaks to HTML
const formatContent = (content: string): string => {
	return content
		.replace(/\r\n\r\n/g, '</p><p>') // Convert double line breaks to paragraph breaks
		.replace(/\r\n/g, '<br>') // Convert single line breaks to <br> tags
		.replace(/\n\n/g, '</p><p>') // Convert double \n to paragraph breaks
		.replace(/\n/g, '<br>') // Convert single \n to <br> tags
		.replace(/^/, '<p>') // Add opening <p> tag at the beginning
		.replace(/$/, '</p>'); // Add closing </p> tag at the end
};

const BlogPostPage: React.FC = () => {
	const { id: publicId } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [post, setPost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchPost = async () => {
		if (!publicId) {
			setError("Post ID not provided");
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const postData = await blogAPI.getPost(publicId);
			setPost(postData);
		} catch (err) {
			console.error("Error fetching post:", err);
			setError("Failed to load blog post");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPost();
	}, [publicId]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
				<div className="max-w-4xl mx-auto px-4 py-20">
					<div className="text-center">
						<div className="animate-spin w-16 h-16 border-4 border-skyBlue border-t-transparent rounded-full mx-auto mb-4"></div>
						<p className="text-oxfordBlue/70 font-poppins">
							Loading blog post...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
				<div className="max-w-4xl mx-auto px-4 py-20">
					<div className="text-center">
						<div className="bg-lace rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
							<h2 className="text-2xl font-bold text-oxfordBlue font-poppins mb-4">
								{error || "Post Not Found"}
							</h2>
							<p className="text-oxfordBlue/70 font-poppins mb-6">
								The blog post you're looking for doesn't exist
								or has been removed.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button
									onClick={() => navigate(-1)}
									className="bg-skyBlue text-ghost px-6 py-3 rounded-lg hover:bg-skyBlue/80 transition-colors"
								>
									Go Back
								</button>
								<Link
									to="/blog"
									className="bg-oxfordBlue text-ghost px-6 py-3 rounded-lg hover:bg-oxfordBlue/80 transition-colors inline-block"
								>
									View All Posts
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
			<div className="max-w-4xl mx-auto px-4 py-20">
				{/* Back Button */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
				>
					<button
						onClick={() => navigate(-1)}
						className="flex items-center space-x-2 text-skyBlue hover:text-skyBlue/80 transition-colors font-poppins"
					>
						<FontAwesomeIcon icon={faArrowLeft} />
						<span>Back to Blog</span>
					</button>
				</motion.div>

				{/* Article */}
				<motion.article
					className="bg-lace rounded-2xl shadow-lg overflow-hidden"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{/* Header */}
					<div className="p-8 border-b border-gray-200">
						<div className="flex flex-wrap gap-3 mb-4">
							<span className="bg-skyBlue text-ghost px-3 py-1 rounded-full text-sm font-bold">
								{post.category}
							</span>
						</div>

						<h1 className="text-3xl lg:text-4xl font-bold text-oxfordBlue font-poppins mb-4">
							{post.title}
						</h1>

						<div className="flex items-center space-x-6 text-sm text-oxfordBlue/60">
							<span className="flex items-center">
								<FontAwesomeIcon
									icon={faCalendar}
									className="mr-2"
								/>
								{formatDateLong(
									post.published_at || post.created
								)}
							</span>
						</div>
					</div>

					{/* Content */}
					<div className="p-8">
						<div
							className="prose prose-lg max-w-none text-oxfordBlue font-poppins"
							dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
						/>
					</div>

					{/* Tags */}
					{post.tag_list && post.tag_list.length > 0 && (
						<div className="p-8 border-t border-gray-200">
							<h3 className="text-lg font-semibold text-oxfordBlue mb-4 flex items-center">
								<FontAwesomeIcon
									icon={faTag}
									className="mr-2"
								/>
								Tags
							</h3>
							<div className="flex flex-wrap gap-2">
								{post.tag_list.map((tag) => (
									<Link
										key={tag}
										to={`/blog?tags=${tag}`}
										className="bg-gray-100 text-oxfordBlue/70 px-3 py-1 rounded-full text-sm hover:bg-skyBlue hover:text-ghost transition-colors"
									>
										#{tag}
									</Link>
								))}
							</div>
						</div>
					)}
				</motion.article>

				{/* Related Posts Section */}
				<motion.div
					className="mt-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<div className="bg-lace rounded-2xl shadow-lg p-8">
						<h2 className="text-2xl font-bold text-oxfordBlue font-poppins mb-6">
							More from Our Blog
						</h2>
						<p className="text-oxfordBlue/70 font-poppins mb-6">
							Discover more helpful tips and heartwarming stories
							about dog care and adoption.
						</p>
						<Link
							to="/blog"
							className="inline-flex items-center space-x-2 bg-gradient-to-r from-skyBlue to-aquamarine text-ghost px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
						>
							<span>View All Posts</span>
							<FontAwesomeIcon
								icon={faArrowLeft}
								className="rotate-180"
							/>
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default BlogPostPage;
