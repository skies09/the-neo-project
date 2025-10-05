import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BlogCategory } from "../../services/blogApi";

interface CategoryCardProps {
	category: BlogCategory;
	index?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index = 0 }) => {
	return (
		<motion.div
			className="bg-ghost rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
		>
			<Link to={`/blog?category=${category.public_id}`}>
				<div className="flex items-start space-x-4">
					{/* Category Icon */}
					<div
						className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-ghost"
						style={{ backgroundColor: category.color }}
					>
						<FontAwesomeIcon icon={faFolder} className="text-xl" />
					</div>

					{/* Category Info */}
					<div className="flex-1">
						<h3 className="text-xl font-bold text-oxfordBlue mb-2 hover:text-skyBlue transition-colors">
							{category.name}
						</h3>
						<p className="text-oxfordBlue/70 mb-3 line-clamp-2">
							{category.description}
						</p>

						{/* Post Count */}
						<div className="flex items-center text-sm text-oxfordBlue/60">
							<FontAwesomeIcon
								icon={faFileAlt}
								className="mr-2"
							/>
							<span>{category.post_count} posts</span>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default CategoryCard;
