// Blog API service for the simplified blog system
import axiosService from "../helpers/axios";

// Simplified blog post interface matching the actual API response
export interface BlogPost {
	public_id: string;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	category: string;
	tags: string;
	tag_list: string[];
	is_published: boolean;
	created: string;
	published_at: string;
	updated: string;
	featured_image: string | null;
	author: {
		public_id: string;
		name: string;
		username: string;
	};
}

export interface BlogListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: BlogPost[];
}

export interface BlogFilters {
	search?: string;
	category?: string;
	tags?: string;
	page?: number;
	page_size?: number;
}

class BlogAPI {
	constructor() {
		// Use the existing axiosService which already has the correct base URL
	}

	private async request<T>(endpoint: string, options: any = {}): Promise<T> {
		try {
			const response = await axiosService.request({
				url: `/api/blog${endpoint}`,
				...options,
			});
			return response.data;
		} catch (error) {
			console.error("Blog API request failed:", error);
			throw error;
		}
	}

	// Helper methods to extract categories and tags from posts
	async getCategories(): Promise<string[]> {
		try {
			const postsResponse = await this.getPosts({ page_size: 100 });
			const categories = new Set<string>();
			postsResponse.results.forEach((post) => {
				if (post.category) {
					categories.add(post.category);
				}
			});
			return Array.from(categories).sort();
		} catch (error) {
			console.error("Error fetching categories:", error);
			return [];
		}
	}

	async getTags(): Promise<string[]> {
		try {
			const postsResponse = await this.getPosts({ page_size: 100 });
			const tags = new Set<string>();
			postsResponse.results.forEach((post) => {
				if (post.tags) {
					// Parse comma-separated tags
					post.tags.split(",").forEach((tag) => {
						const trimmedTag = tag.trim();
						if (trimmedTag) tags.add(trimmedTag);
					});
				}
			});
			return Array.from(tags).sort();
		} catch (error) {
			console.error("Error fetching tags:", error);
			return [];
		}
	}

	// Blog Posts
	async getPosts(filters?: BlogFilters): Promise<BlogListResponse> {
		const params = new URLSearchParams();
		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					params.append(key, value.toString());
				}
			});
		}
		const queryString = params.toString();
		const endpoint = `/posts/${queryString ? `?${queryString}` : ""}`;
		return this.request<BlogListResponse>(endpoint);
	}

	async getPost(publicId: string): Promise<BlogPost> {
		return this.request<BlogPost>(`/posts/${publicId}/`);
	}

	// For compatibility with existing code that might use slug-based routing
	async getPostBySlug(slug: string): Promise<BlogPost | null> {
		try {
			// Search for post by slug
			const posts = await this.getPosts({ search: slug });
			return posts.results[0] || null;
		} catch (error) {
			console.error("Error fetching post by slug:", error);
			return null;
		}
	}
}

export const blogAPI = new BlogAPI();
export default blogAPI;
