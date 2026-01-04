import { APIRequestContext, APIResponse } from '@playwright/test';
import { User } from '../models/User';
import { ApiConfig } from '../config/ApiConfig';

/**
 * UserClient - API client for User endpoints
 */
export class UserClient {
  constructor(private request: APIRequestContext) {}

  /**
   * Create a new user
   * @param user User object
   * @returns API response
   */
  async createUser(user: User): Promise<APIResponse> {
    return await this.request.post(ApiConfig.ENDPOINTS.USER, {
      data: user,
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Get user by username
   * @param username Username
   * @returns API response
   */
  async getUserByUsername(username: string): Promise<APIResponse> {
    return await this.request.get(ApiConfig.ENDPOINTS.USER_BY_USERNAME(username), {
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Update user information
   * @param username Username
   * @param user User object
   * @returns API response
   */
  async updateUser(username: string, user: User): Promise<APIResponse> {
    return await this.request.put(ApiConfig.ENDPOINTS.USER_BY_USERNAME(username), {
      data: user,
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Delete a user
   * @param username Username
   * @returns API response
   */
  async deleteUser(username: string): Promise<APIResponse> {
    return await this.request.delete(ApiConfig.ENDPOINTS.USER_BY_USERNAME(username), {
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * User login
   * @param username Username
   * @param password Password
   * @returns API response
   */
  async loginUser(username: string, password: string): Promise<APIResponse> {
    return await this.request.get(ApiConfig.ENDPOINTS.USER_LOGIN, {
      params: { username, password },
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * User logout
   * @returns API response
   */
  async logoutUser(): Promise<APIResponse> {
    return await this.request.get(ApiConfig.ENDPOINTS.USER_LOGOUT, {
      headers: ApiConfig.HEADERS
    });
  }
}
