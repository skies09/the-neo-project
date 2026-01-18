import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faFilter,
	faCalendar,
	faTag,
	faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { blogAPI, BlogPost, BlogFilters } from "../../services/blogApi";
import { formatDateLong } from "../../helpers/dateUtils";
import PawLoading from "../../components/PawLoading";

const BlogList: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [showFilters, setShowFilters] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalPostCount, setTotalPostCount] = useState(0);

	const fetchPosts = async () => {
		try {
			setLoading(true);
			setError(null);

			const filters: BlogFilters = {
				page: currentPage,
				page_size: 12,
			};

			if (searchTerm) {
				filters.search = searchTerm;
			}
			if (selectedCategory) {
				filters.category = selectedCategory;
			}
			if (selectedTag) {
				filters.tags = selectedTag;
			}

			const response = await blogAPI.getPosts(filters);
			setPosts(response.results);
			setTotalPages(Math.ceil(response.count / 12));

			// Track total count when no filters are applied
			if (!searchTerm && !selectedCategory && !selectedTag) {
				setTotalPostCount(response.count);
			}
		} catch (err) {
			console.error("Error fetching posts:", err);
			setError("Failed to load blog posts, please check back later");
		} finally {
			setLoading(false);
		}
	};

	const fetchCategoriesAndTags = async () => {
		try {
			const [categoriesData, tagsData] = await Promise.all([
				blogAPI.getCategories(),
				blogAPI.getTags(),
			]);
			setCategories(categoriesData);
			setTags(tagsData);
		} catch (err) {
			console.error("Error fetching categories and tags:", err);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [currentPage, selectedCategory, selectedTag]);

	useEffect(() => {
		fetchCategoriesAndTags();
	}, []);

	const handleSearch = () => {
		setCurrentPage(1);
		fetchPosts();
	};

	const handleCategoryFilter = (category: string) => {
		setSelectedCategory(selectedCategory === category ? null : category);
		setCurrentPage(1);
	};

	const handleTagFilter = (tag: string) => {
		setSelectedTag(selectedTag === tag ? null : tag);
		setCurrentPage(1);
	};

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedCategory(null);
		setSelectedTag(null);
		setCurrentPage(1);
	};

	const handleRetry = () => {
		fetchPosts();
		fetchCategoriesAndTags();
	};

	if (loading && posts.length === 0) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-skyBlue/5 to-aquamarine/5 pt-16 relative">
				<div className="max-w-7xl mx-auto px-4 py-20">
					<div className="text-center">
						<p className="text-oxfordBlue/70 font-poppins">
							Fetching blog posts...
						</p>
						<PawLoading />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-16 bg-gradient-to-br from-honeydew to-mintCream">
			<div className="max-w-7xl mx-auto px-4 pt-4 pb-12">
				{/* Header */}
				<motion.div
					className={`text-center ${error ? "mb-0" : "mb-12"}`}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex justify-center items-center my-4">
						<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center">
							Our Blog
						</h1>
					</div>
					<p className="text-lg lg:text-xl text-highland font-fredoka max-w-4xl mx-auto mb-8">
						Discover helpful tips, heartwarming stories, and expert
						advice about dog care and adoption.
					</p>
				</motion.div>

				{/* Error Message */}
				{error && (
					<motion.div
						className="max-w-7xl mx-auto pt-8 min-h-screen"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.3,
							ease: "easeOut",
						}}
					>
						<div className="flex flex-col justify-center items-center py-12 bg-gradient-to-br from-tara to-mintCream rounded-3xl shadow-xl border-2 border-oxfordBlue/20">
							<div className="w-16 h-16 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
								<FontAwesomeIcon
									icon={faSearch}
									className="text-2xl text-honeydew"
								/>
							</div>
							<p className="text-lg lg:text-xl text-oxfordBlue font-poppins max-w-5xl mx-auto text-center">
								{error}
							</p>
						</div>
					</motion.div>
				)}

				{/* Search and Filters */}
				{totalPostCount > 0 && !error && (
					<motion.div
						className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-6 mb-8 border-2 border-oxfordBlue/10"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="flex flex-col lg:flex-row gap-4 mb-4">
							<div className="flex-1">
								<div className="relative">
									<FontAwesomeIcon
										icon={faSearch}
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-highland"
									/>
									<input
										type="text"
										placeholder="Search blog posts..."
										value={searchTerm}
										onChange={(e) =>
											setSearchTerm(e.target.value)
										}
										onKeyPress={(e) =>
											e.key === "Enter" && handleSearch()
										}
										className="w-full pl-10 pr-4 py-3 border-2 border-oxfordBlue/20 rounded-full focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins"
									/>
								</div>
							</div>
							<button
								onClick={handleSearch}
								className="bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-fredoka font-semibold"
							>
								Search
							</button>
							<button
								onClick={() => setShowFilters(!showFilters)}
								className="flex items-center space-x-2 bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-6 py-3 rounded-full hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300 font-fredoka font-semibold"
							>
								<FontAwesomeIcon icon={faFilter} />
								<span>Filters</span>
							</button>
						</div>

						{/* Filters Panel */}
						{showFilters && (
							<motion.div
								className="border-t border-gray-200 pt-4"
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								transition={{ duration: 0.3 }}
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Categories */}
									<div>
										<h3 className="font-semibold text-oxfordBlue mb-3 flex items-center font-poppins">
											<FontAwesomeIcon
												icon={faFolder}
												className="mr-2 text-highland"
											/>
											Categories
										</h3>
										<div className="space-y-2 max-h-40 overflow-y-auto">
											{categories.map((category) => (
												<button
													key={category}
													onClick={() =>
														handleCategoryFilter(
															category,
														)
													}
													className={`w-full text-left px-3 py-2 rounded-full transition-all duration-300 font-poppins ${
														selectedCategory ===
														category
															? "bg-gradient-to-r from-highland to-sark text-honeydew shadow-md"
															: "bg-white/80 text-oxfordBlue hover:bg-oxfordBlue hover:text-honeydew border border-oxfordBlue/20"
													}`}
												>
													{category}
												</button>
											))}
										</div>
									</div>

									{/* Tags */}
									<div>
										<h3 className="font-semibold text-oxfordBlue mb-3 flex items-center font-poppins">
											<FontAwesomeIcon
												icon={faTag}
												className="mr-2 text-highland"
											/>
											Tags
										</h3>
										<div className="space-y-2 max-h-40 overflow-y-auto">
											{tags.map((tag) => (
												<button
													key={tag}
													onClick={() =>
														handleTagFilter(tag)
													}
													className={`w-full text-left px-3 py-2 rounded-full transition-all duration-300 font-poppins ${
														selectedTag === tag
															? "bg-gradient-to-r from-highland to-sark text-honeydew shadow-md"
															: "bg-white/80 text-oxfordBlue hover:bg-oxfordBlue hover:text-honeydew border border-oxfordBlue/20"
													}`}
												>
													#{tag}
												</button>
											))}
										</div>
									</div>
								</div>

								{/* Clear Filters */}
								{(selectedCategory ||
									selectedTag ||
									searchTerm) && (
									<div className="mt-4 pt-4 border-t border-oxfordBlue/20">
										<button
											onClick={clearFilters}
											className="bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-fredoka font-semibold"
										>
											Clear All Filters
										</button>
									</div>
								)}
							</motion.div>
						)}
					</motion.div>
				)}

				{/* Active Filters */}
				{!error && (selectedCategory || selectedTag || searchTerm) && (
					<motion.div
						className="mb-6"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex flex-wrap gap-2">
							{searchTerm && (
								<span className="bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-sm flex items-center font-poppins shadow-md">
									Search: "{searchTerm}"
									<button
										onClick={() => setSearchTerm("")}
										className="ml-2 hover:text-sunset transition-colors"
									>
										×
									</button>
								</span>
							)}
							{selectedCategory && (
								<span className="bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-sm flex items-center font-poppins shadow-md">
									Category: {selectedCategory}
									<button
										onClick={() =>
											setSelectedCategory(null)
										}
										className="ml-2 hover:text-sunset transition-colors"
									>
										×
									</button>
								</span>
							)}
							{selectedTag && (
								<span className="bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-sm flex items-center font-poppins shadow-md">
									Tag: #{selectedTag}
									<button
										onClick={() => setSelectedTag(null)}
										className="ml-2 hover:text-sunset transition-colors"
									>
										×
									</button>
								</span>
							)}
						</div>
					</motion.div>
				)}

				{/* Posts Grid */}
				{!error && totalPostCount > 0 && (
					<>
						{posts.length > 0 ? (
							<motion.div
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								{posts.map((post) => (
									<motion.article
										key={post.public_id}
										className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
										whileHover={{ scale: 1.02 }}
										transition={{ duration: 0.2 }}
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

											{/* Content */}
											<div className="p-6">
												<h2 className="text-xl font-bold text-oxfordBlue mb-3 line-clamp-2 font-delius group-hover:text-highland transition-colors">
													{post.title}
												</h2>

												<p className="text-oxfordBlue/70 mb-4 line-clamp-3 font-poppins">
													{post.excerpt}
												</p>

												{/* Meta Information */}
												<div className="flex items-center justify-between text-sm text-oxfordBlue/60 mb-4 font-poppins">
													<span className="flex items-center">
														<FontAwesomeIcon
															icon={faCalendar}
															className="mr-2 text-highland"
														/>
														{formatDateLong(
															post.published_at ||
																post.created,
														)}
													</span>
												</div>

												{/* Tags */}
												{post.tag_list &&
													post.tag_list.length >
														0 && (
														<div className="mt-4 flex flex-wrap gap-2">
															{post.tag_list
																.slice(0, 3)
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
																			#
																			{
																				tag
																			}
																		</span>
																	),
																)}
															{post.tag_list
																.length > 3 && (
																<span className="text-oxfordBlue/50 text-xs font-poppins">
																	+
																	{post
																		.tag_list
																		.length -
																		3}{" "}
																	more
																</span>
															)}
														</div>
													)}
											</div>
										</Link>
									</motion.article>
								))}
							</motion.div>
						) : (
							<motion.div
								className="text-center py-12"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.6 }}
							>
								<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-2 border-oxfordBlue/10">
									<div className="w-16 h-16 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
										<FontAwesomeIcon
											icon={faSearch}
											className="text-2xl text-honeydew"
										/>
									</div>
									<h3 className="text-2xl font-bold text-oxfordBlue font-delius mb-2">
										No Posts Found
									</h3>
									<p className="text-oxfordBlue/70 font-poppins mb-6">
										Try adjusting your search terms or
										filters to find what you're looking for.
									</p>
									<button
										onClick={clearFilters}
										className="bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-fredoka font-semibold"
									>
										Clear Filters
									</button>
								</div>
							</motion.div>
						)}
					</>
				)}

				{/* Pagination */}
				{!error && totalPages > 1 && (
					<motion.div
						className="flex justify-center mt-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						<div className="flex space-x-2">
							<button
								onClick={() =>
									setCurrentPage(Math.max(1, currentPage - 1))
								}
								disabled={currentPage === 1}
								className="px-6 py-3 bg-gradient-to-r from-highland to-sark text-honeydew rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none font-fredoka font-semibold"
							>
								Previous
							</button>
							<span className="px-6 py-3 bg-gradient-to-br from-tara to-mintCream text-oxfordBlue rounded-full border-2 border-oxfordBlue/20 font-poppins font-semibold">
								Page {currentPage} of {totalPages}
							</span>
							<button
								onClick={() =>
									setCurrentPage(
										Math.min(totalPages, currentPage + 1),
									)
								}
								disabled={currentPage === totalPages}
								className="px-6 py-3 bg-gradient-to-r from-highland to-sark text-honeydew rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none font-fredoka font-semibold"
							>
								Next
							</button>
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default BlogList;
