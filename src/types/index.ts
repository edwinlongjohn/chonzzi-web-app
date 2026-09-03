export interface User {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "user" | "super_admin";
  is_active: boolean;
  email_verified?: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  avatar_url?: string;
  bio?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  x?: string;
  preferences?: {
    theme?: "light" | "dark" | "system";
    language?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
    };
  };
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile
  extends
    User,
    Omit<Partial<Profile>, "user_id" | "created_at" | "updated_at" | "id"> {}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: UserWithProfile;
  tokens: Tokens;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "admin" | "user" | "super_admin";
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileData {
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  x?: string;
  preferences?: {
    theme?: "light" | "dark" | "system";
    language?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
    };
  };
}

export interface UserFilters {
  search?: string;
  role?: "admin" | "user" | "super_admin";
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Blog Types
export type BlogStatus = "draft" | "scheduled" | "published";
export type BlogCategory = "letters" | "character_stories" | "women_stories" | "others";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  status: BlogStatus;
  author_id: string;
  author?: {
    id: string;
    full_name: string;
    email: string;
  };
  image_url: string | null;
  scheduled_publish_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: BlogStatus;
  author_id?: string;
  image_url?: string | null;
  scheduled_publish_at?: string | null;
}

export interface UpdateBlogData {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  status?: BlogStatus;
  image_url?: string | null;
  scheduled_publish_at?: string | null;
}

export interface GetBlogsParams {
  status?: BlogStatus | string;
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface BlogsResponse {
  data: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogStats {
  stats: {
    total: number;
    published: number;
    draft: number;
    scheduled: number;
  };
}

export interface PublishScheduledResponse {
  published_count: number;
  published_ids: string[];
}

export interface SubscribeData {
  email: string;
  name?: string;
  recaptchaToken?: string;
}

export interface UnsubscribeData {
  email: string;
}

export interface UpdateSubscriberStatusData {
  status: "subscribed" | "unsubscribed";
}

export interface SubscribeResponse {
  id: string;
  email: string;
  name: string | null;
  status: "subscribed" | "unsubscribed";
  source: string;
  created_at: string;
}

export type SubscriberStatus = "subscribed" | "unsubscribed";

export interface Subscriber {
  id: string;
  name: string | null;
  email: string;
  status: SubscriberStatus;
  created_at: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export interface CreateSubscriberData {
  email: string;
  name?: string | null;
  source?: string;
}

export interface UpdateSubscriberData {
  name?: string | null;
  status?: SubscriberStatus;
  unsubscribed_at?: string | null;
}

export interface GetSubscribersParams {
  status?: SubscriberStatus | string;
  search?: string;
  page?: number;
  limit?: number;
}

export type WaitlistStatus = "pending" | "contacted" | "enrolled" | "archived";

export interface WaitlistEntry {
  id: string;
  email: string;
  name: string;
  status: WaitlistStatus;
  admin_notes: string | null;
  source?: string;
  created_at: string;
  updated_at: string;
}

export interface JoinWaitlistData {
  email: string;
  name: string;
  source?: string;
}

export interface UpdateWaitlistStatusData {
  status: WaitlistStatus;
  admin_notes?: string;
}

export interface UpdateWaitlistNotesData {
  admin_notes: string;
}

export interface WaitlistStats {
  stats: {
    total: number;
    pending: number;
    contacted: number;
    enrolled: number;
    archived: number;
  };
}

export interface WaitlistResponse {
  data: WaitlistEntry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


// Public Blog Types
export interface PublicBlogsParams {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface PublicBlogsResponse {
  data: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoryStatsResponse {
  stats: {
    categories: Record<string, number>;
    total: number;
  };
}

export interface Collection {
  slug: string;
  label: string;
  category: string;
  blurb: string;
  tag: string;
  tagTone: "green" | "lilac";
  cover: string;
  coverAlt: string;
}