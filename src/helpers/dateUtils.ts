// Utility functions for date formatting

export const formatDate = (dateString: string, options?: {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
}): string => {
  try {
    if (!dateString) {
      return 'Date not available';
    }

    // Handle different date formats
    let date: Date;
    
    // Try parsing as-is first
    date = new Date(dateString);
    
    // If that fails, try some common formats
    if (isNaN(date.getTime())) {
      // Try ISO format with timezone
      if (dateString.includes('T') && dateString.includes('Z')) {
        date = new Date(dateString);
      }
      // Try ISO format without timezone
      else if (dateString.includes('T')) {
        date = new Date(dateString + 'Z');
      }
      // Try YYYY-MM-DD format
      else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        date = new Date(dateString + 'T00:00:00Z');
      }
      // Try DD/MM/YYYY or MM/DD/YYYY
      else if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(dateString)) {
        date = new Date(dateString);
      }
      // Last resort: try parsing as timestamp
      else {
        const timestamp = parseInt(dateString);
        if (!isNaN(timestamp)) {
          date = new Date(timestamp);
        } else {
          return 'Date not available';
        }
      }
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Date not available';
    }

    // Format the date
    const defaultOptions = {
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
    };

    return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
  } catch (error) {
    return 'Date not available';
  }
};

export const formatDateShort = (dateString: string): string => {
  return formatDate(dateString, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to safely get date from post object
export const getPostDate = (post: any, fallbackField?: string): string => {
  // Try common date field names in order of preference
  const dateFields = ['published_at', 'created', 'updated', 'created_at', 'updated_at', 'date'];
  
  for (const field of dateFields) {
    if (post[field]) {
      return formatDate(post[field]);
    }
  }
  
  // Try fallback field if provided
  if (fallbackField && post[fallbackField]) {
    return formatDate(post[fallbackField]);
  }
  
  return 'Date not available';
};

export const formatDateLong = (dateString: string): string => {
  return formatDate(dateString, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
