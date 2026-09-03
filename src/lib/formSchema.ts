import { z } from "zod";

// Helper for trimmed required strings
const trimmed = z.string().trim().min(1, "Required");

// Helper for email validation
const emailSchema = z.email("Invalid email address");

// Helper for password validation
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must not exceed 100 characters");

// ============================================
// AUTHENTICATION SCHEMAS
// ============================================



/**
 * User Login Schema
 * Used for authenticating users
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Admin Login Schema
 * Used for admin authentication
 */
export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Password is required & must be at least 8 characters"),
});

/**
 * Password Change Schema
 * Used when user wants to change their password
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Current password is required"),
  newPassword: passwordSchema,
  confirmNewPassword: z.string().min(8, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

/**
 * Forgot Password Schema
 * Used to request a password reset link
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

/**
 * Reset Password Schema
 * Used to reset password with token
 */
export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: passwordSchema,
  confirmNewPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

/**
 * Refresh Token Schema
 * Used to refresh access token
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

/**
 * Logout Schema
 * Used for logout request
 */
export const logoutSchema = z.object({
  refreshToken: z.string().optional(),
});

/**
 * Email Verification Schema
 * Used to verify user's email
 */
export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

/**
 * Resend Verification Schema
 * Used to resend email verification
 */
export const resendVerificationSchema = z.object({
  email: emailSchema,
});

/**
 * Two-Factor Authentication Setup Schema
 * Used to enable/disable 2FA
 */
export const twoFactorAuthSchema = z.object({
  enable: z.boolean(),
  code: z.string().length(6, "Verification code must be 6 digits").optional(),
});

/**
 * Two-Factor Authentication Verify Schema
 * Used to verify 2FA code
 */
export const verifyTwoFactorSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
});

// ============================================
// USER PROFILE SCHEMAS
// ============================================

/**
 * Update Profile Schema
 * Used to update user profile information
 */
export const updateProfileSchema = z.object({
  fullName: trimmed
    .min(2, "Full name must be at least 2 characters")
    .max(255, "Full name must not exceed 255 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name contains invalid characters")
    .optional(),
  
  avatarUrl: z.string().url("Invalid URL format").optional().or(z.literal("")),
  
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional().or(z.literal("")),
  
  // Social media handles
  instagram: z.string().max(100, "Instagram handle must not exceed 100 characters").optional().or(z.literal("")),
  facebook: z.string().max(100, "Facebook handle must not exceed 100 characters").optional().or(z.literal("")),
  linkedin: z.string().max(100, "LinkedIn handle must not exceed 100 characters").optional().or(z.literal("")),
  youtube: z.string().max(100, "YouTube handle must not exceed 100 characters").optional().or(z.literal("")),
  x: z.string().max(100, "X/Twitter handle must not exceed 100 characters").optional().or(z.literal("")),
  
  // Preferences
  preferences: z.object({
    theme: z.enum(["light", "dark", "system"]).optional(),
    language: z.string().optional(),
    notifications: z.object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
    }).optional(),
  }).optional(),
});

// ============================================
// ADMIN SCHEMAS
// ============================================

/**
 * Admin Create User Schema
 * Used by admin to create new users
 */
export const adminCreateUserSchema = z.object({
  fullName: trimmed
    .min(2, "Full name must be at least 2 characters")
    .max(255, "Full name must not exceed 255 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name contains invalid characters"),
  
  email: emailSchema,
  
  password: passwordSchema,
  
  role: z.enum(["admin", "user", "super_admin"]).default("user"),
  
  
  isActive: z.boolean().default(true),
  
  emailVerified: z.boolean().default(false),
});

/**
 * Admin Update User Schema
 * Used by admin to update user accounts
 */
export const adminUpdateUserSchema = z.object({
  fullName: trimmed
    .min(2, "Full name must be at least 2 characters")
    .max(255, "Full name must not exceed 255 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name contains invalid characters")
    .optional(),
  
  email: emailSchema.optional(),
  
  role: z.enum(["admin", "user", "super_admin"]).optional(),
  
 
  isActive: z.boolean().optional(),
  
  emailVerified: z.boolean().optional(),
});

/**
 * Admin Bulk Update Schema
 * Used for bulk operations on users
 */
export const adminBulkUpdateSchema = z.object({
  userIds: z.array(z.string().uuid("Invalid user ID format"))
    .min(1, "At least one user ID is required"),
  
  isActive: z.boolean().optional(),
  
  role: z.enum(["admin", "user", "super_admin"]).optional(),
});

// ============================================
// USER FILTERS AND PAGINATION
// ============================================

/**
 * User Filters Schema
 * Used for filtering users list
 */
export const userFiltersSchema = z.object({
  search: z.string().optional().or(z.literal("")),
  role: z.enum(["admin", "user", "super_admin"]).optional(),
  isActive: z.boolean().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

/**
 * Pagination Schema
 * Used for paginated requests
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  orderBy: z.enum(["id", "created_at", "updated_at", "full_name", "email"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

// ============================================
// ERROR FORMATTING
// ============================================

/**
 * Format Zod validation errors into a readable string
 */
export function formatZodIssues(error: z.ZodError) {
  return error.issues.map((issue) => issue.message).join(" ");
}

/**
 * Format Zod validation errors into an object
 */
export function formatZodErrors(error: z.ZodError) {
  return error.issues.reduce((acc, issue) => {
    const path = issue.path.join(".");
    if (!acc[path]) {
      acc[path] = [];
    }
    acc[path].push(issue.message);
    return acc;
  }, {} as Record<string, string[]>);
}

/**
 * Get the first error message for a specific field
 */
export function getFieldError(error: z.ZodError, field: string) {
  const issues = error.issues.filter((issue) => issue.path[0] === field);
  return issues.length > 0 ? issues[0].message : null;
}

// ============================================
// TYPE INFERENCES (for TypeScript)
// ============================================

// If using TypeScript, you can export types:
// export type RegisterSchema = z.infer<typeof registerSchema>;
// export type LoginSchema = z.infer<typeof loginSchema>;
// export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
// export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
// export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
// export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
// export type AdminCreateUserSchema = z.infer<typeof adminCreateUserSchema>;
// export type AdminUpdateUserSchema = z.infer<typeof adminUpdateUserSchema>;

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  loginSchema,
  adminLoginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
  logoutSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  twoFactorAuthSchema,
  verifyTwoFactorSchema,
  updateProfileSchema,
  adminCreateUserSchema,
  adminUpdateUserSchema,
  adminBulkUpdateSchema,
  userFiltersSchema,
  paginationSchema,
  formatZodIssues,
  formatZodErrors,
  getFieldError,
};