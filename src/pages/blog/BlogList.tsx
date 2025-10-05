import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faFilter,
	faCalendar,
	faEye,
	faHeart,
	faComment,
	faClock,
	faUser,
	faTag,
	faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { blogAPI, BlogPost, BlogFilters } from "../../services/blogApi";
import Footer from "../../components/homepage/Footer";

const BlogList: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<BlogFilters>({
		page: 1,
		page_size: 12,
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [selectedTag, setSelectedTag] = useState<string>("");
	const [showFilters, setShowFilters] = useState(false);

	useEffect(() => {
		fetchData();
	}, [filters]);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);

			console.log("BlogList: Starting to fetch blog data...");
			console.log("BlogList: Current filters:", filters);

			// Get posts and extract categories/tags from them
			const postsResponse = await blogAPI.getPosts(filters);
			console.log("BlogList: Received posts response:", postsResponse);
			setPosts(postsResponse.results);

			// Extract categories and tags from the posts
			const categoriesSet = new Set<string>();
			const tagsSet = new Set<string>();

			postsResponse.results.forEach((post) => {
				if (post.category) {
					categoriesSet.add(post.category);
				}
				if (post.tag_list && Array.isArray(post.tag_list)) {
					post.tag_list.forEach((tag) => tagsSet.add(tag));
				} else if (post.tags) {
					post.tags.split(",").forEach((tag) => {
						const trimmedTag = tag.trim();
						if (trimmedTag) tagsSet.add(trimmedTag);
					});
				}
			});

			setCategories(Array.from(categoriesSet).sort());
			setTags(Array.from(tagsSet).sort());

			console.log("BlogList: Extracted categories and tags from posts");
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Failed to load blog posts";
			setError(errorMessage);
			console.error("Error fetching blog data:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = () => {
		setFilters({
			...filters,
			search: searchTerm || undefined,
			category: selectedCategory || undefined,
			tags: selectedTag || undefined,
			page: 1,
		});
	};

	const handleCategoryFilter = (category: string) => {
		setSelectedCategory(category === selectedCategory ? "" : category);
		setSelectedTag(""); // Clear tag filter when category is selected
	};

	const handleTagFilter = (tag: string) => {
		setSelectedTag(tag === selectedTag ? "" : tag);
		setSelectedCategory(""); // Clear category filter when tag is selected
	};

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedCategory("");
		setSelectedTag("");
		setFilters({
			page: 1,
			page_size: 12,
		});
	};

	const handleRetry = () => {
		setError(null);
		fetchData();
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getFeaturedBadge = (featured: string) => {
		switch (featured) {
			case "hero":
				return (
					<span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-oxfordBlue px-3 py-1 rounded-full text-xs font-bold">
						Hero Post
					</span>
				);
			case "featured":
				return (
					<span className="bg-gradient-to-r from-purple-500 to-pink-500 text-oxfordBlue px-3 py-1 rounded-full text-xs font-bold">
						Featured
					</span>
				);
			default:
				return null;
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
				<div className="max-w-7xl mx-auto px-4 py-12">
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin w-16 h-16 border-4 border-skyBlue border-t-transparent rounded-full"></div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
				<div className="max-w-7xl mx-auto px-4 py-12">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-oxfordBlue mb-4">
							Error
						</h1>
						<p className="text-oxfordBlue/70 mb-4">{error}</p>
						<div className="space-x-4">
							<button
								onClick={handleRetry}
								className="bg-skyBlue text-ghost px-6 py-3 rounded-lg hover:bg-skyBlue/80 transition-colors"
							>
								Try Again
							</button>
							<button
								onClick={() => window.location.reload()}
								className="bg-oxfordBlue text-ghost px-6 py-3 rounded-lg hover:bg-oxfordBlue/80 transition-colors"
							>
								Refresh Page
							</button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16">
			<div className="max-w-7xl mx-auto px-4 py-12">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-5xl font-bold text-oxfordBlue font-poppins mb-4">
						The Neo Project Blog
					</h1>
					<p className="text-xl text-oxfordBlue/70 font-poppins max-w-3xl mx-auto">
						Stories, tips, and updates from our dog rescue community
					</p>
				</motion.div>

				{/* Search and Filters */}
				<motion.div
					className="bg-ghost rounded-2xl shadow-lg p-6 mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<div className="flex flex-col lg:flex-row gap-4">
						{/* Search */}
						<div className="flex-1">
							<div className="relative">
								<FontAwesomeIcon
									icon={faSearch}
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-oxfordBlue/50"
								/>
								<input
									type="text"
									placeholder="Search blog posts..."
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-transparent"
									onKeyPress={(e) =>
										e.key === "Enter" && handleSearch()
									}
								/>
							</div>
						</div>

						{/* Filter Toggle */}
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="flex items-center space-x-2 bg-skyBlue text-ghost px-6 py-3 rounded-lg hover:bg-skyBlue/80 transition-colors"
						>
							<FontAwesomeIcon icon={faFilter} />
							<span>Filters</span>
						</button>

						{/* Search Button */}
						<button
							onClick={handleSearch}
							className="bg-oxfordBlue text-ghost px-6 py-3 rounded-lg hover:bg-oxfordBlue/80 transition-colors"
						>
							Search
						</button>
					</div>

					{/* Filters Panel */}
					{showFilters && (
						<motion.div
							className="mt-6 pt-6 border-t border-gray-200"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							transition={{ duration: 0.3 }}
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Categories */}
								<div>
									<h3 className="font-semibold text-oxfordBlue mb-3 flex items-center">
										<FontAwesomeIcon
											icon={faFolder}
											className="mr-2"
										/>
										Categories
									</h3>
									<div className="space-y-2 max-h-40 overflow-y-auto">
										{categories.map((category) => (
											<button
												key={category}
												onClick={() =>
													handleCategoryFilter(
														category
													)
												}
												className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
													selectedCategory ===
													category
														? "bg-skyBlue text-ghost"
														: "bg-gray-100 hover:bg-gray-200"
												}`}
											>
												<span className="font-medium">
													{category}
												</span>
											</button>
										))}
									</div>
								</div>

								{/* Tags */}
								<div>
									<h3 className="font-semibold text-oxfordBlue mb-3 flex items-center">
										<FontAwesomeIcon
											icon={faTag}
											className="mr-2"
										/>
										Tags
									</h3>
									<div className="space-y-2 max-h-40 overflow-y-auto">
										{tags.slice(0, 10).map((tag) => (
											<button
												key={tag}
												onClick={() =>
													handleTagFilter(tag)
												}
												className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
													selectedTag === tag
														? "bg-skyBlue text-ghost"
														: "bg-gray-100 hover:bg-gray-200"
												}`}
											>
												<span className="font-medium">
													{tag}
												</span>
											</button>
										))}
									</div>
								</div>
							</div>

							{/* Clear Filters */}
							<div className="mt-4 flex justify-end">
								<button
									onClick={clearFilters}
									className="text-oxfordBlue/70 hover:text-oxfordBlue transition-colors"
								>
									Clear all filters
								</button>
							</div>
						</motion.div>
					)}
				</motion.div>

				{/* Blog Posts Grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					{posts.map((post, index) => (
						<motion.article
							key={post.public_id}
							className="bg-ghost rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
						>
							<Link to={`/blog/${post.slug}`}>
								{/* Featured Image */}
								<div className="relative h-48 bg-gradient-to-br from-skyBlue/20 to-aquamarine/20">
									{post.featured_image ? (
										<img
											src={post.featured_image}
											alt={post.title}
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="flex items-center justify-center h-full">
											<FontAwesomeIcon
												icon={faCalendar}
												className="text-4xl text-skyBlue/50"
											/>
										</div>
									)}

									{/* Featured Badge */}
									{getFeaturedBadge(post.featured)}

									{/* Category Badge */}
									<div className="absolute top-4 left-4">
										<span className="bg-skyBlue text-ghost px-3 py-1 rounded-full text-xs font-bold">
											{post.category}
										</span>
									</div>
								</div>

								{/* Content */}
								<div className="p-6">
									<h2 className="text-xl font-bold text-oxfordBlue mb-3 line-clamp-2">
										{post.title}
									</h2>

									<p className="text-oxfordBlue/70 mb-4 line-clamp-3">
										{post.excerpt_preview || post.excerpt}
									</p>

									{/* Meta Information */}
									<div className="flex items-center justify-between text-sm text-oxfordBlue/60 mb-4">
										<div className="flex items-center space-x-4">
											<span className="flex items-center">
												<FontAwesomeIcon
													icon={faUser}
													className="mr-1"
												/>
												{post.author.name}
											</span>
											<span className="flex items-center">
												<FontAwesomeIcon
													icon={faCalendar}
													className="mr-1"
												/>
												{formatDate(post.published_at)}
											</span>
										</div>
										<span className="flex items-center">
											<FontAwesomeIcon
												icon={faClock}
												className="mr-1"
											/>
											{post.reading_time_minutes} min read
										</span>
									</div>

									{/* Engagement Stats */}
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4 text-sm text-oxfordBlue/60">
											<span className="flex items-center">
												<FontAwesomeIcon
													icon={faEye}
													className="mr-1"
												/>
												{post.view_count}
											</span>
											<span className="flex items-center">
												<FontAwesomeIcon
													icon={faHeart}
													className="mr-1"
												/>
												{post.like_count}
											</span>
											<span className="flex items-center">
												<FontAwesomeIcon
													icon={faComment}
													className="mr-1"
												/>
												{post.comment_count}
											</span>
										</div>
									</div>

									{/* Tags */}
									{((post as any).tag_list &&
										(post as any).tag_list.length > 0) ||
									(typeof (post as any).tags === "string" &&
										(post as any).tags.trim().length >
											0) ? (
										<div className="mt-4 flex flex-wrap gap-2">
											{(
												((post as any)
													.tag_list as string[]) ||
												((post as any).tags as string)
													.split(",")
													.map((t) => t.trim())
													.filter(Boolean)
											)
												.slice(0, 3)
												.map((tag: string) => (
													<span
														key={tag}
														className="bg-gray-100 text-oxfordBlue/70 px-2 py-1 rounded text-xs"
													>
														#{tag}
													</span>
												))}
											{(
												((post as any)
													.tag_list as string[]) ||
												((post as any).tags as string)
													.split(",")
													.map((t) => t.trim())
													.filter(Boolean)
											).length > 3 && (
												<span className="text-oxfordBlue/50 text-xs">
													+
													{(
														((post as any)
															.tag_list as string[]) ||
														(
															(post as any)
																.tags as string
														)
															.split(",")
															.map((t) =>
																t.trim()
															)
															.filter(Boolean)
													).length - 3}{" "}
													more
												</span>
											)}
										</div>
									) : null}
								</div>
							</Link>
						</motion.article>
					))}
				</motion.div>

				{/* No Posts Message */}
				{posts.length === 0 && (
					<motion.div
						className="text-center py-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<FontAwesomeIcon
							icon={faCalendar}
							className="text-6xl text-skyBlue/30 mb-4"
						/>
						<h3 className="text-2xl font-bold text-oxfordBlue mb-2">
							No posts found
						</h3>
						<p className="text-oxfordBlue/70 mb-6">
							Try adjusting your search or filters
						</p>
						<button
							onClick={clearFilters}
							className="bg-skyBlue text-ghost px-6 py-3 rounded-lg hover:bg-skyBlue/80 transition-colors"
						>
							Clear Filters
						</button>
					</motion.div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default BlogList;
