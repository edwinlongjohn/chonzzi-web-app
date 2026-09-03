// utils/date.ts

/**
 * Nigerian Timezone (West Africa Time - WAT)
 * UTC+1 (no DST)
 */
const NIGERIA_TIMEZONE = 'Africa/Lagos';

/**
 * Convert local datetime-local input value to Nigerian time (WAT)
 * This ensures the time is stored as Nigerian time in the database
 */
export function localToNigeriaTime(localDateTime: string): string | null {
  if (!localDateTime) return null;
  try {
    // Parse the local time
    const date = new Date(localDateTime);
    if (isNaN(date.getTime())) return null;
    
    // Get the time components in local time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    // Create a string that represents Nigerian time (WAT)
    // This will be stored as-is in the database
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+01:00`;
  } catch {
    return null;
  }
}

/**
 * Convert local datetime-local input value to UTC (for API)
 * This creates an ISO string that can be sent to the backend
 * The backend should interpret this as Nigerian time
 */
export function localToUTCForAPI(localDateTime: string): string | null {
  if (!localDateTime) return null;
  try {
    const date = new Date(localDateTime);
    if (isNaN(date.getTime())) return null;
    return date.toISOString();
  } catch {
    return null;
  }
}

/**
 * Convert UTC ISO string to datetime-local input format in Nigerian time
 */
export function utcToLocalInput(utcDate: string | null): string {
  if (!utcDate) return "";
  try {
    const date = new Date(utcDate);
    if (isNaN(date.getTime())) return "";
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return "";
  }
}

/**
 * Format date in Nigerian timezone (WAT)
 */
export function formatNigeriaDate(utcDate: string): string {
  try {
    return new Date(utcDate).toLocaleString('en-NG', {
      timeZone: NIGERIA_TIMEZONE,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return utcDate;
  }
}

/**
 * Format date in Nigerian timezone for preview
 */
export function formatNigeriaShort(utcDate: string): string {
  try {
    return new Date(utcDate).toLocaleString('en-NG', {
      timeZone: NIGERIA_TIMEZONE,
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return utcDate;
  }
}

/**
 * Check if a date is in the future (in Nigerian time)
 */
export function isFutureDate(utcDate: string): boolean {
  try {
    const now = new Date();
    const scheduled = new Date(utcDate);
    return scheduled > now;
  } catch {
    return false;
  }
}

/**
 * Get current Nigerian time in datetime-local input format
 */
export function getCurrentNigeriaTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Format date for display with timezone info
 */
export function formatWithTimezone(utcDate: string): string {
  try {
    const nigeriaTime = new Date(utcDate).toLocaleString('en-NG', {
      timeZone: NIGERIA_TIMEZONE,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${nigeriaTime} (WAT)`;
  } catch {
    return utcDate;
  }
}

/**
 * Convert UTC to Nigerian time display
 */
export function utcToNigeriaTime(utcDate: string): string {
  try {
    return new Date(utcDate).toLocaleString('en-NG', {
      timeZone: NIGERIA_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch {
    return utcDate;
  }
}

/**
 * Get current time in Nigeria as ISO string with timezone offset
 */
export function getCurrentNigeriaISO(): string {
  const now = new Date();
  // Format as WAT (UTC+1)
  const offset = 60; // +1 hour
  const hours = String(Math.floor(offset / 60)).padStart(2, '0');
  const minutes = String(offset % 60).padStart(2, '0');
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hrs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hrs}:${mins}:${secs}.000+01:00`;
}