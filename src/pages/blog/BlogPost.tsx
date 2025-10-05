import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendar,
	faUser,
	faEye,
	faHeart,
	faComment,
	faClock,
	faTag,
	faFolder,
	faShare,
	faArrowLeft,
	faReply,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { blogAPI, BlogPost, BlogComment } from "../../services/blogApi";
import Footer from "../../components/homepage/Footer";

const BlogPostPage: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const [post, setPost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [commentForm, setCommentForm] = useState({
		author_name: "",
		author_email: "",
		content: "",
	});
	const [submittingComment, setSubmittingComment] = useState(false);
	const [commentSubmitted, setCommentSubmitted] = useState(false);

	useEffect(() => {
		if (slug) {
			fetchPost();
		}
	}, [slug]);

	const fetchPost = async () => {
		if (!slug) return;

		try {
			setLoading(true);
			setError(null);

			console.log("BlogPost: Fetching post for slug:", slug);

			// Find the post by slug in the posts list
			const postsResponse = await blogAPI.getPosts({ page_size: 100 });
			const foundPost = postsResponse.results.find(
				(p) => p.slug === slug
			);

			if (!foundPost) {
				setError("Post not found");
				return;
			}

			// Try to get the full post details
			try {
				const fullPost = await blogAPI.getPost(foundPost.public_id);
				setPost(fullPost);
			} catch (postError) {
				console.warn(
					"Failed to get full post details, using basic post data:",
					postError
				);
				setPost(foundPost);
			}

			// Try to track the view (don't fail if this doesn't work)
			try {
				await blogAPI.trackPostView(foundPost.public_id);
			} catch (trackError) {
				console.warn("Failed to track post view:", trackError);
			}
		} catch (err) {
			console.error("Error fetching blog post:", err);
			setError("Failed to load blog post");
		} finally {
			setLoading(false);
		}
	};

	const handleLike = async () => {
		if (!post) return;

		try {
			await blogAPI.likePost(post.public_id, "like");
			// Refresh the post to get updated like count
			const updatedPost = await blogAPI.getPost(post.public_id);
			setPost(updatedPost);
		} catch (err) {
			console.error("Error liking post:", err);
		}
	};

	const handleCommentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!post || !commentForm.content.trim()) return;

		try {
			setSubmittingComment(true);
			await blogAPI.createComment(post.public_id, commentForm);
			setCommentSubmitted(true);
			setCommentForm({ author_name: "", author_email: "", content: "" });

			// Refresh the post to get updated comments
			const updatedPost = await blogAPI.getPost(post.public_id);
			setPost(updatedPost);
		} catch (err) {
			console.error("Error submitting comment:", err);
		} finally {
			setSubmittingComment(false);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatDateTime = (dateString: string) => {
		return new Date(dateString).toLocaleString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
				<div className="max-w-4xl mx-auto px-4 py-12">
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin w-16 h-16 border-4 border-skyBlue border-t-transparent rounded-full"></div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
				<div className="max-w-4xl mx-auto px-4 py-12">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-oxfordBlue mb-4">
							Error
						</h1>
						<p className="text-oxfordBlue/70 mb-8">
							{error || "Post not found"}
						</p>
						<div className="space-x-4">
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
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
			<div className="max-w-4xl mx-auto px-4 py-12">
				{/* Back Button */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
				>
					<button
						onClick={() => navigate(-1)}
						className="flex items-center space-x-2 text-oxfordBlue/70 hover:text-oxfordBlue transition-colors"
					>
						<FontAwesomeIcon icon={faArrowLeft} />
						<span>Back to Blog</span>
					</button>
				</motion.div>

				{/* Article */}
				<motion.article
					className="bg-ghost rounded-2xl shadow-lg overflow-hidden"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{/* Featured Image */}
					{post.featured_image && (
						<div className="relative h-64 md:h-96">
							<img
								src={post.featured_image}
								alt={post.title}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
						</div>
					)}

					{/* Content */}
					<div className="p-8">
						{/* Category and Featured Badge */}
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center space-x-3">
								<span className="bg-skyBlue text-ghost px-3 py-1 rounded-full text-sm font-bold">
									{post.category}
								</span>
								{post.featured !== "normal" && (
									<span className="bg-gradient-to-r from-purple-500 to-pink-500 text-oxfordBlue px-3 py-1 rounded-full text-sm font-bold">
										{post.featured === "hero"
											? "Hero Post"
											: "Featured"}
									</span>
								)}
							</div>
						</div>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl font-bold text-oxfordBlue font-poppins mb-6">
							{post.title}
						</h1>

						{/* Meta Information */}
						<div className="flex flex-wrap items-center gap-6 text-oxfordBlue/70 mb-8">
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faUser} />
								<span>{post.author.name}</span>
							</div>
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faCalendar} />
								<span>{formatDate(post.published_at)}</span>
							</div>
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faClock} />
								<span>
									{post.reading_time_minutes} min read
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faEye} />
								<span>{post.view_count} views</span>
							</div>
						</div>

						{/* Excerpt */}
						<div className="text-xl text-oxfordBlue/80 font-poppins mb-8 leading-relaxed">
							{post.excerpt}
						</div>

						{/* Tags */}
						{post.tag_list && post.tag_list.length > 0 && (
							<div className="mb-8">
								<h3 className="text-lg font-semibold text-oxfordBlue mb-3 flex items-center">
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

						{/* Content */}
						<div
							className="prose prose-lg max-w-none text-oxfordBlue/80 leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: post.content || "",
							}}
						/>

						{/* Engagement Actions */}
						<div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
							<div className="flex items-center space-x-6">
								<button
									onClick={handleLike}
									className="flex items-center space-x-2 text-oxfordBlue/70 hover:text-red-500 transition-colors"
								>
									<FontAwesomeIcon icon={faHeart} />
									<span>{post.like_count} likes</span>
								</button>
								<div className="flex items-center space-x-2 text-oxfordBlue/70">
									<FontAwesomeIcon icon={faComment} />
									<span>{post.comment_count} comments</span>
								</div>
							</div>
							<button className="flex items-center space-x-2 text-oxfordBlue/70 hover:text-oxfordBlue transition-colors">
								<FontAwesomeIcon icon={faShare} />
								<span>Share</span>
							</button>
						</div>
					</div>
				</motion.article>

				{/* Comments Section */}
				{post.allow_comments && (
					<motion.div
						className="mt-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<div className="bg-ghost rounded-2xl shadow-lg p-8">
							<h2 className="text-3xl font-bold text-oxfordBlue mb-8">
								Comments ({post.comment_count})
							</h2>

							{/* Comment Form */}
							{post.can_comment && (
								<div className="mb-8">
									{commentSubmitted ? (
										<div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
											<p className="text-green-800">
												Thank you for your comment! It's
												been submitted for moderation.
											</p>
										</div>
									) : (
										<form
											onSubmit={handleCommentSubmit}
											className="space-y-4"
										>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-medium text-oxfordBlue mb-2">
														Name *
													</label>
													<input
														type="text"
														required
														value={
															commentForm.author_name
														}
														onChange={(e) =>
															setCommentForm({
																...commentForm,
																author_name:
																	e.target
																		.value,
															})
														}
														className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-transparent"
														placeholder="Your name"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-oxfordBlue mb-2">
														Email *
													</label>
													<input
														type="email"
														required
														value={
															commentForm.author_email
														}
														onChange={(e) =>
															setCommentForm({
																...commentForm,
																author_email:
																	e.target
																		.value,
															})
														}
														className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-transparent"
														placeholder="your@email.com"
													/>
												</div>
											</div>
											<div>
												<label className="block text-sm font-medium text-oxfordBlue mb-2">
													Comment *
												</label>
												<textarea
													required
													rows={4}
													value={commentForm.content}
													onChange={(e) =>
														setCommentForm({
															...commentForm,
															content:
																e.target.value,
														})
													}
													className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-transparent"
													placeholder="Share your thoughts..."
												/>
											</div>
											<button
												type="submit"
												disabled={submittingComment}
												className="bg-skyBlue text-ghost px-6 py-3 rounded-lg hover:bg-skyBlue/80 transition-colors disabled:opacity-50"
											>
												{submittingComment
													? "Submitting..."
													: "Submit Comment"}
											</button>
										</form>
									)}
								</div>
							)}

							{/* Comments List */}
							{post.comments && post.comments.length > 0 ? (
								<div className="space-y-6">
									{post.comments.map((comment) => (
										<div
											key={comment.public_id}
											className="border-l-4 border-skyBlue pl-6"
										>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center space-x-3">
													<h4 className="font-semibold text-oxfordBlue">
														{comment.author_name}
													</h4>
													<span className="text-sm text-oxfordBlue/60">
														{formatDateTime(
															comment.created
														)}
													</span>
												</div>
											</div>
											<p className="text-oxfordBlue/80 leading-relaxed">
												{comment.content}
											</p>
										</div>
									))}
								</div>
							) : (
								<div className="text-center py-8">
									<FontAwesomeIcon
										icon={faComment}
										className="text-4xl text-skyBlue/30 mb-4"
									/>
									<p className="text-oxfordBlue/70">
										No comments yet. Be the first to share
										your thoughts!
									</p>
								</div>
							)}
						</div>
					</motion.div>
				)}

				{/* Related Posts */}
				{post.related_posts && post.related_posts.length > 0 && (
					<motion.div
						className="mt-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						<div className="bg-ghost rounded-2xl shadow-lg p-8">
							<h2 className="text-3xl font-bold text-oxfordBlue mb-8">
								Related Posts
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{post.related_posts.map((relatedPost) => (
									<Link
										key={relatedPost.public_id}
										to={`/blog/${relatedPost.slug}`}
										className="group block"
									>
										<div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
											<h3 className="text-lg font-semibold text-oxfordBlue group-hover:text-skyBlue transition-colors mb-2">
												{relatedPost.title}
											</h3>
											<p className="text-oxfordBlue/70 text-sm line-clamp-2">
												{relatedPost.excerpt}
											</p>
											<div className="flex items-center justify-between mt-4 text-sm text-oxfordBlue/60">
												<span>
													{relatedPost.author.name}
												</span>
												<span>
													{formatDate(
														relatedPost.published_at
													)}
												</span>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default BlogPostPage;
