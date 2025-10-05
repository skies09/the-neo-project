// Blog API service for interacting with the blog endpoints
import axiosService from "../helpers/axios";

// Note: Categories and tags are simple strings in this API
export type BlogCategory = string;
export type BlogTag = string;

export interface BlogAuthor {
  public_id: string;
  name: string;
  username: string;
}

export interface BlogComment {
  public_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  is_approved: boolean;
  is_reply: boolean;
  replies: BlogComment[];
  parent_comment: string | null;
  created: string;
  updated: string;
}

export interface BlogPost {
  public_id: string;
  title: string;
  slug: string;
  excerpt: string;
  excerpt_preview?: string;
  content?: string;
  author: BlogAuthor;
  category: string; // Simple string category
  tags: string; // Comma-separated tags
  tag_list?: string[]; // Parsed tag array (if provided by API)
  featured: 'normal' | 'featured' | 'hero';
  status: 'draft' | 'published' | 'archived';
  is_published?: boolean;
  published_at: string;
  scheduled_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  featured_image?: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  reading_time_minutes: number;
  allow_comments?: boolean;
  can_comment?: boolean;
  comments?: BlogComment[];
  related_posts?: BlogPost[];
  created: string;
  updated: string;
}

export interface BlogListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogPost[];
}

// Note: Categories and tags are extracted from posts, not separate endpoints

export interface BlogFilters {
  search?: string;
  category?: string;
  tags?: string;
  featured?: 'normal' | 'featured' | 'hero';
  author?: string;
  ordering?: 'created' | 'updated' | 'published_at' | 'view_count' | 'like_count';
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
      console.error('Blog API request failed:', error);
      throw error;
    }
  }

  // Helper methods to extract categories and tags from posts
  async getCategories(): Promise<string[]> {
    try {
      const postsResponse = await this.getPosts({ page_size: 100 });
      const categories = new Set<string>();
      postsResponse.results.forEach(post => {
        if (post.category) {
          categories.add(post.category);
        }
      });
      return Array.from(categories).sort();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getTags(): Promise<string[]> {
    try {
      const postsResponse = await this.getPosts({ page_size: 100 });
      const tags = new Set<string>();
      postsResponse.results.forEach(post => {
        if (post.tag_list && Array.isArray(post.tag_list)) {
          post.tag_list.forEach(tag => tags.add(tag));
        } else if (post.tags) {
          // Parse comma-separated tags
          post.tags.split(',').forEach(tag => {
            const trimmedTag = tag.trim();
            if (trimmedTag) tags.add(trimmedTag);
          });
        }
      });
      return Array.from(tags).sort();
    } catch (error) {
      console.error('Error fetching tags:', error);
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
    const endpoint = `/posts/${queryString ? `?${queryString}` : ''}`;
    console.log('Blog API: Fetching posts from:', `${this.baseUrl}${endpoint}`);
    return this.request<BlogListResponse>(endpoint);
  }

  async getPost(publicId: string): Promise<BlogPost> {
    return this.request<BlogPost>(`/posts/${publicId}/`);
  }

  async createPost(postData: Partial<BlogPost>): Promise<BlogPost> {
    return this.request<BlogPost>('/posts/', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(publicId: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    return this.request<BlogPost>(`/posts/${publicId}/`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(publicId: string): Promise<void> {
    return this.request<void>(`/posts/${publicId}/`, {
      method: 'DELETE',
    });
  }

  async trackPostView(publicId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/posts/${publicId}/view/`, {
      method: 'POST',
    });
  }

  async likePost(publicId: string, action: 'like' | 'unlike'): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/posts/${publicId}/like/`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  }

  async getPostComments(publicId: string): Promise<BlogComment[]> {
    return this.request<BlogComment[]>(`/posts/${publicId}/comments/`);
  }

  async createComment(publicId: string, commentData: {
    author_name: string;
    author_email: string;
    content: string;
    parent_comment?: string;
  }): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/posts/${publicId}/comments/`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  // Special endpoints
  async getFeaturedPosts(): Promise<BlogListResponse> {
    return this.request<BlogListResponse>('/posts/featured/');
  }

  async getRecentPosts(): Promise<BlogListResponse> {
    return this.request<BlogListResponse>('/posts/recent/');
  }

  async getPopularPosts(): Promise<BlogListResponse> {
    return this.request<BlogListResponse>('/posts/popular/');
  }

  // Comments (staff only)
  async getComments(filters?: {
    status?: 'pending' | 'approved' | 'rejected' | 'spam';
    is_approved?: boolean;
    post?: string;
    search?: string;
    ordering?: 'created' | 'status';
  }): Promise<BlogComment[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    const queryString = params.toString();
    const endpoint = `/comments/${queryString ? `?${queryString}` : ''}`;
    return this.request<BlogComment[]>(endpoint);
  }

  async approveComment(publicId: string, notes?: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/comments/${publicId}/approve/`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    });
  }

  async rejectComment(publicId: string, notes?: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/comments/${publicId}/reject/`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    });
  }
}

export const blogAPI = new BlogAPI();
export default blogAPI;
