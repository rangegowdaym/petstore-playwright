import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { User } from '../models/User';
import { config } from '../config/config';

/**
 * Service class for User API operations
 */
export class UserService {
  private apiContext!: APIRequestContext;

  /**
   * Initialize the API context
   */
  async init(): Promise<void> {
    this.apiContext = await request.newContext({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Create a new user
   */
  async createUser(user: User): Promise<APIResponse> {
    return await this.apiContext.post(config.endpoints.user.base, {
      data: user
    });
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string): Promise<APIResponse> {
    return await this.apiContext.get(config.endpoints.user.userByUsername(username));
  }

  /**
   * Update user
   */
  async updateUser(username: string, user: User): Promise<APIResponse> {
    return await this.apiContext.put(config.endpoints.user.userByUsername(username), {
      data: user
    });
  }

  /**
   * Delete user
   */
  async deleteUser(username: string): Promise<APIResponse> {
    return await this.apiContext.delete(config.endpoints.user.userByUsername(username));
  }

  /**
   * User login
   */
  async loginUser(username: string, password: string): Promise<APIResponse> {
    return await this.apiContext.get(config.endpoints.user.login, {
      params: { username, password }
    });
  }

  /**
   * User logout
   */
  async logoutUser(): Promise<APIResponse> {
    return await this.apiContext.get(config.endpoints.user.logout);
  }

  /**
   * Dispose the API context
   */
  async dispose(): Promise<void> {
    await this.apiContext.dispose();
  }
}
