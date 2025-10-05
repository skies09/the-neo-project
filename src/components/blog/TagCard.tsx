import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BlogTag } from "../../services/blogApi";

interface TagCardProps {
	tag: BlogTag;
	index?: number;
}

const TagCard: React.FC<TagCardProps> = ({ tag, index = 0 }) => {
	return (
		<motion.div
			className="bg-ghost rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
		>
			<Link to={`/blog?tag=${tag.public_id}`}>
				<div className="flex items-start space-x-4">
					{/* Tag Icon */}
					<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-skyBlue to-aquamarine flex items-center justify-center text-ghost">
						<FontAwesomeIcon icon={faTag} className="text-xl" />
					</div>

					{/* Tag Info */}
					<div className="flex-1">
						<h3 className="text-xl font-bold text-oxfordBlue mb-2 hover:text-skyBlue transition-colors">
							#{tag.name}
						</h3>
						<p className="text-oxfordBlue/70 mb-3 line-clamp-2">
							{tag.description}
						</p>

						{/* Post Count */}
						<div className="flex items-center text-sm text-oxfordBlue/60">
							<FontAwesomeIcon
								icon={faFileAlt}
								className="mr-2"
							/>
							<span>{tag.post_count} posts</span>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default TagCard;
