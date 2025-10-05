import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendar,
	faEye,
	faHeart,
	faComment,
	faClock,
	faUser,
	faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BlogPost } from "../../services/blogApi";

interface BlogCardProps {
	post: BlogPost;
	index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
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

	return (
		<motion.article
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
							<FontAwesomeIcon icon={faClock} className="mr-1" />
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
					{post.tag_list && post.tag_list.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-2">
							{post.tag_list.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className="bg-gray-100 text-oxfordBlue/70 px-2 py-1 rounded text-xs"
								>
									#{tag}
								</span>
							))}
							{post.tag_list.length > 3 && (
								<span className="text-oxfordBlue/50 text-xs">
									+{post.tag_list.length - 3} more
								</span>
							)}
						</div>
					)}
				</div>
			</Link>
		</motion.article>
	);
};

export default BlogCard;
