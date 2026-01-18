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
import PawLoading from "../../components/PawLoading";

// Utility function to convert line breaks to HTML
const formatContent = (content: string): string => {
	return content
		.replace(/\r\n\r\n/g, "</p><p>") // Convert double line breaks to paragraph breaks
		.replace(/\r\n/g, "<br>") // Convert single line breaks to <br> tags
		.replace(/\n\n/g, "</p><p>") // Convert double \n to paragraph breaks
		.replace(/\n/g, "<br>") // Convert single \n to <br> tags
		.replace(/^/, "<p>") // Add opening <p> tag at the beginning
		.replace(/$/, "</p>"); // Add closing </p> tag at the end
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
			<div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16 relative">
				<PawLoading />
				<div className="max-w-4xl mx-auto px-4 py-20">
					<div className="text-center">
						<p className="text-oxfordBlue/70 font-poppins">
							Fetching blog post...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16">
				<div className="max-w-4xl mx-auto px-4 py-20">
					<div className="text-center">
						<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-2 border-oxfordBlue/10">
							<div className="w-16 h-16 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
								<FontAwesomeIcon
									icon={faArrowLeft}
									className="text-2xl text-honeydew"
								/>
							</div>
							<h2 className="text-2xl font-bold text-oxfordBlue font-delius mb-4">
								{error || "Post Not Found"}
							</h2>
							<p className="text-oxfordBlue/70 font-poppins mb-6">
								The blog post you're looking for doesn't exist
								or has been removed.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button
									onClick={() => navigate(-1)}
									className="bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-fredoka font-semibold"
								>
									Go Back
								</button>
								<Link
									to="/blog"
									className="bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-6 py-3 rounded-full hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300 inline-block font-fredoka font-semibold"
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
		<div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16">
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
						className="group flex items-center space-x-2 text-highland hover:text-sark transition-colors font-poppins font-semibold"
					>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className="group-hover:-translate-x-1 transition-transform duration-300"
						/>
						<span>Back to Blog</span>
					</button>
				</motion.div>

				{/* Article */}
				<motion.article
					className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl overflow-hidden border-2 border-oxfordBlue/10"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{/* Header */}
					<div className="p-8 border-b border-oxfordBlue/20">
						<div className="flex flex-wrap gap-3 mb-4">
							<span className="bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-sm font-bold font-poppins shadow-md">
								{post.category}
							</span>
						</div>

						<h1 className="text-3xl lg:text-4xl font-bold text-oxfordBlue font-delius mb-4">
							{post.title}
						</h1>

						<div className="flex items-center space-x-6 text-sm text-oxfordBlue/60 font-poppins">
							<span className="flex items-center">
								<FontAwesomeIcon
									icon={faCalendar}
									className="mr-2 text-highland"
								/>
								{formatDateLong(
									post.published_at || post.created,
								)}
							</span>
						</div>
					</div>

					{/* Content */}
					<div className="p-8">
						<div
							className="prose prose-lg max-w-none text-oxfordBlue font-poppins leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: formatContent(post.content),
							}}
						/>
					</div>

					{/* Tags */}
					{post.tag_list && post.tag_list.length > 0 && (
						<div className="p-8 border-t border-oxfordBlue/20">
							<h3 className="text-lg font-semibold text-oxfordBlue mb-4 flex items-center font-poppins">
								<FontAwesomeIcon
									icon={faTag}
									className="mr-2 text-highland"
								/>
								Tags
							</h3>
							<div className="flex flex-wrap gap-2">
								{post.tag_list.map((tag) => (
									<Link
										key={tag}
										to={`/blog?tags=${tag}`}
										className="bg-oxfordBlue/10 text-oxfordBlue px-3 py-1 rounded-full text-sm font-poppins font-medium border border-oxfordBlue/20 hover:bg-gradient-to-r hover:from-highland hover:to-sark hover:text-honeydew hover:border-highland transition-all duration-300"
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
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-8 border-2 border-oxfordBlue/10">
						<h2 className="text-2xl font-bold text-oxfordBlue font-delius mb-6">
							More from Our Blog
						</h2>
						<p className="text-oxfordBlue/70 font-poppins mb-6">
							Discover more helpful tips and heartwarming stories
							about dog care and adoption.
						</p>
						<Link
							to="/blog"
							className="group inline-flex items-center space-x-2 bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset"
						>
							<span>View All Posts</span>
							<FontAwesomeIcon
								icon={faArrowLeft}
								className="rotate-180 group-hover:translate-x-1 transition-transform duration-300"
							/>
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default BlogPostPage;
