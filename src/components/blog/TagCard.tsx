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
			className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ scale: 1.02 }}
		>
			<Link to={`/blog?tag=${tag.public_id}`}>
				<div className="flex items-start space-x-4">
					{/* Tag Icon */}
					<div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-highland to-sark flex items-center justify-center text-honeydew shadow-lg">
						<FontAwesomeIcon icon={faTag} className="text-xl" />
					</div>

					{/* Tag Info */}
					<div className="flex-1">
						<h3 className="text-xl font-bold text-oxfordBlue mb-2 hover:text-highland transition-colors font-delius">
							#{tag.name}
						</h3>
						<p className="text-oxfordBlue/70 mb-3 line-clamp-2 font-poppins">
							{tag.description}
						</p>

						{/* Post Count */}
						<div className="flex items-center text-sm text-oxfordBlue/60 font-poppins">
							<FontAwesomeIcon
								icon={faFileAlt}
								className="mr-2 text-highland"
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
