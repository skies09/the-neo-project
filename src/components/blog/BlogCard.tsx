import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BlogPost } from "../../services/blogApi";
import { formatDateShort } from "../../helpers/dateUtils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
  // Using the utility function for date formatting

  return (
    <motion.article
      className="bg-lace rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.public_id}`}>
        {/* Featured Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-skyBlue/20 to-aquamarine/20 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faCalendar}
            className="text-4xl text-skyBlue/50"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="bg-skyBlue text-ghost px-3 py-1 rounded-full text-xs font-bold">
              {post.category}
            </span>
          </div>

          <h3 className="text-xl font-bold text-oxfordBlue mb-3 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-oxfordBlue/70 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center text-sm text-oxfordBlue/60 mb-4">
            <span className="flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-1" />
              {formatDateShort(post.published_at || post.created)}
            </span>
          </div>

          {/* Tags */}
          {post.tag_list && post.tag_list.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tag_list.slice(0, 3).map((tag: string) => (
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