// Contact API service for handling contact form submissions
export interface ContactFormData {
  name: string;
  email: string;
  contact_number: string;
  address_line_1?: string;
  town?: string;
  city?: string;
  postcode?: string;
  contact_type: 'general' | 'rescue_signup' | 'adoption_inquiry' | 'support' | 'other';
  subject?: string;
  message: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ContactResponse {
  message: string;
  contact_id: string;
  status: 'success' | 'error';
}

export interface ContactError {
  message: string;
  errors?: Record<string, string[]>;
  status: 'error';
}

class ContactApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_NEO_PROJECT_BASE_URL || '';
  }

  async submitContact(contactData: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await fetch(`${this.baseUrl}api/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form');
      }

      return data;
    } catch (error) {
      console.error('Contact submission error:', error);
      throw error;
    }
  }

  async submitGeneralContact(formData: {
    name: string;
    email: string;
    contact_number: string;
    subject?: string;
    message: string;
  }): Promise<ContactResponse> {
    const contactData: ContactFormData = {
      ...formData,
      contact_type: 'general',
      priority: 'medium',
    };

    return this.submitContact(contactData);
  }

  async submitRescueSignup(formData: {
    name: string;
    email: string;
    contact_number: string;
    address_line_1?: string;
    town?: string;
    city?: string;
    postcode?: string;
    message: string;
  }): Promise<ContactResponse> {
    const contactData: ContactFormData = {
      ...formData,
      contact_type: 'rescue_signup',
      priority: 'high',
      subject: 'Rescue Center Signup Request',
    };

    return this.submitContact(contactData);
  }

  async submitAdoptionInquiry(formData: {
    name: string;
    email: string;
    contact_number: string;
    message: string;
  }): Promise<ContactResponse> {
    const contactData: ContactFormData = {
      ...formData,
      contact_type: 'adoption_inquiry',
      priority: 'medium',
      subject: 'Dog Adoption Inquiry',
    };

    return this.submitContact(contactData);
  }

  async submitSupportRequest(formData: {
    name: string;
    email: string;
    contact_number: string;
    message: string;
  }): Promise<ContactResponse> {
    const contactData: ContactFormData = {
      ...formData,
      contact_type: 'support',
      priority: 'medium',
      subject: 'Support Request',
    };

    return this.submitContact(contactData);
  }
}

export const contactApiService = new ContactApiService();
