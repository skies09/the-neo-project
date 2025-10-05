import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faFilter,
	faFolder,
	faTag,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { BlogFilters } from "../../services/blogApi";

interface BlogSearchProps {
	categories: string[];
	tags: string[];
	filters: BlogFilters;
	onFiltersChange: (filters: BlogFilters) => void;
	onSearch: () => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({
	categories,
	tags,
	filters,
	onFiltersChange,
	onSearch,
}) => {
	const [searchTerm, setSearchTerm] = useState(filters.search || "");
	const [selectedCategory, setSelectedCategory] = useState(
		filters.category || ""
	);
	const [selectedTag, setSelectedTag] = useState(filters.tags || "");
	const [showFilters, setShowFilters] = useState(false);

	const handleSearch = () => {
		onFiltersChange({
			...filters,
			search: searchTerm || undefined,
			category: selectedCategory || undefined,
			tags: selectedTag || undefined,
			page: 1,
		});
		onSearch();
	};

	const handleCategoryFilter = (category: string) => {
		const newCategory = category === selectedCategory ? "" : category;
		setSelectedCategory(newCategory);
		setSelectedTag(""); // Clear tag filter when category is selected
	};

	const handleTagFilter = (tag: string) => {
		const newTag = tag === selectedTag ? "" : tag;
		setSelectedTag(newTag);
		setSelectedCategory(""); // Clear category filter when tag is selected
	};

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedCategory("");
		setSelectedTag("");
		onFiltersChange({
			page: 1,
			page_size: filters.page_size || 12,
		});
	};

	const hasActiveFilters = searchTerm || selectedCategory || selectedTag;

	return (
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
							onChange={(e) => setSearchTerm(e.target.value)}
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
					className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
						showFilters || hasActiveFilters
							? "bg-skyBlue text-white"
							: "bg-gray-100 text-oxfordBlue hover:bg-gray-200"
					}`}
				>
					<FontAwesomeIcon icon={faFilter} />
					<span>Filters</span>
					{hasActiveFilters && (
						<span className="bg-ghost text-skyBlue rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
							!
						</span>
					)}
				</button>

				{/* Search Button */}
				<button
					onClick={handleSearch}
					className="bg-oxfordBlue text-ghost px-6 py-3 rounded-lg hover:bg-oxfordBlue/80 transition-colors"
				>
					Search
				</button>
			</div>

			{/* Active Filters */}
			{hasActiveFilters && (
				<div className="mt-4 flex flex-wrap gap-2">
					{searchTerm && (
						<span className="bg-skyBlue text-ghost px-3 py-1 rounded-full text-sm flex items-center">
							Search: "{searchTerm}"
							<button
								onClick={() => setSearchTerm("")}
								className="ml-2 hover:bg-skyBlue/80 rounded-full w-4 h-4 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faTimes}
									className="text-xs"
								/>
							</button>
						</span>
					)}
					{selectedCategory && (
						<span className="bg-purple-500 text-ghost px-3 py-1 rounded-full text-sm flex items-center">
							Category: {selectedCategory}
							<button
								onClick={() => setSelectedCategory("")}
								className="ml-2 hover:bg-purple-600 rounded-full w-4 h-4 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faTimes}
									className="text-xs"
								/>
							</button>
						</span>
					)}
					{selectedTag && (
						<span className="bg-green-500 text-ghost px-3 py-1 rounded-full text-sm flex items-center">
							Tag: {selectedTag}
							<button
								onClick={() => setSelectedTag("")}
								className="ml-2 hover:bg-green-600 rounded-full w-4 h-4 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faTimes}
									className="text-xs"
								/>
							</button>
						</span>
					)}
					<button
						onClick={clearFilters}
						className="text-oxfordBlue/70 hover:text-oxfordBlue transition-colors text-sm"
					>
						Clear all
					</button>
				</div>
			)}

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
											handleCategoryFilter(category)
										}
										className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
											selectedCategory === category
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
										onClick={() => handleTagFilter(tag)}
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
				</motion.div>
			)}
		</motion.div>
	);
};

export default BlogSearch;
