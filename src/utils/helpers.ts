import { APIResponse } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * Generate a unique ID based on timestamp
 */
export function generateUniqueId(): number {
  return Date.now();
}

/**
 * Generate a unique name with timestamp
 */
export function generateUniqueName(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}

/**
 * Get current ISO date string
 */
export function getCurrentISODate(): string {
  return new Date().toISOString();
}

/**
 * Attach API request and response to Allure report
 */
export async function attachApiDetails(
  response: APIResponse,
  stepName: string
): Promise<void> {
  await allure.step(stepName, async () => {
    // Attach request details
    await allure.attachment('Request URL', response.url(), 'text/plain');
    
    // Attach response status
    await allure.attachment('Response Status', String(response.status()), 'text/plain');
    
    // Attach response headers
    const headers = response.headers();
    await allure.attachment('Response Headers', JSON.stringify(headers, null, 2), 'application/json');
    
    // Attach response body
    try {
      const responseBody = await response.text();
      if (responseBody) {
        await allure.attachment('Response Body', responseBody, 'application/json');
      }
    } catch (error) {
      // Response might not have a body
    }
  });
}

/**
 * Wait for a specified amount of time
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate response status code
 */
export function validateStatusCode(
  response: APIResponse,
  expectedStatus: number
): boolean {
  return response.status() === expectedStatus;
}

/**
 * Parse JSON response safely
 */
export async function parseJsonResponse<T>(response: APIResponse): Promise<T | null> {
  try {
    return await response.json() as T;
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    return null;
  }
}

/**
 * Generate random email
 */
export function generateRandomEmail(prefix: string = 'test'): string {
  return `${prefix}_${Date.now()}@example.com`;
}

/**
 * Generate random phone number
 */
export function generateRandomPhone(): string {
  const timestamp = Date.now().toString().slice(-10);
  return timestamp;
}
