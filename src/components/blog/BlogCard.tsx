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
      className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link to={`/blog/${post.public_id}`}>
        {/* Featured Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-highland/20 to-sark/20 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center shadow-lg">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-2xl text-honeydew"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-xs font-bold font-poppins shadow-md">
              {post.category}
            </span>
          </div>

          <h3 className="text-xl font-bold text-oxfordBlue mb-3 line-clamp-2 font-delius group-hover:text-highland transition-colors">
            {post.title}
          </h3>

          <p className="text-oxfordBlue/70 mb-4 line-clamp-3 font-poppins">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center text-sm text-oxfordBlue/60 mb-4 font-poppins">
            <span className="flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-2 text-highland" />
              {formatDateShort(post.published_at || post.created)}
            </span>
          </div>

          {/* Tags */}
          {post.tag_list && post.tag_list.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tag_list.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="bg-oxfordBlue/10 text-oxfordBlue px-2 py-1 rounded-full text-xs font-poppins font-medium border border-oxfordBlue/20"
                >
                  #{tag}
                </span>
              ))}
              {post.tag_list.length > 3 && (
                <span className="text-oxfordBlue/50 text-xs font-poppins">
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